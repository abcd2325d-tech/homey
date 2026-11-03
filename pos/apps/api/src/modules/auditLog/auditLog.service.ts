import type { Prisma, PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../../lib/prisma.js";

type Tx = PrismaClient | Prisma.TransactionClient;

export interface RecordAuditParams {
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string;
  before?: unknown;
  after?: unknown;
  metadata?: unknown;
}

/** Records a sensitive action. Pass a transaction client to keep this atomic with the mutation it describes. */
export async function recordAudit(params: RecordAuditParams, db: Tx = defaultPrisma) {
  await db.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      beforeJson: params.before !== undefined ? JSON.stringify(params.before) : null,
      afterJson: params.after !== undefined ? JSON.stringify(params.after) : null,
      metadata: params.metadata !== undefined ? JSON.stringify(params.metadata) : null
    }
  });
}

export interface ListAuditParams {
  entityType?: string;
  entityId?: string;
  userId?: string;
  take?: number;
  skip?: number;
}

export async function listAuditLogs(params: ListAuditParams, db: Tx = defaultPrisma) {
  const where: Prisma.AuditLogWhereInput = {
    entityType: params.entityType,
    entityId: params.entityId,
    userId: params.userId
  };
  return db.auditLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: params.take ?? 100,
    skip: params.skip ?? 0,
    include: { user: { select: { id: true, name: true, email: true } } }
  });
}
