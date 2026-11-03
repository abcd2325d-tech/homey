# homey — an Airbnb-style booking app

A full-stack listings & booking app: browse/search stays, save favorites, view a rich listing
page with reviews and host info, book with a simulated payment, message hosts/guests about a
stay, and manage listings as a host. Includes a bottom tab bar for phone-sized screens.

- **Backend:** Node.js + Express, SQLite (via Node's built-in `node:sqlite`), JWT auth, bcrypt
  password hashing, input validation (zod), rate limiting, Helmet security headers.
- **Frontend:** React + Vite, React Router, plain CSS (no framework needed).

> **Also in this repo:** [`designer/`](designer/) — *Shaper 3D*, a simple standalone browser
> app for designing 3D models (shapes, holes, combine, export to STL/OBJ/GLB). See
> [designer/README.md](designer/README.md).
>
> **Also in this repo:** [`pos/`](pos/) — a Point of Sale and inventory management system
> (Node/Express/Prisma backend, React/Vite frontend, multi-location stock, barcode
> scanning, receipts, reports). See [pos/README.md](pos/README.md).

## Project structure

```
airbnb-clone/
  server/            Express API
    src/
      index.js        app entrypoint
      db.js            SQLite schema + connection
      config.js        env config
      seed.js          demo data
      routes/          auth, listings, bookings
      middleware/       auth guard, error handler
      utils/           validation schemas
  client/            React app
    src/
      pages/           Home, ListingDetail, Login, Signup, HostDashboard, CreateListing,
                        EditListing, MyTrips
      components/      Navbar, ListingCard, ListingForm, ProtectedRoute
      context/         AuthContext (JWT session)
      api.js           fetch wrapper for the backend
```

## Running it locally

Requires **Node.js 22.5+** (uses the built-in `node:sqlite` module — no native build step,
so `npm install` never needs a C++ toolchain).

```bash
# 1. Backend
cd server
cp .env.example .env      # edit JWT_SECRET before any real use
npm install
npm run seed               # creates data.db with demo hosts/guest + 6 listings
npm start                  # http://localhost:4000

# 2. Frontend (separate terminal)
cd client
npm install
npm run dev                 # http://localhost:5173 (proxies /api to :4000)
```

Open http://localhost:5173. Demo accounts (password `password123` for all):

| Email | Role |
|---|---|
| alice@example.com | host |
| ben@example.com | host |
| gina@example.com | guest |

Or sign up a new account and check "I want to host" to list your own places.

## Installing it on your phone (PWA)

The client is a Progressive Web App — it can be installed to a phone home screen with its
own icon, no App Store needed.

**Over home Wi-Fi (works right now, no hosting required):**
1. Make sure your phone and Mac are on the same Wi-Fi network.
2. Find your Mac's local IP: System Settings → Wi-Fi → Details (something like `192.168.1.23`).
3. Run the backend as usual (`npm start` in `server/`).
4. Run the frontend as usual (`npm run dev` in `client/` — it now binds to your whole
   network, not just localhost).
5. On your phone's browser, go to `http://<your-mac-ip>:5173` (e.g. `http://192.168.1.23:5173`).
6. Safari: tap Share → Add to Home Screen. Chrome (Android): tap ⋮ → Install app.

This only works while your Mac is on and both servers are running, and only on the same
Wi-Fi. For it to work anywhere (cellular data, different networks), the backend and frontend
need to be hosted online — see the deployment section below, then rebuild the client with
`VITE_API_URL` pointed at your hosted backend before installing.

## How booking & payment work

Booking checks date overlap against existing confirmed bookings for that listing before
accepting a new one (`server/src/routes/bookings.js`). Payment is **simulated** —
`processMockPayment()` validates card format/expiry and always "succeeds" unless the card
number ends in `0000` (used to test the decline path). No real payment processor is called
and no money moves. This keeps the app runnable with zero external accounts while mirroring
the shape of a real integration.

## Security measures already in place

- Passwords hashed with bcrypt (never stored/returned in plaintext)
- JWT-based auth, 7-day expiry, verified on every protected route
- All inputs validated server-side with zod (auth, listings, bookings)
- Helmet for standard security headers
- Rate limiting: 300 req/15min general API, 20 req/15min on login/signup
- Ownership checks on listing edit/delete and booking cancel (can't touch another user's data)
- Hosts blocked from booking their own listing
- CORS locked to `CLIENT_ORIGIN` (comma-separated list supported); private-network IPs
  (192.168.x.x etc.) are only auto-allowed when `NODE_ENV=development`, for phone testing

## Path to a real production deployment

This app is structured so each of these is a scoped, independent upgrade:

**1. Swap SQLite for Postgres.** `server/src/db.js` is the only file that touches the
database driver. Replace `node:sqlite` with `pg` (or an ORM like Prisma/Drizzle), keep the
same table shapes, and update the `.prepare()/.run()/.get()/.all()` calls in the route files
to the new driver's query API. SQLite here is fine for one server process; concurrent writes
at scale need Postgres.

**2. Real payments.** Replace `processMockPayment()` in `server/src/routes/bookings.js` with
Stripe: create a PaymentIntent server-side, collect card details client-side with Stripe
Elements (never let raw card numbers hit your own server — the mock version does this only
because no real charge occurs), and confirm the booking on a successful webhook.

**3. Image uploads.** Listings currently take an image URL. For real uploads, add an
endpoint that accepts multipart form data and stores files in S3/Cloudinary, saving the
resulting URL to `image_url`.

**4. Deployment.**
   - Backend: any Node host (Render, Fly.io, Railway) — set `JWT_SECRET`, `CLIENT_ORIGIN`
     (to your deployed frontend's URL), `NODE_ENV=production`, and swap in a managed
     Postgres instance.
   - Frontend: build with `VITE_API_URL=https://your-backend-url/api npm run build` in
     `client/` — this produces static files (plus the PWA manifest/service worker) in
     `client/dist/`. Deploy that folder to Vercel, Netlify, or serve it from the same Node
     process with `express.static`.
   - Put both behind HTTPS; set cookies/JWT storage policy (this demo uses `localStorage`
     for simplicity — for production, prefer an httpOnly cookie to reduce XSS exposure).
   - Once hosted, rebuild the client with the production `VITE_API_URL` and reinstall the
     PWA on your phone to pick up the update — it'll then work over cellular data too, not
     just home Wi-Fi.

**5. Other hardening before real users:** email verification, password reset flow, refresh
tokens (JWTs here are long-lived with no revocation list), CSRF protection if you move to
cookie-based auth, structured logging, automated tests, and a review of rate limits.

## Verified working

- Signup, login, `/me` session check
- Search by city, guest count, price, and date-range availability
- Listing create/edit/delete (host-only, ownership-enforced)
- Booking creation with date-conflict rejection (409) and simulated card decline (402)
- Booking cancellation
- Production build (`vite build`) compiles cleanly, including PWA manifest + service worker
- Local-network CORS allowance and configurable `VITE_API_URL` verified end-to-end
