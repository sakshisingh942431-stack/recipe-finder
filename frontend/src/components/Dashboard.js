import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaBell,
  FaShareAlt,
  FaPlayCircle,
  FaLock
} from "react-icons/fa";

import FreeSidebar from "./FreeSidebar";
import "./Dashboard.css";

// 🔥 NEW: import messages component
import UserMessages from "./UserMessages";

export default function FreeDashboard() {

  const navigate = useNavigate();

  const [userName, setUserName] = useState("User");

  const [liked, setLiked] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {

    const profile = JSON.parse(localStorage.getItem("profileData"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (profile?.name) setUserName(profile.name);
    else if (user?.name) setUserName(user.name);

  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleLike = (id) => {

    let updated = liked.includes(id)
      ? liked.filter((item) => item !== id)
      : [...liked, id];

    setLiked(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const recipes = [
    {
      id: "111",
      name: "High Protein Bowl",
      cal: "320 Cal",
      time: "20 Min",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      ingredients: ["🍗 Chicken", "🍚 Rice", "🥦 Broccoli", "🥚 Egg"]
    },
    {
      id: "222",
      name: "Weight Loss Salad",
      cal: "210 Cal",
      time: "10 Min",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      ingredients: ["🥬 Lettuce", "🍅 Tomato", "🥑 Avocado", "🫘 Beans"]
    },
    {
      id: "333",
      name: "Fruit Smoothie",
      cal: "180 Cal",
      time: "5 Min",
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
      ingredients: ["🍌 Banana", "🥛 Milk", "🍯 Honey", "🥣 Oats"]
    }
  ];

  return (
    <div className="dashboard-container">

      <FreeSidebar onLogout={handleLogout} />

      <div className="main-content">

        {/* TOPBAR */}
        <div className="topbar">
          <input type="text" placeholder="Search healthy recipes..." />

          <div className="top-actions">
            <div className="icon-ball"><FaBell /></div>
            <div className="profile">👤 {userName}</div>
          </div>
        </div>

        {/* HERO */}
        <div className="hero-card">
          <div className="hero-left">
            <h1>Welcome to NutriNest</h1>
            <p>
              Basic features unlocked. Upgrade to access full dashboard.
            </p>

            <button onClick={() => navigate("/premium-upgrade")}>
              Upgrade to Premium
            </button>
          </div>

          <div className="hero-right">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
              alt="food"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="card">🔥 Calories <h2>0</h2></div>
          <div className="card">💧 Water <h2>0</h2></div>
          <div className="card">⚖ BMI <h2>0</h2></div>
          <div className="card">❤️ Favorites <h2>{liked.length}</h2></div>
        </div>

        {/* LOCKED FEATURES */}
        <div className="chart-grid">
          <div className="chart-card locked">
            <h3>Weekly Report <FaLock /></h3>
          </div>

          <div className="chart-card locked">
            <h3>Nutrition Goal <FaLock /></h3>
          </div>
        </div>

        {/* UPGRADE */}
        <div className="upgrade-box">
          <h2>✨ Go Premium</h2>
          <p>Unlock charts, analytics & full dashboard</p>

          <button onClick={() => navigate("/premium-upgrade")}>
            Upgrade Now
          </button>
        </div>

        {/* RECIPES */}
        <div className="smart-recipes">

          {recipes.map((item) => (

            <div className="smart-card" key={item.id}>

              <div
                className="heart-icon"
                onClick={() => handleLike(item.id)}
              >
                <FaHeart
                  color={liked.includes(item.id) ? "red" : "#cbd5e1"}
                />
              </div>

              <div className="top-row">

                <img src={item.image} alt="" />

                <div>
                  <h3>{item.name}</h3>
                  <p>{item.cal}</p>
                </div>

              </div>

              <h4>Ingredients</h4>

              <div className="ingredient-grid">
                {item.ingredients.map((ing, i) => (
                  <span key={i}>{ing}</span>
                ))}
              </div>

              <div className="social-row">

                <span>⏱️ {item.time}</span>

                <div className="btn-group">

                  <button onClick={() => navigate(`/recipes/${item.id}`)}>
                    View Recipe
                  </button>

                  <button className="tutorial-btn">
                    <FaPlayCircle />
                  </button>

                  <button><FaShareAlt /></button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* 🔥 NEW SECTION: USER MESSAGES */}
        <UserMessages />

      </div>
    </div>
  );
}