
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./products.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image TEXT,
      rating INTEGER,
      price REAL,
      discount INTEGER
    )
  `);

  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (err) return console.error("Error checking table:", err);

    if (row.count === 0) {
      console.log("Seeding database...");
      const sampleData = [
        ['The prim mudu Performance', 'image1.jpg', 4, 229.99, 15],
        ['new Apple Watch High Performance', 'image2.jpg', 5, 399.99, 45],
        ['Apple Watch High Performance', 'image3.jpg', 5, 399.99, 45],
        ['Premium Vlogging Kit', 'image4.jpg', 5, 2499.99, 20],
        ['Mediabox Maverick 4K Android TV Box', 'image5.jpg', 5, 999.99, 70]
      ];

      sampleData.forEach(([title, image, rating, price, discount]) => {
        db.run(
          `INSERT INTO products (title, image, rating, price, discount) VALUES (?, ?, ?, ?, ?)`,
          [title, image, rating, price, discount]
        );
      });
    }
  });
});

module.exports = db;
