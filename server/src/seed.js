import bcrypt from "bcryptjs";
import db from "./db.js";

const passwordHash = bcrypt.hashSync("password123", 10);

db.exec("DELETE FROM bookings; DELETE FROM listings; DELETE FROM users;");

const insertUser = db.prepare(
  "INSERT INTO users (name, email, password_hash, is_host) VALUES (?, ?, ?, ?)"
);
const hostA = insertUser.run("Alice Host", "alice@example.com", passwordHash, 1);
const hostB = insertUser.run("Ben Host", "ben@example.com", passwordHash, 1);
const guest = insertUser.run("Gina Guest", "gina@example.com", passwordHash, 0);

const insertListing = db.prepare(`
  INSERT INTO listings
    (host_id, title, description, city, country, price_per_night, max_guests, bedrooms, beds, baths, amenities, image_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const listings = [
  [hostA.lastInsertRowid, "Sunny Loft in the City Center", "Bright, modern loft steps from cafes and shops.", "Lisbon", "Portugal", 89, 3, 1, 2, 1, ["Wifi","Kitchen","Washer"], "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
  [hostA.lastInsertRowid, "Cozy Cabin by the Lake", "Rustic cabin with stunning lake views and a private dock.", "Lake Tahoe", "USA", 165, 5, 2, 3, 2, ["Wifi","Fireplace","Parking","Lake access"], "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800"],
  [hostB.lastInsertRowid, "Minimalist Studio Near the Beach", "Walk to the beach in five minutes. Perfect for couples.", "Barcelona", "Spain", 72, 2, 1, 1, 1, ["Wifi","Air conditioning","Beach access"], "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
  [hostB.lastInsertRowid, "Mountain View Chalet", "Ski-in/ski-out chalet with panoramic mountain views.", "Chamonix", "France", 240, 6, 3, 4, 3, ["Wifi","Hot tub","Ski storage","Fireplace"], "https://images.unsplash.com/photo-1518602164578-cd0074062767?w=800"],
  [hostA.lastInsertRowid, "Downtown Apartment with Skyline Views", "High-rise apartment in the heart of downtown.", "New York", "USA", 210, 4, 2, 2, 2, ["Wifi","Gym","Elevator","Doorman"], "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"],
  [hostB.lastInsertRowid, "Charming Countryside Cottage", "Quiet retreat surrounded by vineyards and rolling hills.", "Tuscany", "Italy", 130, 4, 2, 2, 1, ["Wifi","Pool","Garden","Parking"], "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"],
];

for (const l of listings) {
  insertListing.run(l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], JSON.stringify(l[10]), l[11]);
}

console.log("Seeded database with:");
console.log("  Hosts: alice@example.com / ben@example.com (password: password123)");
console.log("  Guest: gina@example.com (password: password123)");
console.log(`  ${listings.length} listings created`);
