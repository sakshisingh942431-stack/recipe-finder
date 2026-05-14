import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHeart,
  FaBell,
  FaShareAlt,
  FaPlayCircle,
  FaLock
} from "react-icons/fa";

import FreeSidebar from "./FreeSidebar";
import "./Dashboard.css";

const API_BASE =
  "http://localhost:5000/api/recipes";

export default function FreeDashboard() {

  const navigate = useNavigate();

  const [userName, setUserName] =
    useState("User");

  const [liked, setLiked] =
    useState([]);

  const [recipes, setRecipes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ✅ LOAD MORE STATE
  const [visibleCount, setVisibleCount] =
    useState(3);

  // =========================
  // LOAD USER
  // =========================

  useEffect(() => {

    const profile =
      JSON.parse(
        localStorage.getItem("profileData")
      );

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (profile?.name) {

      setUserName(profile.name);

    } else if (user?.name) {

      setUserName(user.name);
    }

    const saved =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    setLiked(saved);

  }, []);

  // =========================
  // FETCH RECIPES
  // =========================

  useEffect(() => {

    const fetchRecipes =
      async () => {

        try {

          setLoading(true);

          const res =
            await fetch(API_BASE);

          if (!res.ok) {

            throw new Error(
              "Failed to fetch recipes"
            );
          }

          const data =
            await res.json();

          console.log(
            "Recipes API:",
            data
          );

          setRecipes(
            Array.isArray(data)
              ? data
              : []
          );

        } catch (err) {

          console.log(
            "Recipe Fetch Error:",
            err
          );

          setRecipes([]);

        } finally {

          setLoading(false);
        }
      };

    fetchRecipes();

  }, []);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");
  };

  // =========================
  // FAVORITE
  // =========================

  const handleLike =
    (recipe) => {

      const recipeId =
        recipe?._id?.toString();

      if (!recipeId) return;

      let updated = [...liked];

      const alreadyExists =
        updated.find(
          (item) =>
            item.id === recipeId
        );

      if (alreadyExists) {

        updated =
          updated.filter(
            (item) =>
              item.id !== recipeId
          );

      } else {

        updated.push({

          id: recipeId,

          title:
            recipe.title ||
            "Recipe",

          image:
            recipe.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",

          calories:
            recipe.category ||
            "Healthy Recipe"
        });
      }

      setLiked(updated);

      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );
    };

  // =========================
  // CHECK FAVORITE
  // =========================

  const isLiked =
    (id) => {

      return liked.some(
        (item) =>
          item.id === id
      );
    };

  // =========================
  // VIEW RECIPE
  // =========================

  const viewRecipe =
    (recipeId) => {

      if (!recipeId) {

        alert(
          "Recipe ID missing"
        );

        return;
      }

      console.log(
        "Opening Recipe:",
        recipeId
      );

      navigate(
        `/recipes/${recipeId}`
      );
    };

  return (

    <div className="dashboard-container">

      <FreeSidebar onLogout={handleLogout} />

      <div className="main-content">

        {/* TOPBAR */}
{/* TOPBAR */}

<div className="topbar">

  {/* ✅ HOME BUTTON */}

  <button
    className="home-top-btn"

    onClick={() => navigate("/")}
  >
    🏠 Home
  </button>

  <div className="top-actions">

    <div className="profile">
      👤 {userName}
    </div>

  </div>

</div>
       
        {/* HERO */}

        <div className="hero-card">

          <div className="hero-left">

            <h1>
              Welcome to NutriNest
            </h1>

            <p>
              Basic features unlocked.
              Upgrade to access full dashboard.
            </p>

            <button
              onClick={() =>
                navigate("/premium-upgrade")
              }
            >
              Upgrade to Premium
            </button>

          </div>

          <div className="hero-right">

            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
              alt="food"
            />

          </div>

        </div>

        {/* STATS */}

        <div className="stats-grid">

          <div className="card">
            🔥 Calories <h2>0</h2>
          </div>

          <div className="card">
            💧 Water <h2>0</h2>
          </div>

          <div className="card">
            ⚖ BMI <h2>0</h2>
          </div>

          <div className="card">
            ❤️ Favorites
            <h2>{liked.length}</h2>
          </div>

        </div>

        {/* LOCKED */}

        <div className="chart-grid">

          <div className="chart-card locked">
            <h3>
              Weekly Report <FaLock />
            </h3>
          </div>

          <div className="chart-card locked">
            <h3>
              Nutrition Goal <FaLock />
            </h3>
          </div>

        </div>

        {/* UPGRADE */}

        <div className="upgrade-box">

          <h2>✨ Go Premium</h2>

          <p>
            Unlock charts,
            analytics & full dashboard
          </p>

          <button
            onClick={() =>
              navigate("/premium-upgrade")
            }
          >
            Upgrade Now
          </button>

        </div>

        {/* RECIPES */}

        <div className="smart-recipes">

          {loading ? (

            <h2>
              Loading recipes...
            </h2>

          ) : recipes.length === 0 ? (

            <h2>
              No recipes found.
            </h2>

          ) : (

            <>
              {/* ✅ ONLY SHOW LIMITED RECIPES */}

              {recipes
                .slice(0, visibleCount)
                .map((item, index) => {

                  const recipeId =
                    item?._id?.toString() ||
                    item?.id?.toString();

                  return (

                    <div
                      className="smart-card"
                      key={recipeId || index}
                    >

                      {/* HEART */}

                      <div
                        className="heart-icon"

                        onClick={() =>
                          handleLike(item)
                        }
                      >

                        <FaHeart
                          color={
                            isLiked(recipeId)
                              ? "red"
                              : "#cbd5e1"
                          }
                        />

                      </div>

                      {/* TOP */}

                      <div className="top-row">

                        <img
                          src={
                            item?.image ||
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                          }

                          alt={
                            item?.title || "recipe"
                          }

                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
                          }}
                        />

                        <div>

                          <h3>
                            {item?.title || "Recipe"}
                          </h3>

                          <p>
                            {item?.category || "Food"}
                          </p>

                        </div>

                      </div>

                      {/* INGREDIENTS */}

                      <h4>
                        Ingredients
                      </h4>

                      <div className="ingredient-grid">

                        {item?.ingredients
                          ?.slice(0, 4)
                          ?.map((ing, i) => (

                            <span key={i}>

                              {typeof ing === "string"
                                ? ing
                                : ing?.name || "Ingredient"}

                            </span>
                          ))}

                      </div>

                      {/* BUTTONS */}

                      <div className="social-row">

                        <span>
                          🍽️ Recipe
                        </span>
<div className="btn-group">

  <button
    className="view-recipe-btn"

    onClick={() =>
      viewRecipe(recipeId)
    }
  >
    View Recipe
  </button>

</div>
                     

                      </div>

                    </div>
                  );
                })}

              {/* ✅ LOAD MORE BUTTON */}

              {visibleCount < recipes.length && (

                <div className="load-more-container">

                  <button
                    className="load-more-btn"

                    onClick={() =>
                      setVisibleCount(
                        (prev) => prev + 3
                      )
                    }
                  >
                    More Recipes
                  </button>

                </div>

              )}

            </>
          )}

        </div>

      </div>

    </div>
  );
}