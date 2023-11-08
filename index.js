require("dotenv").config();
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

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

module.exports = db.promise();
