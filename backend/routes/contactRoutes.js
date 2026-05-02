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
   🔥 GET MESSAGES COUNT (ADMIN BADGE)
====================== */
router.get("/count", async (req, res) => {
  try {
    const count = await Contact.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   🔥 ADMIN REPLY
====================== */
router.put("/reply/:id", async (req, res) => {
  try {
    const { reply } = req.body;

    const updatedMessage = await Contact.findByIdAndUpdate(
      req.params.id,
      { reply },
      { new: true }
    );

    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: "Reply failed" });
  }
});

/* ======================
   GET ALL MESSAGES (ADMIN PANEL)
====================== */
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

/* ======================
   🔥 GET MY MESSAGES (USER)
====================== */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });   // ✅ FIX: limit हटाया

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