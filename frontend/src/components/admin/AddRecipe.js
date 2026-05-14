import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/auth";
import "./admin.css";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    ingredients: "",
    steps: "",
    calories: "",
    image: "",
    videoUrl: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/admin/recipes", {
        ...formData,
        ingredients: formData.ingredients.split(","),
        steps: formData.steps.split(","),
      });

      alert("Recipe Added Successfully!");

      setFormData({
        title: "",
        category: "",
        description: "",
        ingredients: "",
        steps: "",
        calories: "",
        image: "",
        videoUrl: ""
      });

    } catch (error) {
      alert("Error adding recipe");
    }
  };

  return (
    <div
  className="admin-layout"
  style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e8f5e9, #fff3e0)",
    padding: "30px"
  }}
>

      {/* 🔥 TOP BAR */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginRight: "10px",
            padding: "8px 14px",
            background: " linear-gradient(45deg, #4CAF50, orange)",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ⬅ Back
        </button>

        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "8px 14px",
            background: " linear-gradient(45deg, #4CAF50, orange)",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          🏠 Dashboard
        </button>
      </div>

      <h2>Add New Recipe</h2>

      <form onSubmit={handleSubmit} className="admin-form">

        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (Indian, Italian...)"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />

        <textarea
          name="steps"
          placeholder="Steps (comma separated)"
          value={formData.steps}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
        />

        <button type="submit">Add Recipe</button>

      </form>
    </div>
  );
};

export default AddRecipe;