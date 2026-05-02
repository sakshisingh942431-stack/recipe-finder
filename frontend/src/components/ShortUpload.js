import React, { useState } from "react";
import axios from "axios";

const ShortUpload = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleUpload = async () => {
    if (!title || !videoUrl) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/videos/upload", {
        title,
        videoUrl,
        thumbnail: "",
        user: "User",
        role: "user"
      });

      alert("Uploaded! Waiting for admin approval 😎");

      setTitle("");
      setVideoUrl("");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "400px"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>
        🎬 Upload Short Video
      </h3>

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

      <input
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <button
        onClick={handleUpload}
        style={{
          width: "100%",
          padding: "10px",
          background: "#22c55e",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default ShortUpload;