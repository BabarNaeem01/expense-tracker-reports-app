const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 4109;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment3_app9"
});

app.get("/reports", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT month_name, total FROM monthly_spending ORDER BY month_number ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App 9 server running on http://localhost:${PORT}`);
});
