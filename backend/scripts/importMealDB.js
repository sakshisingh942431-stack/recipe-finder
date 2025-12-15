// backend/scripts/importMealDB.js
import mongoose from "mongoose";
import axios from "axios";
import Recipe from "../models/RecipeModel.js";

// 👉 yaha apna MongoDB connection string lagao
const MONGO_URI = "mongodb://127.0.0.1:27017/recipefinder";

// --------------------------------------
// DB CONNECT
// --------------------------------------
async function connectDB() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");
}

// --------------------------------------
// MealDB -> hamara Recipe format
// --------------------------------------
function mapMealToRecipe(meal) {
  // ingredients + measures ko array me convert karna
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ing && ing.trim() !== "") {
      ingredients.push(`${measure || ""} ${ing}`.trim());
    }
  }

  // steps ko array me convert
  let steps = [];
  if (typeof meal.strInstructions === "string") {
    steps = meal.strInstructions
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  // tags
  let tags = [];
  if (meal.strTags) {
    tags = meal.strTags.split(",").map((t) => t.trim());
  }

  return {
    // tumhare schema ke fields ke hisaab se
    title: meal.strMeal,
    category: meal.strCategory || "general",
    description:
      meal.strInstructions?.slice(0, 200) ||
      "Recipe imported from TheMealDB.",
    ingredients: ingredients.map((txt) => ({
      name: txt, // simple way: pura text name me daal diya
      qty: "",   // agar qty alag rakhni ho to schema change karna padega
    })),
    steps,
    tags,
    image: meal.strMealThumb,
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    source: "mealdb",
    mealDbId: meal.idMeal,
  };
}

// --------------------------------------
// MealDB se fetch helpers
// --------------------------------------
async function fetchMealsByLetter(letter) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const res = await axios.get(url);
  return res.data.meals || [];
}

// --------------------------------------
// MAIN IMPORT FUNCTION
// --------------------------------------
async function importMeals() {
  await connectDB();

  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  let total = 0;

  for (const letter of letters) {
    console.log(`🔎 Fetching meals starting with '${letter}'...`);
    const meals = await fetchMealsByLetter(letter);

    for (const meal of meals) {
      const doc = mapMealToRecipe(meal);

      // same mealDbId wali recipe pehle se ho to update, warna nayi create
      await Recipe.findOneAndUpdate(
        { mealDbId: doc.mealDbId },
        doc,
        { upsert: true, new: true }
      );

      total++;
    }
  }

  console.log(`✅ Imported/updated total ${total} recipes from TheMealDB`);
  await mongoose.disconnect();
  process.exit(0);
}

// --------------------------------------
// RUN SCRIPT
// --------------------------------------
importMeals().catch((err) => {
  console.error("❌ Error importing recipes:", err);
  mongoose.disconnect();
  process.exit(1);
});
