import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/auth";
import "./admin.css";

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const res = await API.get("/api/recipes");
      setRecipes(res.data);
    } catch (error) {
      console.log("Error fetching recipes");
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await API.delete(`/api/admin/recipes/${id}`);
      alert("Recipe Deleted");
      fetchRecipes();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const editRecipe = (id) => {
    navigate(`/admin/edit-recipe/${id}`);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="admin-layout">
      <h2>Manage Recipes</h2>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>{recipe.category}</p>

            <button onClick={() => editRecipe(recipe._id)}>
              Edit
            </button>

            <button
              style={{ background: "red", marginLeft: "10px" }}
              onClick={() => deleteRecipe(recipe._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRecipes;