import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {

  const navigate = useNavigate();

  const [notifications] = useState([
    "🎉 New user registered",
    "🔥 Trending video updated",
    "❤️ New likes received",
    "📩 New message from user",
    "🍲 New recipe added"
  ]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg,#e8f5e9,#fff3e0)"
      }}
    >

      {/* TOP BUTTONS */}
      <div style={{ marginBottom: "20px" }}>

        <button
          onClick={() => navigate(-1)}
          style={btnStyle}
        >
          ⬅ Back
        </button>

        <button
          onClick={() => navigate("/admin")}
          style={btnStyle}
        >
          🏠 Dashboard
        </button>

      </div>

      <h1 style={{ marginBottom: "30px" }}>
        🔔 Notifications
      </h1>

      <div
        style={{
          display: "grid",
          gap: "20px"
        }}
      >

        {notifications.map((note, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{note}</h3>
          </div>
        ))}

      </div>

    </div>
  );
};

const btnStyle = {
  marginRight: "10px",
  padding: "8px 14px",
  border: "none",
  borderRadius: "8px",
  background:
    "linear-gradient(45deg,#4CAF50,orange)",
  color: "#fff",
  cursor: "pointer"
};

export default Notifications;