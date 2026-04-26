import React from "react";
import {
  FaHome,
  FaUtensils,
  FaHeart,
  FaPlayCircle,
  FaUsers,
  FaChartBar,
  FaTint,
  FaCog,
  FaSignOutAlt,
  FaCloudUploadAlt,
  FaVideo
} from "react-icons/fa";

export default function PremiumSidebar({
  onLogout
}) {
  return (
    <div className="sidebar">

      <h2 className="logo">
        NutriNest
      </h2>

      <ul className="menu">

        <li className="active">
          <FaHome />
          <span>Dashboard</span>
        </li>

        <li>
          <FaUtensils />
          <span>Recipes</span>
        </li>

        <li>
          <FaHeart />
          <span>Favorites</span>
        </li>

        <li>
          <FaPlayCircle />
          <span>Shorts</span>
        </li>

        <li>
          <FaUsers />
          <span>Community</span>
        </li>

        <li>
          <FaChartBar />
          <span>BMI Tracker</span>
        </li>

        <li>
          <FaTint />
          <span>Water Intake</span>
        </li>

        <li>
          <FaCog />
          <span>Settings</span>
        </li>

        <li
          className="logout-item"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </li>

      </ul>

      {/* Recipe Upload Card */}

      <div className="upload-card">

        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
          alt="Healthy Food"
        />

        <h4>
          Share Your Recipe
        </h4>

        <p>
          Upload recipe and
          inspire users.
        </p>

        <button>
          <FaCloudUploadAlt />
          <span>Upload Now</span>
        </button>

      </div>

      {/* Shorts Upload Card */}

      <div className="short-video-card">

        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500"
          alt="Short Video"
        />

        <h4>
          Upload Short Video
        </h4>

        <p>
          Share quick healthy
          recipe reels.
        </p>

        <button>
          <FaVideo />
          <span>Upload Reel</span>
        </button>

      </div>

    </div>
  );
}