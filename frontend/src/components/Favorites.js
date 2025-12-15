import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/auth";
import { AuthContext } from "../context/AuthContext";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await API.get("/api/users/favorites");

        // ✅ FIX HERE
        setRecipes(res.data.favorites || []);
      } catch (err) {
        console.error("Favorites fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, navigate]);

  if (loading) return <p style={{ padding: 20 }}>Loading favorites...</p>;

  if (!recipes.length) {
    return <p style={{ padding: 20 }}>No favorites yet ❤️</p>;
  }

  return (
    <div style={{ padding: "1.5rem", maxWidth: 1100, margin: "auto" }}>
      <h2>❤️ My Favorite Recipes</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: 20,
        }}
      >
        {recipes.map((recipe) => (
          <Link
            key={recipe._id}
            to={`/recipes/${recipe._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 12,
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}

            <h4 style={{ marginTop: 10 }}>{recipe.title}</h4>
            <p style={{ color: "#666" }}>{recipe.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
