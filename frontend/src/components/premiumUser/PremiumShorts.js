import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./premiumShorts.css";

export default function PremiumShorts() {

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

  return (
    <div className="shorts-page">

      {/* 🔥 FIXED FLOATING BUTTONS */}
      <div className="back-buttons">
        <button onClick={() => navigate(-1)}>⬅ Back</button>
        <button onClick={() => navigate("/premium-dashboard")}>🏠 Dashboard</button>
      </div>

      <h2 className="shorts-title">🎬 Short Videos</h2>

      {videos.map((video) => (
        <div key={video._id} className="short-card">

          <video
            src={video.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            onClick={(e) => e.target.muted = !e.target.muted}
          />

          <h4>{video.title}</h4>

        </div>
      ))}

    </div>
  );
}