const express = require("express");
const router = express.Router();
const pool = require("../../db"); // Import the database connection

const bcrypt = require("bcryptjs");

const requireAdminAuth = require("../../middlewares/requireAdminAuth");

//@route  GET /api/users
//@des get all users
// @access Private Admin
router.get("/users", requireAdminAuth, async (req, res) => {
  try {
    const [users] = await pool.execute("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route  POST /api/users
//@des create a user
// @access Private Admin
router.post("/users", async (req, res) => {
  const { name, email, address, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      "INSERT INTO users (`name`, `email`,  `password`, `address`, `createdAt`, `updatedAt`) VALUES (?, ?, ?,?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
      [name, email, hashedPassword, address]
    );
    res.json("User created successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route  GET /api/services
//@des gets all services
// @access Private Admin
router.get("/services", async (req, res) => {
  try {
    const [services] = await pool.execute("SELECT * FROM services");
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
