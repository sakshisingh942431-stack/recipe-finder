// src/components/SearchRecipes.js
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./search.css";

const SearchRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  // helper: ek function jo recipes ko search text ke according filter kare
  const filterRecipes = (allRecipes, value) => {
    if (!value) return allRecipes;

    const val = value.toLowerCase();

    return allRecipes.filter((recipe) => {
      const parts = [];

      if (typeof recipe.title === "string") parts.push(recipe.title);
      if (typeof recipe.description === "string")
        parts.push(recipe.description);
      if (typeof recipe.area === "string") parts.push(recipe.area);
      if (typeof recipe.category === "string") parts.push(recipe.category);

      if (Array.isArray(recipe.ingredients)) {
        parts.push(
          recipe.ingredients
            .map((item) =>
              typeof item === "string" ? item : JSON.stringify(item)
            )
            .join(" ")
        );
      } else if (typeof recipe.ingredients === "string") {
        parts.push(recipe.ingredients);
      } else if (recipe.ingredients) {
        parts.push(JSON.stringify(recipe.ingredients));
      }

      if (Array.isArray(recipe.tags)) {
        parts.push(recipe.tags.join(" "));
      } else if (typeof recipe.tags === "string") {
        parts.push(recipe.tags);
      }

      if (typeof recipe.instructions === "string") {
        parts.push(recipe.instructions);
      }
      if (Array.isArray(recipe.instructions)) {
        parts.push(recipe.instructions.join(" "));
      }

      const haystack = parts.join(" ").toLowerCase();
      return haystack.includes(val);
    });
  };

  // sab recipes fetch karo
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/recipes");
        const data = res.data || [];
        setRecipes(data);

        // URL se ?category=Indian jaisa value nikalo
        const params = new URLSearchParams(location.search);
        const categoryFromURL = params.get("category") || "";

        if (categoryFromURL) {
          setSearchTerm(categoryFromURL); // search box me bhi dikh jayega
          const filtered = filterRecipes(data, categoryFromURL);
          setFilteredRecipes(filtered);
        } else {
          setFilteredRecipes(data);
        }
      } catch (err) {
        console.error("Error fetching recipes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // category change hogi to fir se run hoga

  // search bar change hone pe filter
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = filterRecipes(recipes, value);
    setFilteredRecipes(filtered);
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h2>Search Recipes</h2>
        <p>
          Type anything or select category from home (Indian, Italian, Drinks,
          Diet, Dessert).
        </p>

        <input
          type="text"
          className="search-input"
          placeholder="e.g. paneer, dosa, cake, spicy..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p className="search-status">Loading recipes...</p>}

      {!loading && (
        <div className="search-results-grid">
          {filteredRecipes.length === 0 ? (
            <p className="search-status">
              No recipes found. Try a different word.
            </p>
          ) : (
            filteredRecipes.map((recipe) => {
              const id = recipe._id || recipe.id || recipe.title;

              const shortDescription =
                typeof recipe.description === "string"
                  ? recipe.description.slice(0, 120)
                  : "";

              return (
                <div key={id} className="recipe-card">
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="recipe-image"
                    />
                  )}

                  <h3>{recipe.title}</h3>

                  {shortDescription && (
                    <p className="recipe-snippet">
                      {shortDescription}
                      {recipe.description &&
                        recipe.description.length > 120 &&
                        "..."}
                    </p>
                  )}

                  <Link
                    to={`/recipes/${recipe._id || recipe.id}`}
                    className="view-btn"
                  >
                    View Details
                  </Link>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRecipes;
