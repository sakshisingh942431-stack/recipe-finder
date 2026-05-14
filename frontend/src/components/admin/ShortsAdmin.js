import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/adminShorts.css";

export default function ShortsAdmin() {
  const [videos, setVideos] = useState([]);

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);

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

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("user", "admin");
      formData.append("role", "admin");

      if (videoFile) formData.append("video", videoFile);
      if (videoUrl) formData.append("videoUrl", videoUrl);

      if (!videoFile && !videoUrl) {
        alert("Please provide video file or URL ❌");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/videos/upload",
        formData
      );

      alert("Uploaded ✅");

      setTitle("");
      setVideoFile(null);
      setVideoUrl("");

      fetchVideos();
    } catch (err) {
      console.log(err);
      alert("Upload failed ❌");
    }
  };

  // 🔥 LIKE RESET (ADMIN CONTROL)
  const resetLikes = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/videos/reset-likes/${id}`);
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 REPLY
  const replyToComment = async (videoId, commentId, text) => {
    try {
      await axios.post(
        `http://localhost:5000/api/videos/reply/${videoId}/${commentId}`,
        {
          text,
          user: "Admin",
        }
      );
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE COMMENT
  const deleteComment = async (videoId, commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/videos/comment/${videoId}/${commentId}`
      );
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE REPLY
  const deleteReply = async (videoId, commentId, replyId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/videos/reply/${videoId}/${commentId}/${replyId}`
      );
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-bg">
      <div className="container">

        <div className="top-bar">
          <button className="btn back" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>

          <button className="btn dashboard" onClick={() => navigate("/admin")}>
            🏠 Dashboard
          </button>
        </div>

        <h2 className="page-title">🎬 Manage Short Videos</h2>

        {/* 📤 Upload */}
        <div className="card">
          <h3>Upload New Video</h3>

          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Paste video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />

          <p className="or-text">OR</p>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />

          <button className="upload-btn" onClick={handleUpload}>
            Upload
          </button>
        </div>

        {/* 🎥 Video Grid */}
        <div className="video-grid">
          {videos.map((video) => (
            <div className="video-card" key={video._id}>

              {/* 🔥 TRENDING BADGE */}
              {video.likes > 10 && (
                <span className="trending-badge">🔥 Trending</span>
              )}

              <video controls>
                <source src={video.videoUrl} type="video/mp4" />
              </video>

              <h4>{video.title}</h4>

              {/* ❤️ LIKE INFO */}
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                ❤️ Likes: {video.likes || 0}
              </p>

              <div className="btn-group">
                <button
                  className="approve"
                  onClick={() => updateStatus(video._id, "approved")}
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => updateStatus(video._id, "rejected")}
                >
                  Reject
                </button>

                <button
                  className="delete"
                  onClick={() => deleteVideo(video._id)}
                >
                  Delete
                </button>

                {/* 🔥 RESET LIKE */}
                <button
                  className="delete"
                  onClick={() => resetLikes(video._id)}
                >
                  Reset Likes
                </button>
              </div>

              {/* 🔥 COMMENTS */}
              <div className="comments-section">
                {video.comments?.map((c) => (
                  <div key={c._id} className="comment-item">

                    <p>
                      <b>{c.user}:</b> {c.text}

                      <button
                        style={{ marginLeft: "10px", color: "red" }}
                        onClick={() => deleteComment(video._id, c._id)}
                      >
                        ❌
                      </button>
                    </p>

                    {c.replies?.map((r) => (
                      <p key={r._id} style={{ marginLeft: "15px", color: "green" }}>
                        ↳ <b>{r.user}:</b> {r.text}

                        <button
                          style={{ marginLeft: "10px", color: "red" }}
                          onClick={() =>
                            deleteReply(video._id, c._id, r._id)
                          }
                        >
                          ❌
                        </button>
                      </p>
                    ))}

                    <input
                      placeholder="Reply..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          replyToComment(video._id, c._id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}