const express = require("express");
const router = express.Router();
const ShortVideo = require("../models/ShortVideo");


// ✅ TEMP TEST ROUTE (browser se direct upload test)
router.get("/test-upload", async (req, res) => {
  try {
    const newVideo = new ShortVideo({
      title: "Test Video",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "",
      user: "Sakshi",
      role: "user",
      status: "pending"
    });

    await newVideo.save();
    res.json(newVideo);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Upload Video (user + admin)
router.post("/upload", async (req, res) => {
  try {
    const { title, videoUrl, thumbnail, user, role } = req.body;

    const newVideo = new ShortVideo({
      title,
      videoUrl,
      thumbnail,
      user,
      role,
      status: role === "admin" ? "approved" : "pending"
    });

    await newVideo.save();

    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ USER → only approved videos
router.get("/user", async (req, res) => {
  try {
    const videos = await ShortVideo.find({ status: "approved" }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ ADMIN → all videos
router.get("/admin", async (req, res) => {
  try {
    const videos = await ShortVideo.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Update status (approve / reject)
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await ShortVideo.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Delete video
router.delete("/:id", async (req, res) => {
  try {
    await ShortVideo.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;