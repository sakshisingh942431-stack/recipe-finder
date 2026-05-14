import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/recipes/${id}`
      );
      setRecipe(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // 🔥 UPDATE API
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/recipes/${id}`,
        recipe
      );

      alert("Recipe updated successfully ✅");
      navigate("/admin/manage-recipes");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Recipe</h2>

      {/* TITLE */}
      <input
        name="title"
        value={recipe.title}
        onChange={handleChange}
        placeholder="Title"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      {/* CATEGORY */}
      <input
        name="category"
        value={recipe.category}
        onChange={handleChange}
        placeholder="Category"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={recipe.description}
        onChange={handleChange}
        placeholder="Description"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      {/* IMAGE URL */}
      <input
        name="image"
        value={recipe.image}
        onChange={handleChange}
        placeholder="Image URL"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      {/* BUTTONS */}
      <button
        onClick={handleUpdate}
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          marginRight: "10px"
        }}
      >
        Save Changes
      </button>

      <button onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
}