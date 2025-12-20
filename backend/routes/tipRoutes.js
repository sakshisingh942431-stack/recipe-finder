const express = require("express");
const router = express.Router();
const Tip = require("../models/Tip");
const authMiddleware = require("../middleware/authMiddleware");

/* ================= ADD TIP ================= */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const tip = new Tip({
      userId: req.user.userId,
      title,
      description,
    });

    await tip.save();
    res.status(201).json({ message: "Tip saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET MY TIPS ================= */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const tips = await Tip.find({ userId: req.user.userId })
      .sort({ createdAt: -1 }) .limit(1);

    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
