const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db"); // Import the database connection
const requireAuth = require("../middlewares/requireAuth");

router.post(
  "/create",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
    body("address").notEmpty().withMessage("Address is required"),
    body("phone")
      .notEmpty()
      .withMessage("Phone is required")
      .isMobilePhone()
      .withMessage("Invalid phone number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password, address } = req.body;

    try {
      const [existingUsers] = await pool.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (existingUsers.length > 0) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const [user] = await pool.execute(
        "INSERT INTO users (`name`, `email`,`phone`, `password`, `address`, `createdAt`, `updatedAt`) VALUES (?, ?, ?, ?,?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
        [name, email, phone, hashedPassword, address]
      );

      const payload = {
        user: {
          id: user.insertId,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

// GET a logged-in user
router.get("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const q =
    "SELECT id, name, email, address, createdAt, updatedAt FROM users WHERE id = ?";
  try {
    const [user] = await pool.execute(q, [userId]);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// POST login user
router.post(
  "/",
  [
    check("email", "Please enter email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const q = "SELECT * FROM users WHERE email = ?";
    try {
      const [users] = await pool.execute(q, [email]);

      if (!users.length) {
        return res.status(400).send({ msg: "Invalid Email" });
      }

      const user = users[0];

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(400).send({ msg: "Incorrect Password" });
      }

      const payload = {
        user: {
          id: user.id,
          isAdmin: user.email === "test@test.com",
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
