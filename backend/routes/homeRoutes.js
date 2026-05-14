const express = require("express");

const router = express.Router();

const Recipe = require("../models/RecipeModel");

const User = require("../models/User");

const ShortVideo = require("../models/ShortVideo");

/* HOME API */

router.get("/", async (req, res) => {
  try {

    const totalRecipes =
      await Recipe.countDocuments();

    const totalUsers =
      await User.countDocuments();

    const totalVideos =
      await ShortVideo.countDocuments();

    const latestRecipes =
      await Recipe.find()
        .sort({ createdAt: -1 })
        .limit(6);

  res.json({
  success: true,

  stats: {
      recipes: totalRecipes,
  users: totalUsers,
  videos: totalVideos
  },

  latestRecipes,

  miniTags: [
    "🥗 Weight Loss Meals",
    "🍳 Quick Breakfast",
    "🥑 Healthy Snacks",
    "🔥 Fat Burner"
  ]
});

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
});

module.exports = router;