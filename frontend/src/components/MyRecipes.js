import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5000/api/recipes";

// ==== helpers (waise ab use nahi ho rahe, but rehne do koi problem nahi) ====
function extractRawIngredients(recipe) {
  if (!recipe || typeof recipe !== "object") return [];

  const direct =
    recipe.ingredients ||
    recipe.ingredientLines ||
    recipe.ingredientsText ||
    recipe.rawIngredients ||
    recipe.ingridients ||
    recipe.ingridientLines;

  if (direct) return direct;

  const keys = Object.keys(recipe).filter((k) =>
    k.toLowerCase().includes("ingre")
  );

  const collected = [];
  keys.forEach((k) => {
    const value = recipe[k];
    if (Array.isArray(value)) {
      collected.push(...value);
    } else if (value != null) {
      collected.push(value);
    }
  });

  return collected;
}

function normalizeIngredients(ingredients) {
  if (!ingredients) return [];

  if (
    Array.isArray(ingredients) &&
    ingredients.length > 5 &&
    ingredients.every((v) => typeof v === "string" && v.length === 1)
  ) {
    return [{ name: ingredients.join(""), qty: "" }];
  }

  if (Array.isArray(ingredients)) {
    return ingredients
      .map((ing) => {
        if (typeof ing === "string") {
          const name = ing.trim();
          return { name, qty: "" };
        }

        if (ing && typeof ing === "object") {
          let name = (
            ing.name ||
            ing.ingredient ||
            ing.item ||
            ing.text ||
            ing.original ||
            ing.food ||
            ing.title ||
            ""
          )
            .toString()
            .trim();

          let qty = (
            ing.qty ||
            ing.quantity ||
            ing.amount ||
            ing.measure ||
            ing.unit ||
            ing.q ||
            ""
          )
            .toString()
            .trim();

          if (!name) {
            const rawValues = Object.values(ing).filter(
              (v) => v !== null && v !== undefined
            );
            const trimmed = rawValues
              .map((v) => String(v).trim())
              .filter((v) => v !== "");

            const allSingleChars =
              trimmed.length > 5 && trimmed.every((v) => v.length === 1);

            if (allSingleChars) {
              name = trimmed.join("");
            } else {
              name = trimmed.join(" ");
            }

            qty = "";
          }

          return { name, qty };
        }

        return { name: "", qty: "" };
      })
      .filter((ing) => ing.name !== "");
  }

  if (typeof ingredients === "string") {
    return ingredients
      .split(/\r?\n|,|•/g)
      .map((part) => part.trim())
      .filter((part) => part !== "")
      .map((part) => ({ name: part, qty: "" }));
  }

  return [];
}

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==== data fetch same as pehle ====
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error(err);
        setError("Recipes load nahi ho paayi.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // ==== SAVE button ====
  const handleSaveRecipe = (recipe) => {
    const saved = JSON.parse(localStorage.getItem("savedRecipes") || "[]");

    const recipeId = recipe._id || recipe.id;
    if (saved.some((r) => (r._id || r.id) === recipeId)) {
      alert("Ye recipe pehle se saved hai 🙂");
      return;
    }

    const updated = [...saved, recipe];
    localStorage.setItem("savedRecipes", JSON.stringify(updated));
    alert("Recipe save ho gayi!");
  };

  // ==== DELETE button ====
  const handleDeleteRecipe = async (id) => {
    const ok = window.confirm("Pakka delete karna hai?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setRecipes((prev) =>
        prev.filter((r, i) => (r._id || r.id || i) !== id)
      );
      alert("Recipe delete ho gayi.");
    } catch (err) {
      console.error(err);
      alert("Delete karte waqt error aayi.");
    }
  };

  if (loading) return <p style={{ padding: "1rem" }}>Loading...</p>;

  if (error)
    return (
      <div style={{ padding: "1rem" }}>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/" style={{ color: "#0077cc", textDecoration: "none" }}>
          ⬅ Back to Home
        </Link>
      </div>
    );

  if (!recipes.length)
    return (
      <div style={{ padding: "1rem" }}>
        <p>No recipes found.</p>
        <Link to="/" style={{ color: "#0077cc", textDecoration: "none" }}>
          ⬅ Back to Home
        </Link>
      </div>
    );

  return (
    <div style={{ padding: "1rem" }}>
      <h2>My Recipes ({recipes.length})</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        {recipes.map((recipe, index) => {
          const recipeId = recipe._id || recipe.id || index;
          const key = recipeId || `${recipe.title}-${index}`;

          return (
            <div
              key={key}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "0.75rem",
                background: "#fff",
              }}
            >
              {/* IMAGE */}
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              )}

              {/* TITLE + META */}
              <h3 style={{ margin: "8px 0 4px" }}>{recipe.title}</h3>

              <small style={{ color: "#555" }}>
                {recipe.area && <span>{recipe.area}</span>}
                {recipe.area && recipe.category && " · "}
                {recipe.category && <span>{recipe.category}</span>}
              </small>

              {/* 3 BUTTONS ONLY */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  marginTop: "10px",
                }}
              >
                {/* View Details */}
                <Link
                  to={`/recipes/${recipeId}`}
                  style={{ flex: 1, textDecoration: "none" }}
                >
                  <button
                    style={{
                      width: "100%",
                      padding: "6px 8px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      background: "#6fa8dc",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                  >
                    View Details
                  </button>
                </Link>

                {/* Save */}
                <button
                  onClick={() => handleSaveRecipe(recipe)}
                  style={{
                    flex: 1,
                    padding: "6px 8px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: "#93c47d",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                >
                  Save
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteRecipe(recipeId)}
                  style={{
                    flex: 1,
                    padding: "6px 8px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    background: "#e06666",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* BACK BUTTON AT PAGE END */}
      <div style={{ marginTop: "1.5rem" }}>
        <Link
          to="/"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #0077cc",
            textDecoration: "none",
            color: "#0077cc",
            fontWeight: 500,
          }}
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MyRecipes;
