export const normalizeRecipe = (data) => {
  if (!data) return null;

  // 🔥 CASE 1: MealDB direct API
  if (data.idMeal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ing = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];

      if (ing && ing.trim() !== "") {
        ingredients.push(
          `${ing.trim()} ${measure ? measure.trim() : ""}`.trim()
        );
      }
    }

    return {
      id: data.idMeal,
      name: data.strMeal,
      image: data.strMealThumb,
      category: data.strCategory,
      area: data.strArea || "",
      ingredients,
      instructions: data.strInstructions || "",
      steps: data.strInstructions
        ? data.strInstructions
            .split(/\r?\n|\./)
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : [],
      video: data.strYoutube || null
    };
  }

  // 🔥 CASE 2: Backend (MealDB imported + Custom दोनों)

  let ingredients = [];

  if (Array.isArray(data.ingredients)) {
    // ✅ अगर string array है
    if (typeof data.ingredients[0] === "string") {
      ingredients = data.ingredients;
    }

    // ✅ अगर object array है (MealDB import वाला)
    else if (typeof data.ingredients[0] === "object") {
      ingredients = data.ingredients.map((item) =>
        `${item.name || ""} ${item.qty || ""}`.trim()
      );
    }
  }

  return {
    id: data.id || data._id,
    name: data.name || data.title,
    image: data.image,
    category: data.category || "",
    area: data.area || "",

    // 🔥 FIXED
    ingredients,

    instructions: data.instructions || data.description || "",

    steps: Array.isArray(data.steps)
      ? data.steps
      : data.instructions || data.description
      ? (data.instructions || data.description)
          .split(/\r?\n|\./)
          .map((s) => s.trim())
          .filter((s) => s !== "")
      : [],

    // 🔥 VIDEO FIX
    video: data.videoUrl || data.video || null
  };
};