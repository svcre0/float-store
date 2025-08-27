// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());




app.get('/api/search-products', (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Missing query parameter' });

  const sql = `SELECT * FROM products WHERE title LIKE ?`;
  db.all(sql, [`%${q}%`], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
