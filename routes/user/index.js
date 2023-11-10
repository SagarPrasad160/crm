const express = require("express");
const router = express.Router();
const requireAuth = require("../../middlewares/requireAuth");

const pool = require("../../db"); // Import the database connection

//@route  GET /api/services/:userId
//@des get user services
// @access Private
router.get("/:userId/services", requireAuth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const [userServices] = await pool.execute(
      "SELECT * FROM services WHERE user = ?",
      [userId]
    );
    res.json(userServices);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route  POST /api/services
//@des submit a service
// @access Private
router.post("/:userId/services", requireAuth, async (req, res) => {
  const { type, charge, user, desc } = req.body;
  try {
    await pool.execute(
      "INSERT INTO services(`type`, `charge`, `user`,`desc`, `createdAt`) VALUES (?, ?, ?,?, CURRENT_TIMESTAMP)",
      [type, charge, user, desc]
    );
    res.json("Service added successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
