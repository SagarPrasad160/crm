const express = require("express");
const router = express.Router();
const requireAuth = require("../../middlewares/requireAuth");
const requireAdminAuth = require("../../middlewares/requireAdminAuth");

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

// Gets a User Service
router.get(
  "/:userId/services/:serviceId",
  requireAdminAuth,
  async (req, res) => {
    const { serviceId } = req.params;
    try {
      const [service] = await pool.execute(
        "SELECT * FROM services WHERE id = ?",
        [serviceId]
      );
      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/assign/:userId/services", requireAuth, async (req, res) => {
  const { type, user, desc, paymentCycle, charge, status } = req.body;
  try {
    await pool.execute(
      "INSERT INTO services(`type`, `user`,`desc`,`paymentCycle`,`charge`, `status`,`createdAt`) VALUES (?, ?, ?,?,?,?, CURRENT_TIMESTAMP)",
      [type, user, desc, paymentCycle, charge, status]
    );
    res.json("Service added successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// Route to update a service
router.post(
  "/:userId/services/update/:serviceId",
  requireAdminAuth,
  async (req, res) => {
    const { serviceId } = req.params;
    const { charge, desc, paymentCycle, status } = req.body;

    try {
      // Update the service with the provided serviceId
      const [result] = await pool.execute(
        "UPDATE services SET charge = ?, `desc` = ?, paymentCycle = ? ,status = ? WHERE id = ?",
        [charge, desc, paymentCycle, status, serviceId]
      );
      if (result.affectedRows > 0) {
        // Service updated successfully
        res.json("Service updated successfully!");
      } else {
        // No service found with the given serviceId
        res.status(404).json("Service not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);
router.get("/:userId", requireAuth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route  POST /api/services
//@des request a service
// @access Private
router.post("/request/:userId/services", requireAuth, async (req, res) => {
  const { type, user, desc } = req.body;
  try {
    await pool.execute(
      "INSERT INTO services(`type`, `user`,`desc`, `createdAt`) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
      [type, user, desc]
    );
    res.json("Service added successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
