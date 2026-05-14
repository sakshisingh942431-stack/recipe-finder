const express = require("express");
const router = express.Router();

const ShortVideo = require("../models/ShortVideo");

// ⚠️ अगर ये models नहीं हैं तो बाद में देखेंगे
let User, Recipe;

try {
  User = require("../models/User");
} catch {}

try {
  Recipe = require("../models/Recipe");
} catch {}


// 🔥 MAIN DASHBOARD API
router.get("/stats", async (req, res) => {
  try {

    // 🎥 total videos
    const totalVideos = await ShortVideo.countDocuments();

    // ❤️ total likes
    const videos = await ShortVideo.find();
    let totalLikes = 0;

    videos.forEach(v => {
      totalLikes += (v.likes || 0);
    });

    // 👤 users (optional)
    let totalUsers = 0;
    if (User) {
      totalUsers = await User.countDocuments();
    }

    // 🍲 recipes (optional)
    let totalRecipes = 0;
    if (Recipe) {
      totalRecipes = await Recipe.countDocuments();
    }

    res.json({
      totalUsers,
      totalRecipes,
      totalVideos,
      totalLikes
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;