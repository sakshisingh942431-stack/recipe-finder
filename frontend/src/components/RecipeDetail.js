import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/auth";

const API_BASE = "http://localhost:5000/api/recipes";

/* ---------------- INGREDIENT HELPERS ---------------- */

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
    const val = recipe[k];
    if (Array.isArray(val)) collected.push(...val);
    else if (val) collected.push(val);
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
        if (typeof ing === "string") return { name: ing.trim(), qty: "" };

        if (ing && typeof ing === "object") {
          const name =
            ing.name ||
            ing.ingredient ||
            ing.item ||
            ing.text ||
            ing.original ||
            ing.food ||
            "";

          const qty =
            ing.qty || ing.quantity || ing.amount || ing.measure || "";

          return { name: String(name).trim(), qty: String(qty).trim() };
        }
        return null;
      })
      .filter(Boolean);
  }

  if (typeof ingredients === "string") {
    return ingredients
      .split(/\r?\n|,|•/g)
      .map((v) => ({ name: v.trim(), qty: "" }))
      .filter((v) => v.name);
  }

  return [];
}

/* ---------------- MAIN COMPONENT ---------------- */

const RecipeDetail = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFav, setIsFav] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  /* -------- FETCH RECIPE -------- */
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch recipe");
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError("Recipe detail load nahi ho paayi.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  /* -------- CHECK IF FAVORITE -------- */
  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !recipe) return;

      try {
        const res = await API.get("/api/users/favorites");
        const favIds = res.data.map((r) => r._id);
        setIsFav(favIds.includes(recipe._id));
      } catch (err) {
        console.error("Check favorite error", err);
      }
    };

    checkFavorite();
  }, [recipe, user]);

  /* -------- TOGGLE FAVORITE -------- */
  const handleFavorite = async () => {
    if (!user) {
      navigate(`/login?next=${encodeURIComponent(location.pathname)}`);
      return;
    }

    try {
      setLoadingFav(true);

      const res = await API.post(
        `/api/users/favorite/${recipe._id}`
      );

      setIsFav(res.data.added);
      console.log("saved in DB", res.data);
    } catch (err) {
      console.error("Favorite save error", err);
    } finally {
      setLoadingFav(false);
    }
  };

  if (loading) return <p style={{ padding: "1rem" }}>Loading...</p>;
  if (error) return <p style={{ padding: "1rem", color: "red" }}>{error}</p>;
  if (!recipe) return null;

  const ingredients = normalizeIngredients(
    extractRawIngredients(recipe)
  );

  return (
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
      <Link to="/search" style={{ color: "#0077cc", textDecoration: "none" }}>
        ⬅ Back
      </Link>

      {/* TITLE + ❤️ */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1>{recipe.title}</h1>

        <button
          onClick={handleFavorite}
          disabled={loadingFav}
          style={{
            background: "none",
            border: "none",
            fontSize: "26px",
            cursor: "pointer",
            color: isFav ? "red" : "#999",
          }}
          title={isFav ? "Remove from favorites" : "Save to favorites"}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      <p style={{ color: "#555" }}>
        {recipe.area} {recipe.category && `· ${recipe.category}`}
      </p>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            width: "100%",
            maxHeight: "350px",
            objectFit: "cover",
            borderRadius: "8px",
            margin: "1rem 0",
          }}
        />
      )}

      {ingredients.length > 0 && (
        <>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((ing, i) => (
              <li key={i}>{ing.name}</li>
            ))}
          </ul>
        </>
      )}

      {recipe.steps && (
        <>
          <h3>Steps</h3>
          {Array.isArray(recipe.steps) ? (
            <ol>
              {recipe.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          ) : (
            <p>{recipe.steps}</p>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
