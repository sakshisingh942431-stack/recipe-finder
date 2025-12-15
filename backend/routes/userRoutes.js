// backend/routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const JWT_EXPIRES = "7d";

/* ======================= SIGNUP ======================= */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      favorites: [],
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    return res.status(201).json({
      message: "User created",
      userId: user._id,
      name: user.name,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ======================= LOGIN ======================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    return res.json({
      message: "Login successful",
      userId: user._id,
      name: user.name,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ======================= TOGGLE FAVORITE ======================= */
// POST /api/users/favorite/:recipeId
router.post("/favorite/:recipeId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { recipeId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFav = user.favorites.some(
      (id) => id.toString() === recipeId
    );

    if (alreadyFav) {
      user.favorites.pull(recipeId);
    } else {
      user.favorites.push(recipeId);
    }

    await user.save();

    res.json({
      success: true,
      added: !alreadyFav,
      favorites: user.favorites,
    });
  } catch (err) {
    console.error("Favorite error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================= GET FAVORITES ======================= */
// GET /api/users/favorites
router.get("/favorites", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      favorites: user.favorites,
    });
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
