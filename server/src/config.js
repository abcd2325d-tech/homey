import dotenv from "dotenv";
dotenv.config();

// CLIENT_ORIGIN can be a single URL or a comma-separated list, e.g.
// "http://localhost:5173,https://your-app.vercel.app"
const originsEnv = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const clientOrigins = originsEnv.split(",").map((o) => o.trim()).filter(Boolean);

export const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || "dev_secret_change_me",
  clientOrigins,
  nodeEnv: process.env.NODE_ENV || "development",
};
