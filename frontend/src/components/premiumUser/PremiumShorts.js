import React, {
  useEffect,
  useState,
  useRef
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "./premiumShorts.css";

export default function PremiumShorts() {

  const [videos, setVideos] =
    useState([]);

  const [user, setUser] =
    useState(null);

  const [activeComments, setActiveComments] =
    useState(null);

  const navigate = useNavigate();

  const videoRefs = useRef([]);

  // =========================
  // LOAD
  // =========================

  useEffect(() => {

    fetchVideos();

    const storedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    setUser(storedUser);

  }, []);

  // =========================
  // 🎥 AUTO PLAY FIX
  // =========================

  useEffect(() => {

    const currentVideos =
      videoRefs.current;

    const observer =
      new IntersectionObserver(

        (entries) => {

          entries.forEach((entry) => {

            const video =
              entry.target;

            if (entry.isIntersecting) {

              video.play()
                .catch(() => {});

            } else {

              video.pause();
            }
          });
        },

        {
          threshold: 0.7,
        }
      );

    currentVideos.forEach((video) => {

      if (video) {

        observer.observe(video);
      }
    });

    return () => {

      currentVideos.forEach((video) => {

        if (video) {

          observer.unobserve(video);
        }
      });
    };

  }, [videos]);

  // =========================
  // FETCH VIDEOS
  // =========================

  const fetchVideos = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/videos/admin"
        );

      setVideos(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // =========================
  // ❤️ LIKE
  // =========================

  const likeVideo = async (id) => {

    try {

      const storedUser =
        JSON.parse(
          localStorage.getItem("user")
        );

      const userId =
        storedUser?.id ||
        storedUser?._id;

      if (!userId) {

        alert(
          "Please login first ❌"
        );

        return;
      }

      await axios.put(
        `http://localhost:5000/api/videos/like/${id}`,
        {
          userId,
        }
      );

      fetchVideos();

    } catch (err) {

      console.log(
        "LIKE ERROR:",
        err.response?.data ||
        err.message
      );
    }
  };

  // =========================
  // 💬 COMMENT
  // =========================

  const addComment = async (
    id,
    text
  ) => {

    try {

      await axios.post(
        `http://localhost:5000/api/videos/comment/${id}`,
        {
          text,
          user:
            user?.name ||
            "Anonymous",
        }
      );

      fetchVideos();

      setActiveComments((prev) => {

        if (!prev) return prev;

        return {

          ...prev,

          comments: [

            ...(prev.comments || []),

            {
              text,

              user:
                user?.name ||
                "Anonymous",

              replies: [],
            },
          ],
        };
      });

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <div className="shorts-page">

      {/* 🔙 TOP BUTTONS */}

      <div className="back-buttons">

        <button
          onClick={() =>
            navigate(-1)
          }
        >
          ⬅ Back
        </button>

        <button
          onClick={() =>
            navigate(
              "/premium-dashboard"
            )
          }
        >
          🏠 Dashboard
        </button>

      </div>

      {/* 🎬 TITLE */}

      <h2 className="shorts-title">
        🎬 Short Videos
      </h2>

      {/* ========================= */}
      {/* 🎥 VIDEOS */}
      {/* ========================= */}

      {videos.map(
        (video, index) => {

          const currentUserId =
            user?.id ||
            user?._id;

          const isLiked =
            video.likedUsers?.includes(
              currentUserId
            );

          return (

            <div
              key={video._id}
              className="short-card"
            >

              <div className="video-container">

                {/* 🎥 VIDEO */}
<video
  ref={(el) =>
    (videoRefs.current[index] = el)
  }

  className={`short-video ${
    video.isLandscape
      ? "landscape-video"
      : "portrait-video"
  }`}

  src={video.videoUrl}

  onLoadedMetadata={(e) => {

    const vid = e.target;

    if (
      vid.videoWidth >
      vid.videoHeight
    ) {

      vid.classList.add(
        "landscape-video"
      );

    } else {

      vid.classList.add(
        "portrait-video"
      );
    }
  }}

                  muted

                  loop

                  playsInline

                  autoPlay

                  preload="metadata"

                  onClick={(e) => {

                    e.target.muted =
                      !e.target.muted;
                  }}
                />

                {/* 📝 TITLE */}

                <h4 className="video-title">

                  {video.title ||
                    "Short Video"}

                </h4>

                {/* ❤️ LIKE */}

                <button
                  onClick={() =>
                    likeVideo(video._id)
                  }

                  className="like-btn"
                >

                  {isLiked
                    ? "💔"
                    : "❤️"}

                  {" "}

                  {video.likes || 0}

                </button>

                {/* 💬 COMMENT */}

                <button
                  className="comment-btn"

                  onClick={() =>
                    setActiveComments(
                      video
                    )
                  }
                >
                  💬
                </button>

              </div>

            </div>
          );
        }
      )}

      {/* ========================= */}
      {/* 💬 COMMENT POPUP */}
      {/* ========================= */}

      {activeComments && (

        <div
          className="comment-popup-overlay"

          onClick={() =>
            setActiveComments(null)
          }
        >

          <div
            className="comment-popup"

            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="popup-header">

              <h3>
                Comments
              </h3>

              <button
                onClick={() =>
                  setActiveComments(
                    null
                  )
                }
              >
                ✖
              </button>

            </div>

            {/* COMMENTS */}

            <div className="popup-comments">

              {activeComments.comments
                ?.length > 0 ? (

                activeComments.comments.map(
                  (c, i) => (

                    <div key={i}>

                      <p>

                        <b>
                          {c.user}:
                        </b>

                        {" "}

                        {c.text}

                      </p>

                      {c.replies?.map(
                        (r, j) => (

                          <p
                            key={j}
                            className="reply"
                          >

                            ↳{" "}

                            <b>
                              {r.user}:
                            </b>

                            {" "}

                            {r.text}

                          </p>
                        )
                      )}

                    </div>
                  )
                )

              ) : (

                <p>
                  No comments yet.
                </p>
              )}

            </div>

            {/* INPUT */}

            <input
              type="text"

              placeholder="Add comment..."

              className="popup-input"

              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  e.target.value.trim()
                ) {

                  addComment(
                    activeComments._id,
                    e.target.value
                  );

                  e.target.value =
                    "";
                }
              }}
            />

          </div>

        </div>
      )}

    </div>
  );
}