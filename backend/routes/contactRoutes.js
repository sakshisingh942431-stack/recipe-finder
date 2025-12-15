const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const authMiddleware = require("../middleware/authMiddleware");

// SEND MESSAGE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({
      userId: req.user.userId,   // 🔑 logged-in user
      name,
      email,
      message,
    });

    await contact.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET MY MESSAGES (PROFILE)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 })
    .limit(1);

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
