const express = require("express");
const router = express.Router();

const {
  signupUser,
  loginUser,
  forgotPassword
} = require("../controllers/userController");

// 🔥 USER MODEL
const User = require("../models/User");

// ==========================
// AUTH ROUTES
// ==========================

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

// ==========================
// 🔥 GET ALL USERS
// ==========================

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching users"
    });
  }
});

// ==========================
// 🔥 DELETE USER
// ==========================

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Delete failed"
    });
  }
});

module.exports = router;