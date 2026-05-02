import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShortReels() {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos/admin"); // 🔥 test ke liye admin
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory"
      }}
    >
      {videos.map((video) => (
        <div
          key={video._id}
          style={{
            height: "100vh",
            scrollSnapAlign: "start"
          }}
        >
          <video
            src={video.videoUrl}
            controls
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          <h3 style={{ position: "absolute", bottom: "20px", left: "20px", color: "white" }}>
            {video.title}
          </h3>
        </div>
      ))}
    </div>
  );
}