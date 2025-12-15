

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

 const handleCuisineClick = (cuisine) => {
  // Indian / Italian cards -> Search page with category filter
  navigate(`/search?category=${encodeURIComponent(cuisine)}`);
};

const handleCategoryClick = (category) => {
  // Drinks / Diet / Sweet cards -> Search page with category filter
  navigate(`/search?category=${encodeURIComponent(category)}`);
};

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Welcome to <span className="brand">Recipe Finder</span> 🍳
          </h1>
          <p>Discover, cook, and save your favorite recipes — all in one place.</p>
          <Link
  to="/search"
  style={{
    padding: "10px 18px",
    background: "orange",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  }}
>
  Explore Recipes
</Link>

        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>

        <div className="category-grid">
          {/* Indian -> Veg / Non-veg cards */}
          <div
            className="category-card"
            onClick={() => handleCuisineClick("indian")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/recipe-images/indian-food.jpg"
              alt="Indian Food"
            />
            <h3>Indian</h3>
          </div>

          {/* Italian -> Veg / Non-veg cards */}
          <div
            className="category-card"
            onClick={() => handleCuisineClick("italian")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/recipe-images/italian-food.jpg"
              alt="Italian Food"
            />
            <h3>Italian</h3>
          </div>

          {/* Drinks -> direct */}
          <div
            className="category-card"
            onClick={() => handleCategoryClick("drinks")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=compress&cs=tinysrgb&w=800"
              alt="Drinks"
            />
            <h3>Drinks</h3>
          </div>

          {/* Diet Food -> Veg / Non-veg cards */}
          <div
            className="category-card"
            onClick={() => handleCuisineClick("diet")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/recipe-images/diet-food.jpg"
              alt="Diet Food"
            />
            <h3>Diet Food</h3>
          </div>

          {/* Sweet Dish -> sweet options page */}
          <div
            className="category-card"
            onClick={() => handleCategoryClick("sweet")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/recipe-images/sweet.jpg"
              alt="Sweet Dish"
            />
            <h3>Sweet Dish</h3>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Got your own recipe idea? 👩‍🍳</h2>
        <p>Save it now and share your creativity with the world!</p>
        <Link to="/myrecipes" className="save-btn">
          Save a Recipe
        </Link>
      </section>
    </div>
  );
};

export default Home;
