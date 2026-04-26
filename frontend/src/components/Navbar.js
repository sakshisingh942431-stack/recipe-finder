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

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="logo-box" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
        <span>NutriNest</span>
      </div>

      {/* CENTER */}
      <div className={mobile ? "nav-links active" : "nav-links"}>
        <Link to="/">Home</Link>
        <Link to="/search">Recipes</Link>
        <Link to="/shorts">Shorts</Link>
        <Link to="/community">Community</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <FaSearch />
        <input type="text" placeholder="Search..." />
      </div>

      {/* RIGHT */}
      <div className="right-box">

        {!user ? (
          <div className="auth-btns">
            <Link to="/login">Login</Link>
            <Link to="/signup" className="signup-btn">
              Signup
            </Link>
          </div>
        ) : (
          <div className="profile-area">

            <div
              className="profile-icon"
              onClick={() => setOpen(!open)}
            >
              <FaUserCircle />
            </div>

            {open && (
              <div className="dropdown">

                <div onClick={() => navigate("/profile")}>
                  👤 Profile
                </div>

                <div onClick={() => navigate("/favorites")}>
                  <FaHeart /> Favorites
                </div>

                <div onClick={() => navigate("/dashboard")}>
                  📊 Dashboard
                </div>

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

        {/* MOBILE ICON */}
        <div
          className="menu-toggle"
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? <FaTimes /> : <FaBars />}
        </div>

      </div>

    </nav>
  );
}