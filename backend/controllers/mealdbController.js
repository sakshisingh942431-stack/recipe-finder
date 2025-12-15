// backend/controllers/mealdbController.js
const axios = require("axios");
const Recipe = require("../models/RecipeModel");

async function importMealDb  (req, res) {
  try {
    // ---------- INPUT NORMALIZE ----------

    // Optional area: "Indian" / "italian" ...
    const rawArea = (req.body.area || "").trim();
    const area = rawArea
      ? rawArea.charAt(0).toUpperCase() + rawArea.slice(1).toLowerCase()
      : "";

    // Optional category: "Dessert" / "Seafood" ...
    const rawCategory = (req.body.category || "").trim();
    const category = rawCategory
      ? rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase()
      : "";

    const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

    // ---------- 1) LIST FETCH (area / category ke hisaab se) ----------

    let filterParams = {};
    let contextLabel = "";

    if (area && !category) {
      // Sirf area diya hai -> ?a=Indian
      filterParams = { a: area };
      contextLabel = `area: ${area}`;
    } else if (!area && category) {
      // Sirf category diya hai -> ?c=Dessert
      filterParams = { c: category };
      contextLabel = `category: ${category}`;
    } else if (area && category) {
      // Dono diye hain -> pehle category se list, baad me area se filter
      filterParams = { c: category };
      contextLabel = `category: ${category} (filter area: ${area})`;
    } else {
      // Kuch nahi diya -> default Dessert category
      filterParams = { c: "Dessert" };
      contextLabel = "default category: Dessert";
    }

    const listRes = await axios.get(`${MEALDB_BASE}/filter.php`, {
      params: filterParams,
    });

    let mealsList = listRes.data.meals || [];

    if (mealsList.length === 0) {
      return res.status(404).json({
        message: `No meals found for ${contextLabel}`,
        count: 0,
        recipes: [],
      });
    }

    // Thoda limit (20)
    mealsList = mealsList.slice(0, 20);

    // ---------- 2) FULL DETAIL FOR EACH MEAL ----------

    const detailPromises = mealsList.map((m) =>
      axios.get(`${MEALDB_BASE}/lookup.php`, {
        params: { i: m.idMeal },
      })
    );

    const detailResults = await Promise.all(detailPromises);

    let fullMeals = detailResults
      .map((r) => (r.data.meals && r.data.meals[0]) || null)
      .filter(Boolean);

    // ---------- 3) Extra filtering (area + category combo) ----------

    // Agar dono diye the (area + category), to ab detail me se area filter
    if (area && category) {
      fullMeals = fullMeals.filter(
        (meal) => (meal.strArea || "").toLowerCase() === area.toLowerCase()
      );
    }

    if (fullMeals.length === 0) {
      return res.status(404).json({
        message: `No detailed meals found for ${contextLabel}`,
        count: 0,
        recipes: [],
      });
    }

    // ---------- 4) SAVE TO MONGODB (avoid duplicates) ----------

    let inserted = 0;
    let skipped = 0;
    const savedTitles = [];

    for (let meal of fullMeals) {
      const exists = await Recipe.findOne({ title: meal.strMeal });
      if (exists) {
        skipped++;
        continue;
      }

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const qty = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
          ingredients.push({
            name: ing.trim(),
            qty: (qty || "").trim(),
          });
        }
      }

      const newRecipe = new Recipe({
        title: meal.strMeal,
        image: meal.strMealThumb,
        area: meal.strArea,
        category: meal.strCategory,
        description: meal.strInstructions,
        tags: meal.strTags ? meal.strTags.split(",") : [],
        ingredients,
      });

      await newRecipe.save();
      inserted++;
      savedTitles.push({
        title: meal.strMeal,
        area: meal.strArea,
        category: meal.strCategory,
      });
    }

    return res.status(201).json({
      message: `Imported ${inserted} recipes from MealDB (${contextLabel}).`,
      count: inserted,
      skipped,
      recipes: savedTitles,
    });
  } catch (err) {
    console.error("IMPORT MEALDB ERROR:", err);
    res.status(500).json({ message: "Failed to import recipes" });
  }
}
module.exports = {
  importMealDb,
};










