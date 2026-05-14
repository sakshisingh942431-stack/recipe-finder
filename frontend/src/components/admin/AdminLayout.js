import React from "react";

import {
  Link,
  useLocation
}
from "react-router-dom";

import "./adminLayout.css";

const AdminLayout = ({
  children
}) => {

  const location =
    useLocation();

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}

      <div className="admin-sidebar">

        <h2>
          NutriNest
        </h2>

        <Link
          to="/admin"
          className={
            location.pathname === "/admin"
              ? "active"
              : ""
          }
        >
          Dashboard
        </Link>

        <Link
          to="/admin-bmi"
          className={
            location.pathname === "/admin-bmi"
              ? "active"
              : ""
          }
        >
          BMI Panel
        </Link>

        <Link
          to="/admin/manage-recipes"
        >
          Recipes
        </Link>

        <Link
          to="/admin/manage-users"
        >
          Users
        </Link>

        <Link
          to="/admin/messages"
        >
          Messages
        </Link>

        <Link
          to="/admin/analytics"
        >
          Analytics
        </Link>

      </div>

      {/* CONTENT */}

      <div className="admin-content">

        {children}

      </div>

    </div>
  );
};

export default AdminLayout;