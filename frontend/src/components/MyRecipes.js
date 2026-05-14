import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5000/api/recipes";

const MyRecipes = () => {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH RECIPES
  // =========================

  useEffect(() => {

    const fetchRecipes = async () => {

      try {

        setLoading(true);

        const res = await fetch(API_BASE);

        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await res.json();

        setRecipes(data);

      } catch (err) {

        console.log(err);

        setError("Recipes load nahi ho paayi.");

      } finally {

        setLoading(false);
      }
    };

    fetchRecipes();

  }, []);

  // =========================
  // SAVE FAVORITE
  // =========================

  const handleSaveRecipe = (recipe) => {

    const recipeId =
      recipe._id?.toString() ||
      recipe.id?.toString();

    if (!recipeId) {

      alert("Recipe ID missing");
      return;
    }

    const saved =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    // CHECK DUPLICATE

    const alreadyExists =
      saved.some(
        (item) =>
          item.id === recipeId
      );

    if (alreadyExists) {

      alert("Already Saved ❤️");
      return;
    }

    // SAVE OBJECT

    const recipeData = {

      id: recipeId,

      title:
        recipe.title ||
        recipe.name ||
        "Recipe",

      image:
        recipe.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",

      calories:
        recipe.calories ||
        recipe.category ||
        "Healthy Recipe"
    };

    const updated = [
      ...saved,
      recipeData
    ];

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

    alert("Recipe Saved ❤️");
  };

  // =========================
  // DELETE RECIPE
  // =========================

  const handleDeleteRecipe = async (id) => {

    const ok =
      window.confirm(
        "Pakka delete karna hai?"
      );

    if (!ok) return;

    try {

      const res =
        await fetch(
          `${API_BASE}/${id}`,
          {
            method: "DELETE",
          }
        );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setRecipes((prev) =>
        prev.filter(
          (r) =>
            (
              r._id ||
              r.id
            ) !== id
        )
      );

      alert("Recipe delete ho gayi.");

    } catch (err) {

      console.log(err);

      alert("Delete error");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <p style={{ padding: "20px" }}>
        Loading...
      </p>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <div style={{ padding: "20px" }}>
        <p>{error}</p>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (

    <div style={{ padding: "20px" }}>

      <h2>
        My Recipes ({recipes.length})
      </h2>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(260px,1fr))",

          gap: "20px",

          marginTop: "20px"
        }}
      >

        {recipes.map((recipe) => {

          const recipeId =
            recipe._id?.toString() ||
            recipe.id?.toString();

          return (

            <div
              key={recipeId}

              style={{
                background: "#fff",

                borderRadius: "12px",

                overflow: "hidden",

                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >

              {/* IMAGE */}

              <img
                src={
                  recipe.image ||
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                }

                alt={
                  recipe.title ||
                  recipe.name
                }

                style={{
                  width: "100%",

                  height: "220px",

                  objectFit: "cover"
                }}
              />

              {/* BODY */}

              <div
                style={{
                  padding: "15px"
                }}
              >

                <h3>
                  {recipe.title ||
                    recipe.name}
                </h3>

                <p
                  style={{
                    color: "#666"
                  }}
                >
                  {recipe.category ||
                    "Healthy Recipe"}
                </p>

                <div
                  style={{
                    display: "flex",

                    gap: "10px",

                    marginTop: "15px"
                  }}
                >

                  {/* VIEW */}

                  <Link
                    to={`/recipes/${recipeId}`}

                    style={{
                      flex: 1
                    }}
                  >

                    <button
                      style={{
                        width: "100%",

                        padding: "10px",

                        border: "none",

                        borderRadius: "8px",

                        background: "#4da6ff",

                        color: "#fff",

                        cursor: "pointer"
                      }}
                    >
                      View
                    </button>

                  </Link>

                  {/* SAVE */}

                  <button
                    onClick={() =>
                      handleSaveRecipe(recipe)
                    }

                    style={{
                      flex: 1,

                      padding: "10px",

                      border: "none",

                      borderRadius: "8px",

                      background: "#38b000",

                      color: "#fff",

                      cursor: "pointer"
                    }}
                  >
                    Save
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDeleteRecipe(recipeId)
                    }

                    style={{
                      flex: 1,

                      padding: "10px",

                      border: "none",

                      borderRadius: "8px",

                      background: "#ff4d4d",

                      color: "#fff",

                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default MyRecipes;