const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const authMiddleware = require("../middleware/authMiddleware");

/* ======================
   SEND MESSAGE
====================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({
      userId: req.user.userId,
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

/* ======================
   GET ALL MESSAGES (ADMIN PANEL)
====================== */
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.json(messages); // ✅ MUST be array
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

/* ======================
   GET MY MESSAGES (PROFILE)
====================== */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find({
      userId: req.user.userId,
    })
      .sort({ createdAt: -1 })
      .limit(1);

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   DELETE MESSAGE (ADMIN)
====================== */
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting message" });
  }
});

module.exports = router;