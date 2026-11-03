import PDFDocument from "pdfkit";
import { formatMoney } from "../../lib/money.js";
import { fromMilliUnits } from "../../lib/qty.js";
import type { Sale, SaleLine, StoreSettings } from "@prisma/client";

type SaleWithLines = Sale & {
  lines: (SaleLine & { product: { name: string; sku: string } })[];
  payments: { method: string; amountCents: number; tenderedCents: number | null; changeCents: number | null }[];
};

function money(cents: number, settings: StoreSettings) {
  return formatMoney(cents, settings.currencyCode, settings.locale);
}

export function renderReceiptHtml(sale: SaleWithLines, settings: StoreSettings): string {
  const rows = sale.lines
    .filter((l) => !l.isVoided)
    .map(
      (l) => `
      <tr>
        <td>${escapeHtml(l.product.name)} × ${fromMilliUnits(l.quantity)}</td>
        <td style="text-align:right">${money(l.lineTotalCents, settings)}</td>
      </tr>`
    )
    .join("");

  const payments = sale.payments
    .map((p) => `<tr><td>${p.method}</td><td style="text-align:right">${money(p.amountCents, settings)}</td></tr>`)
    .join("");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Receipt ${sale.receiptNumber ?? sale.id}</title>
<style>
  body { font-family: 'Courier New', monospace; width: 320px; margin: 0 auto; padding: 16px; color: #111; }
  h1 { font-size: 16px; text-align: center; margin: 0 0 4px; }
  .center { text-align: center; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px; }
  td { padding: 2px 0; }
  .totals td { font-weight: bold; }
  hr { border: none; border-top: 1px dashed #999; margin: 8px 0; }
  .footer { margin-top: 12px; text-align: center; font-size: 12px; color: #555; }
</style>
</head>
<body>
  <h1>${escapeHtml(settings.storeName)}</h1>
  <p class="center">${escapeHtml(settings.address ?? "")}</p>
  <p class="center">Receipt #${escapeHtml(sale.receiptNumber ?? sale.id)}</p>
  <p class="center">${new Date(sale.completedAt ?? sale.createdAt).toLocaleString(settings.locale)}</p>
  <hr />
  <table>${rows}</table>
  <hr />
  <table>
    <tr><td>Subtotal</td><td style="text-align:right">${money(sale.subtotalCents, settings)}</td></tr>
    ${sale.discountCents > 0 ? `<tr><td>Discount</td><td style="text-align:right">-${money(sale.discountCents, settings)}</td></tr>` : ""}
    <tr><td>Tax</td><td style="text-align:right">${money(sale.taxCents, settings)}</td></tr>
    <tr class="totals"><td>Total</td><td style="text-align:right">${money(sale.totalCents, settings)}</td></tr>
  </table>
  <hr />
  <table>${payments}</table>
  <div class="footer">${escapeHtml(settings.receiptFooterText ?? "Thank you!")}</div>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function renderReceiptPdf(sale: SaleWithLines, settings: StoreSettings): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: [226, 600], margin: 12 }); // ~80mm receipt width
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(14).text(settings.storeName, { align: "center" });
    if (settings.address) doc.fontSize(9).text(settings.address, { align: "center" });
    doc.fontSize(9).text(`Receipt #${sale.receiptNumber ?? sale.id}`, { align: "center" });
    doc.text(new Date(sale.completedAt ?? sale.createdAt).toLocaleString(settings.locale), { align: "center" });
    doc.moveDown(0.5);
    doc.text("-".repeat(32));

    doc.fontSize(9);
    for (const line of sale.lines.filter((l) => !l.isVoided)) {
      doc.text(`${line.product.name} x${fromMilliUnits(line.quantity)}`, { continued: true, width: 150 });
      doc.text(money(line.lineTotalCents, settings), { align: "right" });
    }

    doc.text("-".repeat(32));
    doc.text(`Subtotal: ${money(sale.subtotalCents, settings)}`, { align: "right" });
    if (sale.discountCents > 0) doc.text(`Discount: -${money(sale.discountCents, settings)}`, { align: "right" });
    doc.text(`Tax: ${money(sale.taxCents, settings)}`, { align: "right" });
    doc.fontSize(12).text(`Total: ${money(sale.totalCents, settings)}`, { align: "right" });
    doc.fontSize(9).moveDown(0.5);

    for (const payment of sale.payments) {
      doc.text(`${payment.method}: ${money(payment.amountCents, settings)}`, { align: "right" });
    }

    doc.moveDown(1);
    doc.text(settings.receiptFooterText ?? "Thank you!", { align: "center" });
    doc.end();
  });
}

// ESC/POS control codes for thermal receipt printers.
const ESC = 0x1b;
const GS = 0x1d;

export function renderReceiptEscPos(sale: SaleWithLines, settings: StoreSettings): Buffer {
  const parts: Buffer[] = [];
  const text = (s: string) => parts.push(Buffer.from(s, "ascii"));
  const raw = (...bytes: number[]) => parts.push(Buffer.from(bytes));
  const line = (s = "") => text(s + "\n");

  raw(ESC, 0x40); // initialize printer

  raw(ESC, 0x61, 0x01); // center align
  raw(ESC, 0x45, 0x01); // bold on
  line(settings.storeName);
  raw(ESC, 0x45, 0x00); // bold off
  if (settings.address) line(settings.address);
  line(`Receipt #${sale.receiptNumber ?? sale.id}`);
  line(new Date(sale.completedAt ?? sale.createdAt).toLocaleString(settings.locale));
  line("-".repeat(32));

  raw(ESC, 0x61, 0x00); // left align
  for (const l of sale.lines.filter((l) => !l.isVoided)) {
    const left = `${l.product.name} x${fromMilliUnits(l.quantity)}`;
    const right = money(l.lineTotalCents, settings);
    line(padLine(left, right, 32));
  }
  line("-".repeat(32));
  line(padLine("Subtotal", money(sale.subtotalCents, settings), 32));
  if (sale.discountCents > 0) line(padLine("Discount", `-${money(sale.discountCents, settings)}`, 32));
  line(padLine("Tax", money(sale.taxCents, settings), 32));
  raw(ESC, 0x45, 0x01);
  line(padLine("Total", money(sale.totalCents, settings), 32));
  raw(ESC, 0x45, 0x00);

  for (const payment of sale.payments) {
    line(padLine(payment.method, money(payment.amountCents, settings), 32));
  }

  line();
  raw(ESC, 0x61, 0x01);
  line(settings.receiptFooterText ?? "Thank you!");
  line("\n\n");

  raw(GS, 0x56, 0x42, 0x00); // full cut

  return Buffer.concat(parts);
}

function padLine(left: string, right: string, width: number): string {
  const space = Math.max(width - left.length - right.length, 1);
  return left + " ".repeat(space) + right;
}
