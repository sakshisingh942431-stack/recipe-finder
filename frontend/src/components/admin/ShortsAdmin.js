import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ShortsAdmin() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos/admin");
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/videos/status/${id}`, {
        status,
      });
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #f0fdf4, #ecfeff)", // 🌿 home जैसा bg
      }}
    >
      {/* 🔙 Top Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#facc15",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          ⬅ Back
        </button>

        <button
          onClick={() => navigate("/admin")}
          style={{
            background: "#22c55e",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          🏠 Dashboard
        </button>
      </div>

      <h2 style={{ marginBottom: "20px" }}>🎬 Manage Short Videos</h2>

      {videos.map((video) => (
        <div
          key={video._id}
          style={{
            background: "#ffffff",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <video
            width="250"
            controls
            style={{
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>

          <h4 style={{ margin: "5px 0" }}>{video.title}</h4>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color:
                  video.status === "approved"
                    ? "green"
                    : video.status === "rejected"
                    ? "red"
                    : "#555",
              }}
            >
              {video.status}
            </span>
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => updateStatus(video._id, "approved")}
              style={{
                background: "#22c55e",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Approve
            </button>

            <button
              onClick={() => updateStatus(video._id, "rejected")}
              style={{
                background: "#f97316",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Reject
            </button>

            <button
              onClick={() => deleteVideo(video._id)}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}