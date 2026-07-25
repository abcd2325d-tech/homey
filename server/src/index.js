import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "./config.js";
import authRoutes from "./routes/auth.js";
import listingsRoutes from "./routes/listings.js";
import bookingsRoutes from "./routes/bookings.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import "./db.js";

const app = express();

// Matches private-network IPs (192.168.x.x, 10.x.x.x, 172.16-31.x.x) on any port,
// so the app also works when a phone on the same Wi-Fi hits the dev server's LAN IP.
const privateNetworkPattern =
  /^http:\/\/(192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})(:\d+)?$/;

function isAllowedOrigin(origin) {
  if (!origin) return true; // same-origin / non-browser requests
  if (config.clientOrigins.includes(origin)) return true;
  if (config.nodeEnv === "development" && privateNetworkPattern.test(origin)) return true;
  return false;
}

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "6mb" }));
app.use(morgan(config.nodeEnv === "development" ? "dev" : "combined"));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts, please try again later" },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/signup", authLimiter);

app.get("/api/health", (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/bookings", bookingsRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`API server listening on http://localhost:${config.port}`);
});
