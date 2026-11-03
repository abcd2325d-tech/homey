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

describe("POST /api/auth/login", () => {
  it("logs in with correct credentials and returns tokens + user", async () => {
    await createTestUser({ role: "CASHIER", email: "cashier@example.com", password: "secret123" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cashier@example.com", password: "secret123" });

    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe("cashier@example.com");
    expect(res.body.data.user.role).toBe("CASHIER");
    expect(res.body.data.user.passwordHash).toBeUndefined();
    expect(typeof res.body.data.accessToken).toBe("string");
    expect(typeof res.body.data.refreshToken).toBe("string");
  });

  it("rejects a wrong password", async () => {
    await createTestUser({ email: "cashier2@example.com", password: "secret123" });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cashier2@example.com", password: "wrong" });
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("rejects an unknown email", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nobody@example.com", password: "whatever" });
    expect(res.status).toBe(401);
  });

  it("rejects a deactivated user", async () => {
    const { user } = await createTestUser({ email: "inactive@example.com", password: "secret123" });
    await prisma.user.update({ where: { id: user.id }, data: { isActive: false } });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "inactive@example.com", password: "secret123" });
    expect(res.status).toBe(401);
  });

  it("validates input shape", async () => {
    const res = await request(app).post("/api/auth/login").send({ email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});

describe("refresh + logout", () => {
  it("rotates a refresh token and invalidates the old one", async () => {
    await createTestUser({ email: "rotate@example.com", password: "secret123" });
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "rotate@example.com", password: "secret123" });
    const { refreshToken } = login.body.data;

    const refreshed = await request(app).post("/api/auth/refresh").send({ refreshToken });
    expect(refreshed.status).toBe(200);
    expect(refreshed.body.data.refreshToken).not.toBe(refreshToken);

    const reused = await request(app).post("/api/auth/refresh").send({ refreshToken });
    expect(reused.status).toBe(401);
  });

  it("logout revokes the refresh token", async () => {
    await createTestUser({ email: "logout@example.com", password: "secret123" });
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "logout@example.com", password: "secret123" });
    const { refreshToken } = login.body.data;

    const logoutRes = await request(app).post("/api/auth/logout").send({ refreshToken });
    expect(logoutRes.status).toBe(204);

    const refreshed = await request(app).post("/api/auth/refresh").send({ refreshToken });
    expect(refreshed.status).toBe(401);
  });
});

describe("GET /api/auth/me", () => {
  it("requires a bearer token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("returns the current user for a valid token", async () => {
    const { accessToken, user } = await createTestUser({ role: "MANAGER" });
    const res = await request(app).get("/api/auth/me").set("Authorization", `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(user.id);
    expect(res.body.data.role).toBe("MANAGER");
  });
});

describe("POST /api/auth/verify-pin", () => {
  it("finds the manager whose PIN matches", async () => {
    await createTestUser({ role: "MANAGER", pin: "4242" });
    const { accessToken } = await createTestUser({ role: "CASHIER" });

    const res = await request(app)
      .post("/api/auth/verify-pin")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ pin: "4242" });

    expect(res.status).toBe(200);
    expect(res.body.data.role).toBe("MANAGER");
  });

  it("rejects an unrecognized PIN", async () => {
    const { accessToken } = await createTestUser({ role: "CASHIER" });
    const res = await request(app)
      .post("/api/auth/verify-pin")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ pin: "0000" });
    expect(res.status).toBe(401);
  });
});
