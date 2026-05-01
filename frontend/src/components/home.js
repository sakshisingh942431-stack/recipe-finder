// frontend/src/components/home.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaTint,
  FaUsers,
  FaPlayCircle,
  FaHeart,
  FaUtensils,
  FaStar,
  FaChartLine,
  FaLeaf
} from "react-icons/fa";

import "./home.css";
import logo from "../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  const handleCuisineClick = (category) => {
    navigate(
      `/search?category=${encodeURIComponent(category)}`
    );
  };

  const handleDashboardClick = () => {
    const token =
      localStorage.getItem("token");

    const adminToken =
      localStorage.getItem(
        "adminToken"
      );

    if (token || adminToken) {
      navigate("/dashboard");
    } else {
      alert(
        "Please login first"
      );
      navigate("/login");
    }
  };

  const features = [
    {
      icon: <FaUtensils />,
      title:
        "Healthy Recipes",
    },
    {
      icon: <FaHeartbeat />,
      title:
        "BMI Tracker",
    },
    {
      icon: <FaTint />,
      title:
        "Water Intake",
    },
    {
      icon: <FaPlayCircle />,
      title:
        "Short Videos",
    },
    {
      icon: <FaUsers />,
      title:
        "Community",
    },
    {
      icon: <FaHeart />,
      title:
        "Favorites",
    },
  ];

  const categories = [
    {
      name: "Indian",
      img: "/recipe-images/indian-food.jpg",
    },
    {
      name: "Italian",
      img: "/recipe-images/italian-food.jpg",
    },
    {
      name: "Drinks",
      img:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Diet",
      img: "/recipe-images/diet-food.jpg",
    },
    {
      name: "Sweet",
      img: "/recipe-images/sweet.jpg",
    },
  ];

  return (
    <div className="home-container">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* HERO */}
      <section className="hero">

        <div className="home-hero-left">

          <span className="home-tagline">
            <FaLeaf />
            Healthy Living Platform
          </span>

          <h1>
            Eat Smart With
            <span>
              NutriNest
            </span>

            <img
              src={logo}
              alt="logo"
              className="hero-logo"
            />
          </h1>

          <p>
            Discover healthy recipes,
            track calories,
            watch short videos
            and build better habits
            every day.
          </p>

          <div className="hero-btns">

            <Link
              to="/search"
              className="primary-btn"
            >
              Explore Recipes
            </Link>

            <button
              onClick={
                handleDashboardClick
              }
              className="secondary-btn"
            >
              Open Dashboard
            </button>

          </div>

          <div className="hero-stats">

            <div>
              <h3>1200+</h3>
              <p>Recipes</p>
            </div>

            <div>
              <h3>800+</h3>
              <p>Users</p>
            </div>

            <div>
              <h3>300+</h3>
              <p>Videos</p>
            </div>

          </div>

          <div className="mini-recipes">
            <div className="mini-recipe-card">
              🥗 Weight Loss Meals
            </div>

            <div className="mini-recipe-card">
              🍳 Quick Breakfast
            </div>
          </div>

        </div>

        <div className="home-hero-right">

          <div className="hero-image-card">

            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
              alt="Healthy Food"
            />

            <div className="mini-card one">
              <FaChartLine />
              <span>
                Calories
              </span>
            </div>

            <div className="mini-card two">
              <FaStar />
              <span>
                Top Rated
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <h2>
          Why Choose NutriNest?
        </h2>

        <div className="feature-grid">

          {features.map(
            (
              item,
              index
            ) => (
              <div
                className="feature-card"
                key={index}
              >
                <div className="feature-icon">
                  {item.icon}
                </div>

                <h3>
                  {item.title}
                </h3>
              </div>
            )
          )}

        </div>

      </section>

      {/* CATEGORY */}
      <section className="categories">

        <h2>
          Popular Categories
        </h2>

        <div className="category-grid">

          {categories.map(
            (
              item,
              index
            ) => (
              <div
                className="category-card"
                key={index}
                onClick={() =>
                  handleCuisineClick(
                    item.name
                  )
                }
              >
                <img
                  src={item.img}
                  alt=""
                />

                <h3>
                  {item.name}
                </h3>
              </div>
            )
          )}

        </div>

      </section>

      {/* CTA */}
      <section className="cta">

        <div className="cta-box">

          <h2>
            Build Better Food Habits
          </h2>

          <p>
            Join NutriNest and
            turn your daily meals
            into a healthier
            lifestyle.
          </p>

          <Link
            to="/signup"
            className="primary-btn"
          >
            Join Free Today
          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h3>NutriNest</h3>
        <p>
          Eat Better • Live Better
        </p>
      </footer>

    </div>
  );
};

export default Home;