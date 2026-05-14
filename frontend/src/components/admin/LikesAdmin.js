import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./likesAdmin.css";

export default function LikesAdmin() {
  const [videos, setVideos] = useState([]);
  const [sortType, setSortType] = useState("top");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos/admin");
      console.log("VIDEOS:", res.data);
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 SORT + SEARCH
  const filteredSorted = useMemo(() => {
    let list = [...videos];

    if (query.trim()) {
      list = list.filter((v) =>
        v.title?.toLowerCase().includes(query.toLowerCase())
      );
    }

    list.sort((a, b) => {
      if (sortType === "top") return (b.likes || 0) - (a.likes || 0);
      if (sortType === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

    return list;
  }, [videos, sortType, query]);

  const resetLikes = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/videos/reset-likes/${id}`
      );
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-bg">
      <div className="container">

        {/* TOP BAR */}
        <div className="top-bar">
          <button onClick={() => navigate(-1)}>⬅ Back</button>
          <button onClick={() => navigate("/admin")}>🏠 Dashboard</button>
        </div>

        <h2>❤️ Likes Management</h2>

        {/* 🔍 SEARCH */}
        <input
          className="search-input"
          placeholder="Search video..."
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* 🔥 FILTER */}
        <div className="filter-btns">
          <button
            className={sortType === "top" ? "active" : ""}
            onClick={() => setSortType("top")}
          >
            🔥 Top
          </button>

          <button
            className={sortType === "latest" ? "active" : ""}
            onClick={() => setSortType("latest")}
          >
            🆕 Latest
          </button>
        </div>

        {/* 🎥 GRID */}
        <div className="video-grid">
          {filteredSorted.map((video) => (
            <div className="video-card" key={video._id}>

              {video.likes > 5 && (
                <span className="trending-badge">🔥 Trending</span>
              )}

              <video controls>
                <source src={video.videoUrl} type="video/mp4" />
              </video>

              <h4>{video.title}</h4>

              <p className="like-text">
                ❤️ {video.likes || 0} Likes
              </p>

              <button
                className="delete"
                onClick={() => resetLikes(video._id)}
              >
                Reset Likes
              </button>

            </div>
          ))}
        </div>

        {/* EMPTY */}
        {filteredSorted.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No videos found 😐
          </p>
        )}

      </div>
    </div>
  );
}