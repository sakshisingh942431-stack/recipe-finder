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
  FaVideo,
  FaLock
} from "react-icons/fa";

export default function FreeSidebar({ onLogout }) {

  const navigate = useNavigate();

  // 🔒 Lock control
  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard", locked: true },
    { name: "Recipes", icon: <FaUtensils />, path: "/recipes", locked: false },
    { name: "Favorites", icon: <FaHeart />, path: "/favorites", locked: false },
    { name: "Shorts", icon: <FaPlayCircle />, path: "/shorts", locked: true },
    { name: "Community", icon: <FaUsers />, path: "/community", locked: true },
    { name: "BMI Tracker", icon: <FaChartBar />, path: "/bmi", locked: true },
    { name: "Water Intake", icon: <FaTint />, path: "/water", locked: true },
    { name: "Settings", icon: <FaCog />, path: "/settings", locked: true }
  ];

  const handleClick = (item) => {
    if (item.locked) {
      navigate("/premium-upgrade");
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="sidebar">

      <h2 className="logo">NutriNest</h2>

      <ul className="menu">

        {menu.map((item, i) => (
          <li
            key={i}
            className={i === 0 ? "active" : ""}
            onClick={() => handleClick(item)}
          >
            {item.icon}
            <span>{item.name}</span>

            {/* 🔒 lock icon */}
            {item.locked && <FaLock className="lock-icon" />}
          </li>
        ))}

        <li className="logout-item" onClick={onLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </li>

      </ul>

      {/* SAME Upload Card (locked for free users) */}
      <div className="upload-card locked-card" onClick={() => navigate("/premium-upgrade")}>

        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
          alt="Healthy Food"
        />

        <h4>Share Your Recipe 🔒</h4>

        <p>Upgrade to upload recipes.</p>

        <button>
          <FaCloudUploadAlt />
          <span>Locked</span>
        </button>

      </div>

      {/* SAME Shorts Card (locked) */}
      <div className="short-video-card locked-card" onClick={() => navigate("/premium-upgrade")}>

        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500"
          alt="Short Video"
        />

        <h4>Upload Short Video 🔒</h4>

        <p>Premium feature only.</p>

        <button>
          <FaVideo />
          <span>Locked</span>
        </button>

      </div>

    </div>
  );
}