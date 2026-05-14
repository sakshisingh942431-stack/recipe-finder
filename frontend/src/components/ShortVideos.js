import React,
{
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import "./shorts.css";

const ShortVideos = () => {

  const navigate =
    useNavigate();

  const [videos,
    setVideos] =
    useState([]);

  // ✅ FETCH VIDEOS

  const fetchVideos =
    async () => {

      try {

        const res =
          await axios.get(

            "http://localhost:5000/api/videos/user"
          );

        setVideos(
          res.data || []
        );

      } catch (err) {

        console.log(err);
      }
    };

  useEffect(() => {

    fetchVideos();

  }, []);

  // ✅ LIKE VIDEO

  const likeVideo =
    async (id) => {

      try {
 const user =
        JSON.parse(
          localStorage.getItem("user")
        );
        await axios.put(

`http://localhost:5000/api/videos/like/${id}`,
   {
          userId: user?.id,
        }
        );

        fetchVideos();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="shorts-page">

      {/* ✅ BACK BUTTON */}

      <button
        className="shorts-back"

        onClick={() =>
          navigate(-1)
        }
      >
        ← Back
      </button>

      {/* ✅ TITLE */}

      <h1 className="shorts-title">

        NutriNest Shorts

      </h1>

      {/* ✅ VIDEOS */}

      <div className="shorts-container">

        {videos.map(
          (video) => (

            <div
              key={video._id}

              className="short-card"
            >

              {/* ✅ VIDEO */}

              <video
                controls

                className="short-video"
              >

                <source
                  src={video.videoUrl}

                  type="video/mp4"
                />

              </video>

              {/* ✅ INFO */}

              <div className="short-info">

                <h3>
                  {video.title}
                </h3>

                <button
                  className="like-video-btn"

                  onClick={() =>
                    likeVideo(
                      video._id
                    )
                  }
                >

                  ❤️ {
                    video.likes || 0
                  }

                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
};

export default ShortVideos;