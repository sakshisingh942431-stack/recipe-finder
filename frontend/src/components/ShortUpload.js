import React, { useState } from "react";
import axios from "axios";

const ShortUpload = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    // ❗ validation
    if (!title) {
      alert("Please enter title");
      return;
    }

    if (!videoUrl && !videoFile) {
      alert("Please provide video URL or upload file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("user", "User");
      formData.append("role", "user");

      // 🔥 FILE upload
      if (videoFile) {
        formData.append("video", videoFile);
      }

      // 🔥 URL upload
      if (videoUrl) {
        formData.append("videoUrl", videoUrl);
      }

      await axios.post(
        "http://localhost:5000/api/videos/upload",
        formData
      );

      alert("Uploaded! Waiting for admin approval 😎");

      // reset
      setTitle("");
      setVideoUrl("");
      setVideoFile(null);

    } catch (err) {
      console.log(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "420px"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
        🎬 Upload Short Video
      </h3>

      {/* TITLE */}
      <input
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* URL */}
      <input
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
        placeholder="Paste video URL (optional)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <p style={{ textAlign: "center", margin: "8px 0", color: "#888" }}>
        OR
      </p>

      {/* FILE INPUT */}
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
        style={{ marginBottom: "10px" }}
      />

      {/* FILE NAME SHOW */}
      {videoFile && (
        <p style={{ fontSize: "12px", color: "#555" }}>
          Selected: {videoFile.name}
        </p>
      )}

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          background: loading ? "#94a3b8" : "#22c55e",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ShortUpload;