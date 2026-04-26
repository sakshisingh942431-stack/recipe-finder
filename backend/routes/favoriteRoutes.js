const express = require("express");
const router = express.Router();

const User = require("../models/User");

/* Add Favorite */
router.post("/add", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    const user = await User.findById(userId);

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    res.json({
      success: true,
      message: "Added to favorites",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Remove Favorite */
router.post("/remove", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    const user = await User.findById(userId);

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== recipeId
    );

    await user.save();

    res.json({
      success: true,
      message: "Removed from favorites",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Get Favorites */
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("favorites");

    res.json(user.favorites);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;