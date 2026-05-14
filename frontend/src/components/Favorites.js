import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaHeart
} from "react-icons/fa";

import "./favorites.css";

export default function Favorites() {

  const navigate =
    useNavigate();

  const [favorites,
    setFavorites] =
    useState([]);

  const [userName,
    setUserName] =
    useState("User");

  // =========================
  // LOAD FAVORITES
  // =========================

  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      ) || {};

    if (user.name) {

      setUserName(user.name);
    }

    const savedRecipes =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    setFavorites(savedRecipes);

  }, []);

  // =========================
  // REMOVE FAVORITE
  // =========================

  const removeFavorite =
    (id) => {

      const updated =
        favorites.filter(
          (item) =>
            item.id !== id
        );

      setFavorites(updated);

      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );
    };

  // =========================
  // VIEW RECIPE
  // =========================

  const viewRecipe =
    (id) => {

      if (!id) {

        alert(
          "Recipe ID missing"
        );

        return;
      }

      navigate(
        `/recipes/${id}`
      );
    };

  // =========================
  // UI
  // =========================

  return (

    <div className="favorites-page">

      <div className="favorites-main">

        {/* BACK */}

        <button
          onClick={() =>
            navigate(-1)
          }

          style={{
            padding:
              "10px 20px",

            border: "none",

            borderRadius:
              "10px",

            background:
              "#38b000",

            color: "white",

            cursor:
              "pointer",

            marginBottom:
              "20px",

            fontWeight:
              "600"
          }}
        >
          ← Back
        </button>

        {/* HERO */}

        <div className="favorites-hero">

          <h1>
            ❤️ My Favorites
          </h1>

          <p>
            Welcome {userName}
          </p>

        </div>

        {/* GRID */}

        <div className="favorites-grid">

          {favorites.length === 0 ? (

            <h2>
              No favorites yet.
            </h2>

          ) : (

            favorites.map((item) => (

              <div
                className="favorite-card"

                key={item.id}
              >

                {/* HEART */}

                <button
                  className="remove-heart"

                  onClick={() =>
                    removeFavorite(
                      item.id
                    )
                  }
                >
                  <FaHeart />
                </button>

                {/* IMAGE */}

                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                  }

                  alt={
                    item.title
                  }
                />

                {/* BODY */}

                <div className="favorite-body">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.calories}
                  </p>

                  {/* VIEW */}

                  <button
                    className="view-btn"

                    onClick={() =>
                      viewRecipe(
                        item.id
                      )
                    }
                  >
                    View Recipe
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}