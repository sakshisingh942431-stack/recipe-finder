import React from "react";
import { useNavigate } from "react-router-dom";
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
import { FaEnvelope } from "react-icons/fa";

export default function PremiumSidebar({
  onLogout,
  onOpenShortUpload
}) {
  const navigate = useNavigate();

  return (
    <div className="sidebar">

      <h2 className="logo">NutriNest</h2>

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
<li onClick={() => navigate("/premium/shorts")}>
  <FaPlayCircle />
  <span>Shorts</span>
</li>
       

        <li>
          <FaUsers />
          <span>Community</span>
        </li>
<li onClick={() => navigate("/premium/messages")}>
  <FaEnvelope />
  <span>Messages</span>
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

        <li className="logout-item" onClick={onLogout}>
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

        <h4>Share Your Recipe</h4>

        <p>Upload recipe and inspire users.</p>

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

        <h4>Upload Short Video</h4>

        <p>Share quick healthy recipe reels.</p>

        {/* 🔥 FIXED BUTTON (safe handling) */}
        <button
          onClick={() => {
            console.log("Upload Reel clicked"); // debug
            if (onOpenShortUpload) {
              onOpenShortUpload();
            } else {
              console.log("❌ onOpenShortUpload not passed");
            }
          }}
        >
          <FaVideo />
          <span>Upload Reel</span>
        </button>

      </div>

    </div>
  );
}