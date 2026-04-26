import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaBell,
  FaStar,
  FaShareAlt,
  FaPlayCircle
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip
} from "recharts";

import PremiumSidebar from "./PremiumSidebar";
import "./premiumDashboard.css";

export default function PremiumDashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] =
    useState("User");

  const [liked, setLiked] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || []
    );

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (user?.name) {
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem(
      "user"
    );
    navigate("/login");
  };

  const handleLike = (id) => {
    let updated = [];

    if (liked.includes(id)) {
      updated =
        liked.filter(
          (item) =>
            item !== id
        );
    } else {
      updated = [
        ...liked,
        id
      ];
    }

    setLiked(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  const reportData = [
    {
      name: "Protein",
      value: 75
    },
    {
      name: "Carbs",
      value: 55
    },
    {
      name: "Fat",
      value: 65
    }
  ];

  const weekData = [
    { day: "Mon", v: 5 },
    { day: "Tue", v: 7 },
    { day: "Wed", v: 4 },
    { day: "Thu", v: 8 },
    { day: "Fri", v: 6 },
    { day: "Sat", v: 9 },
    { day: "Sun", v: 5 }
  ];

  const colors = [
    "#22c55e",
    "#f59e0b",
    "#3b82f6"
  ];

  const recipes = [
    {
      id: "111",
      name:
        "High Protein Bowl",
      cal: "320 Cal",
      time: "20 Min",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      ingredients: [
        "🍗 Chicken",
        "🍚 Rice",
        "🥦 Broccoli",
        "🥚 Egg"
      ]
    },
    {
      id: "222",
      name:
        "Weight Loss Salad",
      cal: "210 Cal",
      time: "10 Min",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      ingredients: [
        "🥬 Lettuce",
        "🍅 Tomato",
        "🥑 Avocado",
        "🫘 Beans"
      ]
    },
    {
      id: "333",
      name:
        "Fruit Smoothie",
      cal: "180 Cal",
      time: "5 Min",
      image:
        "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
      ingredients: [
        "🍌 Banana",
        "🥛 Milk",
        "🍯 Honey",
        "🥣 Oats"
      ]
    }
  ];

  return (
    <div className="dashboard-container">

      <PremiumSidebar
        onLogout={
          handleLogout
        }
      />
      

      <div className="main-content">

        {/* TOPBAR */}
        <div className="topbar">

          <input
            type="text"
            placeholder="Search healthy recipes..."
          />

          <div className="top-actions">

            <div className="icon-ball">
              <FaBell />
            </div>

            <div className="profile">
              👤 {userName}
            </div>

          </div>

        </div>

        {/* HERO */}
        <div className="hero-card">

          <div className="hero-left">
            <h1>
              Welcome to NutriNest
            </h1>

            <p>
              Discover healthy
              meals, track your
              fitness and stay
              consistent daily.
            </p>

            <button>
              Add Recipe
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

          <div className="card">
            🔥 Calories
            <h2>1800</h2>
          </div>

          <div className="card">
            💧 Water
            <h2>4 / 8</h2>
          </div>

          <div className="card">
            ⚖ BMI
            <h2>22.4</h2>
          </div>

          <div className="card">
            ❤️ Favorites
            <h2>
              {
                liked.length
              }
            </h2>
          </div>

        </div>

        {/* CHARTS */}
        <div className="chart-grid">

          <div className="chart-card">
            <h3>
              Weekly Report
            </h3>

            <ResponsiveContainer
              width="100%"
              height={220}
            >
              <BarChart
                data={
                  weekData
                }
              >
                <XAxis
                  dataKey="day"
                />
                <Tooltip />
                <Bar dataKey="v" />
              </BarChart>
            </ResponsiveContainer>

          </div>
<div className="chart-card">

  <h3>Nutrition Goal</h3>

  <ResponsiveContainer
    width="100%"
    height={220}
  >
    <PieChart>

      <Pie
        data={reportData}
        dataKey="value"
        nameKey="name"
        outerRadius={80}
        label={({ name, value }) =>
          `${name} ${value}g`
        }
      >
        {reportData.map((entry, index) => (
          <Cell
            key={index}
            fill={colors[index]}
          />
        ))}
      </Pie>

    </PieChart>
  </ResponsiveContainer>

  <div className="chart-legend">

    <span>
      <i className="dot green"></i>
      Protein
    </span>

    <span>
      <i className="dot orange"></i>
      Carbs
    </span>

    <span>
      <i className="dot blue"></i>
      Fat
    </span>

  </div>

</div>
      
<div className="chart-legend">

    <span>
      <i className="dot green"></i>
      Protein
    </span>

    <span>
      <i className="dot orange"></i>
      Carbs
    </span>

    <span>
      <i className="dot blue"></i>
      Fat
    </span>

          </div>

        </div>

        {/* RECIPE CARDS */}
        <div className="smart-recipes">

          {recipes.map(
            (item) => (
              <div
                className="smart-card"
                key={item.id}
              >
                <div
                  className="heart-icon"
                  onClick={() =>
                    handleLike(
                      item.id
                    )
                  }
                >
                  <FaHeart
                    color={
                      liked.includes(
                        item.id
                      )
                        ? "red"
                        : "#cbd5e1"
                    }
                  />
                </div>

                <div className="top-row">

                  <img
                    src={
                      item.image
                    }
                    alt=""
                  />

                  <div>
                    <h3>
                      {
                        item.name
                      }
                    </h3>
                    <p>
                      {
                        item.cal
                      }
                    </p>
                  </div>

                </div>

                <h4>
                  Ingredients
                </h4>

                <div className="ingredient-grid">

                  {item.ingredients.map(
                    (
                      ing,
                      i
                    ) => (
                      <span
                        key={
                          i
                        }
                      >
                        {ing}
                      </span>
                    )
                  )}

                </div>

                <div className="social-row">

                  <span>
                    ⏱️{" "}
                    {
                      item.time
                    }
                  </span>

                  <div className="btn-group">

                    <button
                      onClick={() =>
                        navigate(
                          `/recipes/${item.id}`
                        )
                      }
                    >
                      View Recipe
                    </button>

                    <button className="tutorial-btn">
                      <FaPlayCircle />
                    </button>

                    <button>
                      <FaStar />
                    </button>

                    <button>
                      <FaShareAlt />
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}