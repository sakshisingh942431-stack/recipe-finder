const express = require("express");
const router = express.Router();
const Recipe = require("../models/RecipeModel");

const {
  adminLogin,
  adminForgotPassword
} = require("../controllers/adminController");


// ===============================
// ADMIN LOGIN
// ===============================
router.post("/login", adminLogin);


// ===============================
// ADMIN FORGOT PASSWORD
// ===============================
router.post("/forgot-password", adminForgotPassword);


// ===============================
// ADD NEW RECIPE
// ===============================
router.post("/recipes", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();

    res.status(201).json({
      message: "Recipe added successfully",
      recipe: newRecipe
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding recipe"
    });
  }
});


// ===============================
// DELETE RECIPE
// ===============================
router.delete("/recipes/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);

    res.json({
      message: "Recipe deleted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting recipe"
    });
  }
});

module.exports = router;