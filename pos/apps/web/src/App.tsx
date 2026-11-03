import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/auth.js";
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import { Layout } from "./components/Layout.js";
import { LoginPage } from "./pages/auth/Login.js";
import { PosPage } from "./pages/pos/PosPage.js";
import { ProductsPage } from "./pages/inventory/ProductsPage.js";
import { StockPage } from "./pages/inventory/StockPage.js";
import { PurchaseOrdersPage } from "./pages/inventory/PurchaseOrdersPage.js";
import { StockCountsPage } from "./pages/inventory/StockCountsPage.js";
import { ReportsPage } from "./pages/reports/ReportsPage.js";
import { SettingsPage } from "./pages/settings/SettingsPage.js";
import { CustomersPage } from "./pages/customers/CustomersPage.js";

export default function App() {
  const bootstrap = useAuthStore((s) => s.bootstrap);
  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/pos" replace />} />
            <Route path="/pos" element={<PosPage />} />
            <Route element={<ProtectedRoute roles={["ADMIN", "MANAGER"]} />}>
              <Route path="/inventory/products" element={<ProductsPage />} />
              <Route path="/inventory/stock" element={<StockPage />} />
              <Route path="/inventory/purchase-orders" element={<PurchaseOrdersPage />} />
              <Route path="/inventory/stock-counts" element={<StockCountsPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/reports" element={<ReportsPage />} />
            </Route>
            <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
