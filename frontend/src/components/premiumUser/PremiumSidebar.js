import React from "react";

import { useNavigate, useLocation } from "react-router-dom";

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
  FaEnvelope
} from "react-icons/fa";

export default function PremiumSidebar({
  onLogout,
  onOpenShortUpload
}) {

  const navigate = useNavigate();

  const location = useLocation();

  // =========================
  // MENU ITEMS
  // =========================

  const menuItems = [

    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/premium-dashboard"
    },

    {
      name: "Recipes",
      icon: <FaUtensils />,
      path: "/recipes"
    },

    {
      name: "Favorites",
      icon: <FaHeart />,
      path: "/favorites"
    },

    {
      name: "Shorts",
      icon: <FaPlayCircle />,
      path: "/premium/shorts"
    },

    {
      name: "Community",
      icon: <FaUsers />,
      path: "/premium/community"
    },

    {
      name: "Messages",
      icon: <FaEnvelope />,
      path: "/premium/messages"
    },

    {
      name: "BMI Tracker",
      icon: <FaChartBar />,
      path: "/premium/bmi"
    },

    {
      name: "Water Intake",
      icon: <FaTint />,
      path: "/premium/water"
    },

    {
      name: "Settings",
      icon: <FaCog />,
      path: "/premium/settings"
    }
  ];

  return (

    <div className="sidebar">

      {/* LOGO */}

      <h2
        className="logo"
        onClick={() =>
          navigate("/premium-dashboard")
        }
      >
        NutriNest
      </h2>

      {/* MENU */}

      <ul className="menu">

        {menuItems.map((item, index) => (

          <li

            key={index}

            className={
              location.pathname === item.path
                ? "active"
                : ""
            }

            onClick={() =>
              navigate(item.path)
            }
          >

            {item.icon}

            <span>
              {item.name}
            </span>

          </li>
        ))}

        {/* LOGOUT */}

        <li
          className="logout-item"

          onClick={onLogout}
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </li>

      </ul>

      {/* ========================= */}
      {/* RECIPE UPLOAD CARD */}
      {/* ========================= */}

      <div className="upload-card">

        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
          alt="Healthy Food"
        />

        <h4>
          Share Your Recipe
        </h4>

        <p>
          Upload recipe and inspire users.
        </p>

        <button
          onClick={() =>
            navigate("/upload-recipe")
          }
        >

          <FaCloudUploadAlt />

          <span>
            Upload Now
          </span>

        </button>

      </div>

      {/* ========================= */}
      {/* SHORT VIDEO CARD */}
      {/* ========================= */}

      <div className="short-video-card">

        <img
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500"
          alt="Short Video"
        />

        <h4>
          Upload Short Video
        </h4>

        <p>
          Share quick healthy recipe reels.
        </p>

        <button

          onClick={() => {

            if (onOpenShortUpload) {

              onOpenShortUpload();

            } else {

              navigate("/premium/shorts");
            }
          }}
        >

          <FaVideo />

          <span>
            Upload Reel
          </span>

        </button>

      </div>

    </div>
  );
}