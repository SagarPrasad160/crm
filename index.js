const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sagar",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/services", (req, res) => {
  const q = "SELECT * FROM services";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.get("/services/:userId", (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM services WHERE user = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
});

app.post("/services", (req, res) => {
  const q =
    "INSERT INTO services(`type`,`charge`,`user`,`createdAt`) VALUES(?,CURRENT_TIMESTAMP)";
  const values = [req.body.type, req.body.charge, req.body.user];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    res.json("Service added successfully!");
  });
});

app.post("/users", (req, res) => {
  const q =
    "INSERT INTO users (`name`,`email`,`address`,`status`,`createdAt`,`updatedAt`) VALUES(?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.status,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    res.json("User created successfully!");
  });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
