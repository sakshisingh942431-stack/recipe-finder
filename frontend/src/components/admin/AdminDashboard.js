import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <h2>Admin Dashboard</h2>

      <div className="admin-nav">
        <Link to="/admin/manage-recipes" className="admin-btn">
          Manage Recipes
        </Link>

        <Link to="/admin/manage-users" className="admin-btn">
          Manage Users
        </Link>

        <Link to="/admin/manage-comments" className="admin-btn">
          Manage Comments
        </Link>
        <Link to="/admin/add-recipe" className="admin-btn">
  Add Recipe
</Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
