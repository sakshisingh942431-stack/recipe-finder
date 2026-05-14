import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import API from "../../utils/auth";

import "./admin.css";

const ManageRecipes = () => {

  // ✅ APPROVED
  const [recipes, setRecipes] =
    useState([]);

  // ⏳ PENDING
  const [pendingRecipes, setPendingRecipes] =
    useState([]);

  // 🔄 LOADING
  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  /* =====================================================
     ✅ FETCH APPROVED RECIPES
  ===================================================== */

  const fetchRecipes = async () => {

    try {

      const res =
        await API.get(
          "/api/recipes"
        );

      // ✅ ONLY APPROVED
      const approved =
        res.data.filter(
          (recipe) =>
            recipe.isApproved === true
        );

      setRecipes(approved);

    } catch (error) {

      console.log(
        "Error fetching recipes",
        error
      );

    }
  };

  /* =====================================================
     🔥 FETCH PENDING RECIPES
  ===================================================== */

  const fetchPendingRecipes =
    async () => {

      try {

        const res =
          await API.get(
            "/api/recipes/pending/all"
          );

        setPendingRecipes(
          res.data
        );

      } catch (err) {

        console.log(
          "Pending fetch error",
          err
        );
      }
    };

  /* =====================================================
     ✅ LOAD ALL DATA
  ===================================================== */

  const loadData = async () => {

    try {

      setLoading(true);

      await Promise.all([
        fetchRecipes(),
        fetchPendingRecipes(),
      ]);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  /* =====================================================
     ❌ DELETE RECIPE
  ===================================================== */

  const deleteRecipe = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this recipe?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/api/recipes/${id}`
      );

      alert(
        "🗑 Recipe Deleted"
      );

      loadData();

    } catch (error) {

      console.log(error);

      alert(
        "Delete failed"
      );
    }
  };

  /* =====================================================
     ✅ APPROVE RECIPE
  ===================================================== */

  const approveRecipe =
    async (id) => {

      try {

        await API.put(
          `/api/recipes/approve/${id}`
        );

        alert(
          "✅ Recipe Approved"
        );

        loadData();

      } catch (err) {

        console.log(err);

        alert(
          "Approval failed"
        );
      }
    };

  /* =====================================================
     ✏ EDIT
  ===================================================== */

  const editRecipe = (id) => {

    navigate(
      `/admin/edit-recipe/${id}`
    );
  };

  /* =====================================================
     🚀 ON LOAD
  ===================================================== */

  useEffect(() => {

    loadData();

  }, []);

  /* =====================================================
     UI
  ===================================================== */

  return (

    <div className="admin-layout">

      {/* =====================================================
         🔥 TOP BAR
      ===================================================== */}

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >

        <button
          onClick={() =>
            navigate(-1)
          }

          style={{

            padding: "10px 16px",

            background:
              "linear-gradient(45deg,#4CAF50,orange)",

            color: "#fff",

            border: "none",

            borderRadius: "8px",

            cursor: "pointer",

            fontWeight: "600",
          }}
        >
          ⬅ Back
        </button>

        <button
          onClick={() =>
            navigate("/admin")
          }

          style={{

            padding: "10px 16px",

            background:
              "linear-gradient(45deg,#4CAF50,orange)",

            color: "#fff",

            border: "none",

            borderRadius: "8px",

            cursor: "pointer",

            fontWeight: "600",
          }}
        >
          🏠 Dashboard
        </button>

      </div>

      {/* =====================================================
         🔄 LOADING
      ===================================================== */}

      {loading ? (

        <h2>
          Loading recipes...
        </h2>

      ) : (

        <>
          {/* =====================================================
             ⏳ PENDING RECIPES
          ===================================================== */}

          <h2
            style={{
              marginBottom: "20px",
              color: "#f97316",
            }}
          >
            ⏳ Pending Recipes
          </h2>

          <div className="recipe-grid">

            {pendingRecipes.length > 0 ? (

              pendingRecipes.map(
                (recipe) => (

                  <div
                    className="recipe-card"
                    key={recipe._id}
                  >

                    <img
                      src={
                        recipe.image ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                      }

                      alt={recipe.title}
                    />

                    <h3>
                      {recipe.title}
                    </h3>

                    <p>
                      {recipe.category}
                    </p>

                    {/* 🎥 VIDEO */}

                    {recipe.videoUrl && (

                      <video
                        src={
                          recipe.videoUrl
                        }

                        controls

                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          maxHeight: "220px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    {/* ✅ APPROVE */}

                    <button
                      style={{
                        background:
                          "#16a34a",

                        color: "#fff",

                        border: "none",

                        padding:
                          "10px 14px",

                        borderRadius:
                          "8px",

                        cursor: "pointer",

                        fontWeight: "600",
                      }}

                      onClick={() =>
                        approveRecipe(
                          recipe._id
                        )
                      }
                    >
                      ✅ Approve
                    </button>

                    {/* ❌ DELETE */}

                    <button

                      style={{
                        background: "red",

                        color: "#fff",

                        border: "none",

                        padding:
                          "10px 14px",

                        borderRadius:
                          "8px",

                        cursor: "pointer",

                        marginLeft: "10px",

                        fontWeight: "600",
                      }}

                      onClick={() =>
                        deleteRecipe(
                          recipe._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>
                )
              )

            ) : (

              <p
                style={{
                  color: "#666",
                  fontSize: "18px",
                }}
              >
                No pending recipes
              </p>
            )}

          </div>

          {/* =====================================================
             ✅ APPROVED RECIPES
          ===================================================== */}

          <h2
            style={{
              margin:
                "50px 0 20px",
            }}
          >
            ✅ Approved Recipes
          </h2>

          <div className="recipe-grid">

            {recipes.length > 0 ? (

              recipes.map(
                (recipe) => (

                  <div
                    className="recipe-card"
                    key={recipe._id}
                  >

                    <img
                      src={
                        recipe.image ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                      }

                      alt={recipe.title}
                    />

                    <h3>
                      {recipe.title}
                    </h3>

                    <p>
                      {recipe.category}
                    </p>

                    {/* 🎥 VIDEO */}

                    {recipe.videoUrl && (

                      <video
                        src={
                          recipe.videoUrl
                        }

                        controls

                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          marginBottom: "10px",
                          maxHeight: "220px",
                          objectFit: "cover",
                        }}
                      />
                    )}

                    {/* ✏ EDIT */}

                    <button
                      onClick={() =>
                        editRecipe(
                          recipe._id
                        )
                      }

                      style={{
                        background:
                          "#2563eb",

                        color: "#fff",

                        border: "none",

                        padding:
                          "10px 14px",

                        borderRadius:
                          "8px",

                        cursor: "pointer",

                        fontWeight: "600",
                      }}
                    >
                      ✏ Edit
                    </button>

                    {/* ❌ DELETE */}

                    <button

                      style={{
                        background: "red",

                        color: "#fff",

                        border: "none",

                        padding:
                          "10px 14px",

                        borderRadius:
                          "8px",

                        cursor: "pointer",

                        marginLeft: "10px",

                        fontWeight: "600",
                      }}

                      onClick={() =>
                        deleteRecipe(
                          recipe._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>
                )
              )

            ) : (

              <p
                style={{
                  color: "#666",
                  fontSize: "18px",
                }}
              >
                No approved recipes
              </p>
            )}

          </div>

        </>
      )}

    </div>
  );
};

export default ManageRecipes;