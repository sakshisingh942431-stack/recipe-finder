import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import PremiumSidebar from "./premiumUser/PremiumSidebar";
import "./favorites.css";

export default function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [userName, setUserName] = useState("User");

  const recipes = [
    {
      id: "111",
      name: "High Protein Bowl",
      calories: "320 Calories",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    },
    {
      id: "222",
      name: "Weight Loss Salad",
      calories: "210 Calories",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
    },
    {
      id: "333",
      name: "Fruit Smoothie",
      calories: "180 Calories",
      image:
        "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4"
    }
  ];

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user")) || {};

    if (user.name) {
      setUserName(user.name);
    }

    const liked =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const data = recipes.filter((item) =>
      liked.includes(item.id)
    );

    setFavorites(data);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter(
      (item) => item.id !== id
    );

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated.map((x) => x.id))
    );
  };

  return (
    <div className="favorites-page">
      <PremiumSidebar onLogout={handleLogout} />

      <div className="favorites-main">

        <div className="favorites-hero">
          <h1>❤️ My Favorites</h1>
          <p>Welcome {userName}</p>
        </div>

        <div className="favorites-grid">

          {favorites.length === 0 ? (
            <h2>No favorites yet.</h2>
          ) : (
            favorites.map((item) => (
              <div
                className="favorite-card"
                key={item.id}
              >
                <button
                  className="remove-heart"
                  onClick={() =>
                    removeFavorite(item.id)
                  }
                >
                  <FaHeart />
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="favorite-body">
                  <h3>{item.name}</h3>
                  <p>{item.calories}</p>

                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(`/recipes/${item.id}`)
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