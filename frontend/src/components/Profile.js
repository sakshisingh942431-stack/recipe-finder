import React from "react";
import "./Profile.css";

export default function ProfilePage() {
  const savedRecipes = [
    {
      name: "Oats Bowl",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
    },
    {
      name: "Paneer Salad",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
    },
    {
      name: "Smoothie",
      image:
               "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
      
    },
    {
      name: "Protein Sandwich",
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
    },
  ];

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <div className="hero-card">
        <img
          src="https://i.pravatar.cc/150?img=32"
          alt="profile"
          className="profile-img"
        />

        <h2>Sakshi Singh</h2>
        <p className="tagline">Healthy Food Explorer</p>

        <div className="hero-actions">
          <button>Edit Profile</button>
          <span className="badge">Premium</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>24</h3>
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
        <h2 className="section-title">Saved Recipes</h2>

        <div className="recipe-grid">
          {savedRecipes.map((item, index) => (
            <div className="recipe-card" key={index}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <button>Quick Open</button>
            </div>
          ))}
        </div>
      </section>

      {/* Preferences */}
      <section>
        <h2 className="section-title">Dietary Preferences</h2>

        <div className="chips">
          <span>Vegetarian</span>
          <span>High Protein</span>
          <span>Low Carb</span>
          <span>Gluten Free</span>
        </div>
      </section>

      {/* Health Tracker */}
      <section>
        <h2 className="section-title">Health Tracker</h2>

        <div className="tracker-grid">
          <div className="tracker-card">Daily Calories: 1800</div>
          <div className="tracker-card">Water Intake: 2.5L</div>
          <div className="tracker-card">BMI: 22.1</div>
          <div className="tracker-card">Goal Progress: 78%</div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="section-title">Recent Activity</h2>

        <div className="activity-box">
          <p>✅ Saved "Avocado Toast"</p>
          <p>👀 Viewed "Weight Loss Smoothie"</p>
          <p>⭐ Rated 5⭐ Salad Bowl</p>
        </div>
      </section>
    </div>
  );
}