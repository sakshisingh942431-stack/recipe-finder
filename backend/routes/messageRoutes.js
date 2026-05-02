const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");


// ✅ POST — user message send
router.post("/", authMiddleware, async (req, res) => {
  try {
    const msg = await Message.create({
      userId: req.user.userId,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET — user ke apne messages
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET — ADMIN: sab messages dekhe
router.get("/admin", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ PUT — ADMIN reply update
router.put("/reply/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { reply: req.body.reply },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating reply" });
  }
});


// ✅ DELETE — ADMIN message delete
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});


module.exports = router;