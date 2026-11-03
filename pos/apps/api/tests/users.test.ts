import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { buildApp } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { resetDb } from "./helpers/db.js";
import { createTestUser } from "./helpers/factories.js";

const app = buildApp();

beforeEach(async () => {
  await resetDb();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("users module (admin only)", () => {
  it("blocks non-admins", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const res = await request(app).get("/api/users").set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toBe(403);
  });

  it("lets an admin create, list, and update a user", async () => {
    const { accessToken: adminToken } = await createTestUser({ role: "ADMIN" });

    const create = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "newhire@example.com", name: "New Hire", role: "CASHIER", password: "password123" });
    expect(create.status).toBe(201);
    const newUserId = create.body.data.id;

    const list = await request(app).get("/api/users").set("Authorization", `Bearer ${adminToken}`);
    expect(list.status).toBe(200);
    expect(list.body.data.some((u: { id: string }) => u.id === newUserId)).toBe(true);

    const update = await request(app)
      .patch(`/api/users/${newUserId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ role: "MANAGER", pin: "1234" });
    expect(update.status).toBe(200);
    expect(update.body.data.role).toBe("MANAGER");

    const audit = await request(app)
      .get("/api/audit-log?entityType=User")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(audit.status).toBe(200);
    expect(audit.body.data.some((entry: { action: string }) => entry.action === "USER_ROLE_CHANGED")).toBe(
      true
    );
  });

  it("rejects creating a duplicate email", async () => {
    const { accessToken: adminToken } = await createTestUser({ role: "ADMIN" });
    await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "dupe@example.com", name: "A", role: "CASHIER", password: "password123" });

    const second = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ email: "dupe@example.com", name: "B", role: "CASHIER", password: "password123" });

    expect(second.status).toBe(409);
  });

  it("deactivated users can no longer log in after admin deactivates them", async () => {
    const { accessToken: adminToken } = await createTestUser({ role: "ADMIN" });
    const { user, password } = await createTestUser({ role: "CASHIER", email: "deactivate-me@example.com" });

    const loginBefore = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password });
    expect(loginBefore.status).toBe(200);

    await request(app)
      .patch(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ isActive: false });

    const loginAfter = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password });
    expect(loginAfter.status).toBe(401);
  });
});
