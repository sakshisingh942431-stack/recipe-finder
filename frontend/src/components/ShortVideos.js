import React, { useEffect, useState } from "react";
import axios from "axios";

const ShortVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos/user");
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🎬 Short Videos</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {videos.map((video) => (
          <div
            key={video._id}
            style={{
              width: "220px",
              background: "#fff",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
          >
            <video width="100%" controls>
              <source src={video.videoUrl} type="video/mp4" />
            </video>

            <p style={{ marginTop: "8px", fontWeight: "500" }}>
              {video.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortVideos;