import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // चाहो तो /admin-login कर सकते हो
  };

  return (
    <div className="admin-panel">

      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>NutriNest</h2>
          <p>Admin Panel</p>
        </div>

        <div className="admin-menu">
          <Link to="/admin" className="menu-item active">Dashboard</Link>
          <Link to="/admin/manage-users" className="menu-item">Users</Link>
          <Link to="/admin/manage-recipes" className="menu-item">Recipes</Link>
          <Link to="/admin/manage-comments" className="menu-item">Comments</Link>
          <Link to="/admin/shorts" className="menu-item">Shorts</Link>
          <Link to="/admin/analytics" className="menu-item">Analytics</Link>
          <Link to="/admin/notifications" className="menu-item">Notifications</Link>
          <Link to="/admin/messages" className="menu-item">Messages</Link>
          <Link to="/admin/settings" className="menu-item">Settings</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">

        {/* Header */}
        <div className="admin-topbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome Back, Admin 👋</p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={() => navigate("/")}
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                background: "#4CAF50",
                color: "white",
                cursor: "pointer"
              }}
            >
              Home
            </button>

            <button 
              onClick={handleLogout}
              style={{
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                background: "red",
                color: "white",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </div>

        </div>

        {/* Stats Cards */}
        <div className="stats-grid">

          <div className="stat-card">
            <h2>120+</h2>
            <p>Total Users</p>
          </div>

          <div className="stat-card">
            <h2>85+</h2>
            <p>Total Recipes</p>
          </div>

          <div className="stat-card">
            <h2>45+</h2>
            <p>Total Comments</p>
          </div>

          <div className="stat-card">
            <h2>15+</h2>
            <p>Premium Users</p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>

          <div className="action-grid">

            <Link to="/admin/add-recipe" className="action-btn">
              Add Recipe
            </Link>

            <Link to="/admin/manage-users" className="action-btn">
              Manage Users
            </Link>

            <Link to="/admin/manage-comments" className="action-btn">
              Review Comments
            </Link>

            <Link to="/admin/messages" className="action-btn">
              Contact Messages
            </Link>

          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-box">
          <h2>Recent Activity</h2>
          <ul>
            <li>New user registered</li>
            <li>Recipe added successfully</li>
            <li>Comment reported by user</li>
            <li>2 premium users joined</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;