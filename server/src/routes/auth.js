import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { config } from "../config.js";
import { signupSchema, loginSchema, validate } from "../utils/validators.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, isHost: !!user.is_host },
    config.jwtSecret,
    { expiresIn: "7d" }
  );
}

function toPublicUser(user) {
  return { id: user.id, name: user.name, email: user.email, isHost: !!user.is_host };
}

router.post("/signup", validate(signupSchema), (req, res) => {
  const { name, email, password, isHost } = req.validated;
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email.toLowerCase());
  if (existing) return res.status(409).json({ error: "An account with this email already exists" });

  const hash = bcrypt.hashSync(password, 10);
  const info = db
    .prepare("INSERT INTO users (name, email, password_hash, is_host) VALUES (?, ?, ?, ?)")
    .run(name, email.toLowerCase(), hash, isHost ? 1 : 0);

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(info.lastInsertRowid);
  const token = signToken(user);
  res.status(201).json({ token, user: toPublicUser(user) });
});

router.post("/login", validate(loginSchema), (req, res) => {
  const { email, password } = req.validated;
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase());
  if (!user) return res.status(401).json({ error: "Invalid email or password" });

  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Invalid email or password" });

  const token = signToken(user);
  res.json({ token, user: toPublicUser(user) });
});

router.get("/me", requireAuth, (req, res) => {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user: toPublicUser(user) });
});

export default router;
