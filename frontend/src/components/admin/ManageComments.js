import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageComments = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments();
  }, []);

  // 🔥 FETCH ALL VIDEOS + COMMENTS
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/videos/admin"
      );

      setVideos(res.data);

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

      fetchComments();

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 DELETE REPLY
  const deleteReply = async (
    videoId,
    commentId,
    replyId
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/videos/reply/${videoId}/${commentId}/${replyId}`
      );

      fetchComments();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg,#e8f5e9,#fff3e0)"
      }}
    >

      {/* 🔥 TOP BAR */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginRight: "10px",
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background: " linear-gradient(45deg, #4CAF50, orange)",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          ⬅ Back
        </button>

        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background: " linear-gradient(45deg, #4CAF50, orange)",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          🏠 Dashboard
        </button>
      </div>

      <h1 style={{ marginBottom: "20px" }}>
        💬 Manage Comments
      </h1>

      {/* 🔥 COMMENTS */}
      {videos.map((video) => (
        <div
          key={video._id}
          style={{
            background: "#fff",
            marginBottom: "25px",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >

          <h2>{video.title}</h2>

          {/* COMMENTS */}
          {video.comments?.length === 0 ? (
            <p>No comments yet 😴</p>
          ) : (
            video.comments.map((c) => (
              <div
                key={c._id}
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  background: "#f5f5f5",
                  borderRadius: "10px"
                }}
              >

                <p>
                  <b>{c.user}</b>: {c.text}
                </p>

                <button
                  onClick={() =>
                    deleteComment(video._id, c._id)
                  }
                  style={{
                    background: "crimson",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "5px"
                  }}
                >
                  Delete Comment
                </button>

                {/* 🔥 REPLIES */}
                {c.replies?.map((r) => (
                  <div
                    key={r._id}
                    style={{
                      marginLeft: "20px",
                      marginTop: "10px",
                      padding: "10px",
                      background: "#e8f5e9",
                      borderRadius: "10px"
                    }}
                  >

                    <p>
                      ↳ <b>{r.user}</b>: {r.text}
                    </p>

                    <button
                      onClick={() =>
                        deleteReply(
                          video._id,
                          c._id,
                          r._id
                        )
                      }
                      style={{
                        background: "darkred",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      Delete Reply
                    </button>

                  </div>
                ))}

              </div>
            ))
          )}

        </div>
      ))}

    </div>
  );
};

export default ManageComments;