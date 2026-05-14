import React, {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate,
  Routes,
  Route
} from "react-router-dom";

import axios from "axios";

import "./AdminDashboard.css";

import ManageCommunity from "./ManageCommunity";

const AdminDashboard = () => {

  const navigate =
    useNavigate();

  // 🔥 STATES

  const [stats, setStats] =
    useState({

      totalUsers: 0,

      totalRecipes: 0,

      totalLikes: 0,
    });

  const [trending,
    setTrending] =
    useState([]);

  // 🔥 FETCH

  useEffect(() => {

    fetchStats();

    fetchTrending();

  }, []);

  /* ======================================================
     🔥 FETCH STATS
  ====================================================== */

  const fetchStats =
    async () => {

      try {

        // ✅ OLD DASHBOARD STATS
        const statsRes =
          await axios.get(

            "http://localhost:5000/api/dashboard/stats"
          );

        // ✅ NEW TOTAL RECIPE COUNT
        const recipeRes =
          await axios.get(

            "http://localhost:5000/api/recipes/count/all"
          );

        setStats({

          ...statsRes.data,

          // ✅ OVERRIDE RECIPE COUNT
          totalRecipes:
            recipeRes.data
              .totalRecipes || 0,
        });

      } catch (err) {

        console.log(
          "STATS ERROR:",
          err
        );
      }
    };

  /* ======================================================
     🔥 FETCH TRENDING
  ====================================================== */

  const fetchTrending =
    async () => {

      try {

        const res =
          await axios.get(

            "http://localhost:5000/api/videos/trending"
          );

        setTrending(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  /* ======================================================
     🔥 LOGOUT
  ====================================================== */

  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      navigate("/login");
    };

  return (

    <div className="admin-panel">

      {/* 🔥 SIDEBAR */}

      <div className="admin-sidebar">

        <div className="admin-logo">

          <h2>
            NutriNest
          </h2>

          <p>
            Admin Panel
          </p>

        </div>

        <div className="admin-menu">

          <Link
            to="/admin"
            className="menu-item active"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/manage-users"
            className="menu-item"
          >
            Users
          </Link>

          <Link
            to="/admin/manage-recipes"
            className="menu-item"
          >
            Recipes
          </Link>

          <Link
            to="/admin-bmi"
            className="menu-item"
          >
            BMI Panel
          </Link>

          <Link
            to="/admin-water"
            className="menu-item"
          >
            Water Analytics
          </Link>

          <Link
            to="/admin/manage-comments"
            className="menu-item"
          >
            Comments
          </Link>

          <Link
            to="/admin/shorts"
            className="menu-item"
          >
            Shorts
          </Link>

          <Link
            to="/admin/likes"
            className="menu-item"
          >
            Likes
          </Link>

          <Link
            to="/admin/analytics"
            className="menu-item"
          >
            Analytics
          </Link>

          <Link
            to="/admin/notifications"
            className="menu-item"
          >
            Notifications
          </Link>

          <Link
            to="/admin/messages"
            className="menu-item"
          >
            Messages
          </Link>

          <Link
            to="/admin/community"
            className="menu-item"
          >
            Community
          </Link>

          <Link
            to="/admin/settings"
            className="menu-item"
          >
            Settings
          </Link>

        </div>

      </div>

      {/* 🔥 MAIN CONTENT */}

      <div className="admin-content">

        {/* 🔥 ROUTES */}

        <Routes>

          <Route
            path="/community"
            element={
              <ManageCommunity />
            }
          />

        </Routes>

        {/* 🔥 HEADER */}

        <div
          className="admin-topbar"

          style={{

            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",
          }}
        >

          <div>

            <h1>
              Dashboard Overview
            </h1>

            <p>
              Welcome Back,
              Admin 👋
            </p>

          </div>

          <div
            style={{

              display: "flex",

              gap: "10px",
            }}
          >

            <button

              onClick={() =>
                navigate("/")
              }

              style={{

                padding:
                  "8px 14px",

                borderRadius:
                  "6px",

                border:
                  "none",

                background:
                  "#4CAF50",

                color:
                  "white",

                cursor:
                  "pointer",
              }}
            >

              Home

            </button>

            <button

              onClick={
                handleLogout
              }

              style={{

                padding:
                  "8px 14px",

                borderRadius:
                  "6px",

                border:
                  "none",

                background:
                  "red",

                color:
                  "white",

                cursor:
                  "pointer",
              }}
            >

              Logout

            </button>

          </div>

        </div>

        {/* 🔥 STATS */}

        <div className="stats-grid">

          <div className="stat-card">

            <h2>
              {
                stats.totalUsers
              }
            </h2>

            <p>
              Total Users
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {
                stats.totalRecipes
              }
            </h2>

            <p>
              Total Recipes
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {
                stats.totalLikes
              }
            </h2>

            <p>
              Total Likes
            </p>

          </div>

          <div className="stat-card">

            <h2>
              15+
            </h2>

            <p>
              Premium Users
            </p>

          </div>

        </div>

        {/* 🔥 QUICK ACTIONS */}

        <div className="quick-actions">

          <h2>
            Quick Actions
          </h2>

          <div className="action-grid">

            <Link
              to="/admin/add-recipe"
              className="action-btn"
            >
              Add Recipe
            </Link>

            <Link
              to="/admin/manage-users"
              className="action-btn"
            >
              Manage Users
            </Link>

            <Link
              to="/admin/shorts"
              className="action-btn"
            >
              Manage Shorts
            </Link>

            <Link
              to="/admin/likes"
              className="action-btn"
            >
              Manage Likes
            </Link>

            <Link
              to="/admin-bmi"
              className="action-btn"
            >
              Open BMI Panel
            </Link>

            <Link
              to="/admin/community"
              className="action-btn"
            >
              Manage Community
            </Link>

          </div>

        </div>

        {/* 🔥 RECENT ACTIVITY */}

        <div className="recent-box">

          <h2>
            Recent Activity
          </h2>

          <ul>

            <li>
              {
                stats.totalUsers
              } users registered
            </li>

            <li>
              {
                stats.totalRecipes
              } recipes added
            </li>

            <li>
              {
                stats.totalLikes
              } total likes ❤️
            </li>

            <li>
              Trending videos
              updated 🔥
            </li>

            <li>
              BMI analytics
              updated 📊
            </li>

          </ul>

        </div>

        {/* 🔥 TRENDING */}

        <div className="recent-box">

          <h2>
            🔥 Trending Videos
          </h2>

          <ul>

            {trending.length ===
            0 ? (

              <li>
                No trending
                videos yet
              </li>

            ) : (

              trending.map(
                (v) => (

                  <li
                    key={v._id}
                  >

                    {v.title}
                    — ❤️
                    {v.likes}

                  </li>
                )
              )
            )}

          </ul>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;