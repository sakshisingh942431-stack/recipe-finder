// backend/routes/recipeRoutes.js (CommonJS)
const express = require("express");
const Recipe = require("../models/RecipeModel");
const { importMealDb } = require("../controllers/mealdbController");

const router = express.Router();

/* ---------- BASIC CRUD ROUTES ---------- */

// GET /api/recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error("GET /api/recipes error:", err);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

// POST /api/recipes
router.post("/", async (req, res) => {
  try {
    const data = req.body || {};
    const recipe = new Recipe(data);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    console.error("POST /api/recipes error:", err);
    res.status(500).json({ message: "Failed to create recipe" });
  }
});

// DELETE /api/recipes/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    console.error("DELETE /api/recipes/:id error:", err);
    res.status(500).json({ message: "Failed to delete recipe" });
  }
});

/* ---------- SEARCH & FILTER ROUTES ---------- */

router.get("/search", async (req, res) => {
  try {
    const q = req.query.q || "";
    const recipes = await Recipe.find({
      title: { $regex: q, $options: "i" },
    }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error("GET /api/recipes/search error:", err);
    res.status(500).json({ message: "Failed to search recipes" });
  }
});

router.get("/tags", async (req, res) => {
  try {
    const tags = await Recipe.distinct("tags");
    res.json(tags);
  } catch (err) {
    console.error("GET /api/recipes/tags error:", err);
    res.status(500).json({ message: "Failed to fetch tags" });
  }
});

router.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await Recipe.distinct("ingredients");
    res.json(ingredients);
  } catch (err) {
    console.error("GET /api/recipes/ingredients error:", err);
    res.status(500).json({ message: "Failed to fetch ingredients" });
  }
});

/* ---------- SINGLE RECIPE DETAIL ROUTE ---------- */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    console.error("GET /api/recipes/:id error:", err);
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
});

/* ---------- MEALDB IMPORT ROUTE ---------- */

router.post("/import-mealdb", importMealDb);

module.exports = router;
