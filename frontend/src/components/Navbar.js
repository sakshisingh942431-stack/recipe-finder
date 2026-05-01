import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSearch,
  FaHeart
} from "react-icons/fa";

import logo from "../assets/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchText, setSearchText] = useState("");

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
    const value = searchText.trim();

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
        <img src={logo} alt="logo" />
        <span>NutriNest</span>
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

            {open && (
              <div className="dropdown">

                <div className="drop-user-name">
                  {profileName}
                </div>

                <div
                  onClick={() => {
                    navigate(
                      "/profile"
                    );
                    setOpen(false);
                  }}
                >
                  👤 Profile
                </div>

                <div
                  onClick={() => {
                    navigate(
                      "/favorites"
                    );
                    setOpen(false);
                  }}
                >
                  <FaHeart />
                  Favorites
                </div>

                <div
                  onClick={() => {
                    navigate(
                      "/dashboard"
                    );
                    setOpen(false);
                  }}
                >
                  📊 Dashboard
                </div>

                {user?.role ===
                  "admin" && (
                  <div
                    onClick={() => {
                      navigate(
                        "/admin"
                      );
                      setOpen(false);
                    }}
                  >
                    ⚙ Admin Panel
                  </div>
                )}

                <div
                  className="logout"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </div>

              </div>
            )}

          </div>
        )}

        {/* MOBILE */}
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