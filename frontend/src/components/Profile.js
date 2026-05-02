/* Profile.js */

import React, {
  useContext,
  useState,
  useEffect
} from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

// 🔥 NEW: import messages component
import UserMessages from "./UserMessages";

export default function ProfilePage() {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [profileImage, setProfileImage] =
    useState(
      "https://i.pravatar.cc/150?img=32"
    );

  useEffect(() => {

    const savedProfile =
      JSON.parse(
        localStorage.getItem(
          "profileData"
        )
      );

    if (savedProfile) {

      setName(
        savedProfile.name
      );

      setEmail(
        savedProfile.email
      );

      setProfileImage(
        savedProfile.image ||
        "https://i.pravatar.cc/150?img=32"
      );

    } else {

      setName(
        user?.name ||
        "NutriNest User"
      );

      setEmail(
        user?.email ||
        "user@nutrinest.com"
      );
    }

  }, [user]);

  const handleSave = () => {

    if (
      name.trim().length < 3
    ) {
      alert(
        "Name must be at least 3 letters"
      );
      return;
    }

    if (
      !/^[A-Za-z ]+$/.test(name)
    ) {
      alert(
        "Only letters allowed"
      );
      return;
    }

    localStorage.setItem(
      "profileData",
      JSON.stringify({
        name,
        email,
        image: profileImage
      })
    );

    window.dispatchEvent(
      new Event("storage")
    );

    alert(
      "Profile Updated Successfully ✅"
    );

    setShowModal(false);

    window.location.reload();
  };

  return (

    <div className="profile-page">

      {/* HERO */}
      <div className="hero-card">

        <div className="hero-left">

          <img
            src={profileImage}
            alt="profile"
            className="profile-img"
          />

          <div className="user-info">
            <h2>{name}</h2>
            <p>{email}</p>
          </div>

        </div>

        <div className="hero-right">

          <div
            className="tagline"
            onClick={() =>
              navigate(
                "/search?category=Healthy"
              )
            }
          >
            Healthy Food Explorer
          </div>

          <button
            className="edit-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            Edit Profile
          </button>

          <span
            className="badge"
            onClick={() =>
              navigate(
                "/premium-upgrade"
              )
            }
          >
            Upgrade
          </span>

        </div>

      </div>

      {/* Stats Row */}
      <div className="stats-row">

        <div className="stat-card">
          <h3>4</h3>
          <p>Saved Recipes ❤️</p>
        </div>

        <div className="stat-card">
          <h3>18</h3>
          <p>Recipes Tried 🍽️</p>
        </div>

        <div className="stat-card">
          <h3>1450</h3>
          <p>Calories Tracked 🔥</p>
        </div>

        <div className="stat-card">
          <h3>320</h3>
          <p>Followers 👥</p>
        </div>

      </div>

      {/* Saved Recipes */}
      <section>

        <h2 className="section-title">
          Saved Recipes
        </h2>

        <div className="recipe-grid">

          <div className="recipe-card">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500"
              alt=""
            />
            <h4>Oats Bowl</h4>
          </div>

          <div className="recipe-card">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
              alt=""
            />
            <h4>Paneer Salad</h4>
          </div>

          <div className="recipe-card">
            <img
              src="https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500"
              alt=""
            />
            <h4>Smoothie</h4>
          </div>

          <div className="recipe-card">
            <img
              src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500"
              alt=""
            />
            <h4>Protein Sandwich</h4>
          </div>

        </div>

      </section>

      {/* Preferences */}
      <section>

        <h2 className="section-title">
          Dietary Preferences
        </h2>

        <div className="chips">
          <span>Vegetarian</span>
          <span>High Protein</span>
          <span>Low Carb</span>
          <span>Gluten Free</span>
        </div>

      </section>

      {/* Health Tracker */}
      <section>

        <h2 className="section-title">
          Health Tracker
        </h2>

        <div className="tracker-grid">

          <div className="tracker-card">
            Daily Calories: 1800
          </div>

          <div className="tracker-card">
            Water Intake: 2.5L
          </div>

          <div className="tracker-card">
            BMI: 22.1
          </div>

          <div className="tracker-card">
            Goal Progress: 78%
          </div>

        </div>

      </section>

      {/* Recent Activity */}
      <section>

        <h2 className="section-title">
          Recent Activity
        </h2>

        <div className="activity-box">
          <p>✅ Saved Avocado Toast</p>
          <p>👀 Viewed Weight Loss Smoothie</p>
          <p>⭐ Rated 5⭐ Salad Bowl</p>
        </div>

      </section>

      {/* 🔥 USER MESSAGES */}
      <section>
        <UserMessages />
      </section>

      {/* MODAL */}
      {showModal && (

        <div className="modal-overlay">

          <div className="edit-modal">

            <h2>Edit Profile</h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file =
                  e.target.files[0];

                if (file) {

                  const reader =
                    new FileReader();

                  reader.onloadend =
                    () => {
                      setProfileImage(
                        reader.result
                      );
                    };

                  reader.readAsDataURL(
                    file
                  );
                }

              }}
            />

            <input
              type="text"
              value={name}
              placeholder="Enter Name"
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <div className="modal-btns">

              <button
                className="save-btn"
                onClick={handleSave}
              >
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}