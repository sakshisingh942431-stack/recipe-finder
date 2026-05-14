import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart,
  FaUser,
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {

  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const [mobile, setMobile] =
    useState(false);

  const [searchText, setSearchText] =
    useState("");

  const savedProfile = JSON.parse(
    localStorage.getItem("profileData")
  );

  const profileName =
    savedProfile?.name ||
    user?.name ||
    "User";

  const profileImage =
    savedProfile?.image || "";

  const handleLogout = () => {

    logout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");

    setOpen(false);

    navigate("/");
  };

  const closeMobile = () => {
    setMobile(false);
    setOpen(false);
  };

  const handleSearch = () => {

    const value =
      searchText.trim();

    if (!value) return;

    navigate(
      `/search?q=${encodeURIComponent(value)}`
    );

    setSearchText("");
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (

    <nav className="navbar">

      {/* LEFT */}
      <div
        className="logo-box"
        onClick={() => navigate("/")}
      >

        <img
          src={logo}
          alt="logo"
        />

        <span>
          NutriNest
        </span>

      </div>

      {/* CENTER */}
      <div
        className={
          mobile
            ? "nav-links active"
            : "nav-links"
        }
      >

        <Link
          to="/"
          onClick={closeMobile}
        >
          Home
        </Link>

        <Link
          to="/search"
          onClick={closeMobile}
        >
          Recipes
        </Link>

        <Link
          to="/contact"
          onClick={closeMobile}
        >
          Contact
        </Link>

        {user && (
          <Link
            to="/dashboard"
            onClick={closeMobile}
          >
            Dashboard
          </Link>
        )}

      </div>

      {/* SEARCH */}
      <div className="search-box">

        <FaSearch
          style={{
            cursor: "pointer"
          }}
          onClick={handleSearch}
        />

        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) =>
            setSearchText(
              e.target.value
            )
          }
          onKeyDown={handleKeyDown}
        />

      </div>

      {/* RIGHT */}
      <div className="right-box">

        {!user ? (

          <div className="auth-btns">

            <Link to="/login">
              Login
            </Link>

            <Link
              to="/signup"
              className="signup-btn"
            >
              Signup
            </Link>

          </div>

        ) : (

          <div className="profile-area">

            {/* PROFILE ICON */}
            <div
              className="profile-icon"
              onClick={() =>
                setOpen(!open)
              }
            >

              {profileImage ? (

                <img
                  src={profileImage}
                  alt="profile"
                  className="nav-user-img"
                />

              ) : (

                <FaUserCircle />

              )}

            </div>

            {/* DROPDOWN */}
            {open && (

              <div className="dropdown">

                {/* USER NAME */}
                <div className="drop-user-name">
                  {profileName}
                </div>

                {/* PROFILE */}
                <div
                  className="dropdown-item"
                  onClick={() => {

                    navigate("/profile");

                    setOpen(false);
                  }}
                >

                  <FaUser />

                  <span>
                    Profile
                  </span>

                </div>

                {/* FAVORITES */}
                <div
                  className="dropdown-item"
                  onClick={() => {

                    navigate("/favorites");

                    setOpen(false);
                  }}
                >

                  <FaHeart />

                  <span>
                    Favorites
                  </span>

                </div>

                {/* DASHBOARD */}
                <div
                  className="dropdown-item"
                  onClick={() => {

                    navigate("/dashboard");

                    setOpen(false);
                  }}
                >

                  <FaChartBar />

                  <span>
                    Dashboard
                  </span>

                </div>

                {/* ADMIN */}
                {user?.role === "admin" && (

                  <div
                    className="dropdown-item"
                    onClick={() => {

                      navigate("/admin");

                      setOpen(false);
                    }}
                  >

                    <FaCog />

                    <span>
                      Admin Panel
                    </span>

                  </div>

                )}

                {/* LOGOUT */}
                <div
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >

                  <FaSignOutAlt />

                  <span>
                    Logout
                  </span>

                </div>

              </div>

            )}

          </div>

        )}

        {/* MOBILE MENU */}
        <div
          className="menu-toggle"
          onClick={() =>
            setMobile(!mobile)
          }
        >

          {mobile ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}

        </div>

      </div>

    </nav>
  );
}