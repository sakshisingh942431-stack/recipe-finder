import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import "./search.css";

const SearchRecipes = () => {

  const [recipes, setRecipes] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    filteredRecipes,
    setFilteredRecipes
  ] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const location =
    useLocation();

  // ✅ BACK BUTTON NAVIGATION
  const navigate =
    useNavigate();

  /* ========================= */
  /* 🔥 FILTER FUNCTION */
  /* ========================= */

  const filterRecipes = (
    allRecipes,
    value
  ) => {

    if (!value)
      return allRecipes;

    const val =
      value.toLowerCase();

    return allRecipes.filter(
      (recipe) => {

        const parts = [];

        if (recipe.title)
          parts.push(
            recipe.title
          );

        if (
          recipe.description
        )
          parts.push(
            recipe.description
          );

        if (recipe.area)
          parts.push(
            recipe.area
          );

        if (
          recipe.category
        )
          parts.push(
            recipe.category
          );

        if (
          Array.isArray(
            recipe.ingredients
          )
        ) {

          parts.push(
            recipe.ingredients.join(
              " "
            )
          );
        }

        if (recipe.tags) {

          if (
            Array.isArray(
              recipe.tags
            )
          ) {

            parts.push(
              recipe.tags.join(
                " "
              )
            );

          } else {

            parts.push(
              recipe.tags
            );
          }
        }

        const haystack =
          parts
            .join(" ")
            .toLowerCase();

        return haystack.includes(
          val
        );
      }
    );
  };

  /* ========================= */
  /* 🔥 FETCH RECIPES */
  /* ========================= */

  useEffect(() => {

    const fetchRecipes =
      async () => {

        try {

          setLoading(true);

          const res =
            await axios.get(
              "http://localhost:5000/api/recipes"
            );

          const data =
            res.data || [];

          setRecipes(data);

          const params =
            new URLSearchParams(
              location.search
            );

          const queryFromURL =
            params.get("q") ||
            params.get(
              "category"
            ) ||
            "";

          /* 🔥 SMART KEYWORD MAP */

          let smartSearch =
            queryFromURL;

          if (
            queryFromURL
              .toLowerCase()
              .includes(
                "diet"
              )
          ) {

            smartSearch =
              "healthy";
          }

          if (
            queryFromURL
              .toLowerCase()
              .includes(
                "snack"
              )
          ) {

            smartSearch =
              "breakfast";
          }

          if (
            queryFromURL
              .toLowerCase()
              .includes(
                "fat"
              )
          ) {

            smartSearch =
              "protein";
          }

          setSearchTerm(
            queryFromURL
          );

          const filtered =
            filterRecipes(
              data,
              smartSearch
            );

          /* 🔥 FALLBACK */

          if (
            filtered.length ===
            0
          ) {

            setFilteredRecipes(
              data.slice(0, 8)
            );

          } else {

            setFilteredRecipes(
              filtered
            );
          }

        } catch (error) {

          console.log(
            "Error fetching recipes",
            error
          );

        } finally {

          setLoading(false);
        }
      };

    fetchRecipes();

  }, [location.search]);

  /* ========================= */
  /* 🔥 MANUAL SEARCH */
  /* ========================= */

  const handleSearchChange =
    (e) => {

      const value =
        e.target.value;

      setSearchTerm(value);

      setFilteredRecipes(
        filterRecipes(
          recipes,
          value
        )
      );
    };

  /* ========================= */
  /* 🔥 QUICK FILTERS */
  /* ========================= */

  const quickFilters = [
    "Indian",
    "Italian",
    "Healthy",
    "Drinks",
    "Dessert",
    "Protein",
  ];

  return (

    <div className="search-page">

      {/* ✅ BACK BUTTON */}

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
          marginLeft:
            "20px",
          marginTop:
            "20px",
          fontWeight:
            "600"
        }}
      >
        ← Back
      </button>

      {/* HERO */}

      <div className="search-header">

        <h1>
          Discover Delicious Recipes 🍴
        </h1>

        <p>
          Search by name,
          ingredient,
          category or explore
          trending healthy
          meals.
        </p>

        <input
          type="text"
          className="search-input"
          placeholder="Search paneer, pasta, smoothie..."
          value={searchTerm}
          onChange={
            handleSearchChange
          }
        />

        {/* QUICK FILTERS */}

        <div className="filter-buttons">

          {quickFilters.map(
            (
              item,
              index
            ) => (

              <button
                key={index}
                onClick={() => {

                  setSearchTerm(
                    item
                  );

                  setFilteredRecipes(
                    filterRecipes(
                      recipes,
                      item
                    )
                  );
                }}
              >
                {item}
              </button>

            )
          )}

        </div>

      </div>

      {/* LOADING */}

      {loading && (

        <p className="search-status">
          Loading recipes...
        </p>

      )}

      {/* RESULTS */}

      {!loading && (

        <div className="search-results-grid">

          {filteredRecipes.length ===
          0 ? (

            <p className="search-status">

              No recipes found 😔
              Try another keyword.

            </p>

          ) : (

            filteredRecipes.map(
              (recipe) => {

                const id =
                  recipe._id ||
                  recipe.id;

                return (

                  <div
                    key={id}
                    className="recipe-card"
                  >

                    <img
                      src={
                        recipe.image
                      }
                      alt={
                        recipe.title
                      }
                      className="recipe-image"
                    />

                    <div className="card-content">

                      <h3>
                        {
                          recipe.title
                        }
                      </h3>

                      <p>

                        {recipe.description
                          ? recipe.description.slice(
                              0,
                              90
                            ) + "..."
                          : "Healthy and tasty recipe for your lifestyle."}

                      </p>

                      <Link
                        to={`/recipes/${id}`}
                        className="view-btn"
                      >
                        View Details →
                      </Link>

                    </div>

                  </div>
                );
              }
            )
          )}

        </div>
      )}

    </div>
  );
};

export default SearchRecipes;