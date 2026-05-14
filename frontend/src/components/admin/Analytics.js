import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Analytics = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    totalLikes: 0,
    totalVideos: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/stats"
      );

      setStats(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg,#e8f5e9,#fff3e0)"
      }}
    >

      {/* TOP BAR */}
      <div style={{ marginBottom: "20px" }}>

        <button
          onClick={() => navigate(-1)}
          style={{
            marginRight: "10px",
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background:
              "linear-gradient(45deg,#4CAF50,orange)",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          ⬅ Back
        </button>

        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background:
              "linear-gradient(45deg,#4CAF50,orange)",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          🏠 Dashboard
        </button>

      </div>

      <h1 style={{ marginBottom: "30px" }}>
        📊 Analytics Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px"
        }}
      >

        <div style={cardStyle}>
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.totalRecipes}</h2>
          <p>Total Recipes</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.totalLikes}</h2>
          <p>Total Likes</p>
        </div>

        <div style={cardStyle}>
          <h2>{stats.totalVideos}</h2>
          <p>Total Shorts</p>
        </div>

      </div>

    </div>
  );
};

const cardStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  textAlign: "center"
};

export default Analytics;