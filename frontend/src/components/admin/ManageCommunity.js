import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import "./manageCommunity.css";

const ManageCommunity = () => {

  const navigate =
    useNavigate();

  const [posts,
    setPosts] =
    useState([]);

  // ✅ FETCH POSTS

  const fetchPosts =
    async () => {

      try {

        const res =
          await axios.get(

            "http://localhost:5000/api/community/all"
          );

        setPosts(
          res.data.posts || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchPosts();

  }, []);

  // ✅ DELETE POST

  const deletePost =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this post?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(

          `http://localhost:5000/api/community/delete/${id}`
        );

        fetchPosts();

      } catch (error) {

        console.log(error);
      }
    };

  // ✅ DELETE COMMENT

  const deleteComment =
    async (
      postId,
      commentId
    ) => {

      const confirmDelete =
        window.confirm(
          "Delete this comment?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(

`http://localhost:5000/api/community/comment/delete/${postId}/${commentId}`
        );

        fetchPosts();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="manage-community">

      {/* ✅ BACK BUTTON */}

      <button
        className="community-back-btn"

        onClick={() =>
          navigate("/admin")
        }
      >

        ← Back

      </button>

      <h1>
        Manage Community
      </h1>

      {posts.length === 0 && (

        <p className="no-post-text">

          No community posts found

        </p>
      )}

      {posts.map(
        (post) => (

          <div
            key={post._id}
            className="admin-post-card"
          >

            {/* ✅ TOP */}

            <div className="admin-post-top">

              <div>

                <h2>
                  {post.userName}
                </h2>

                <p>
                  {post.text}
                </p>

              </div>

              <button

                className="admin-delete-post"

                onClick={() =>
                  deletePost(
                    post._id
                  )
                }
              >

                Delete Post

              </button>

            </div>

            {/* ✅ IMAGE */}

            {post.image && (

              <img
                src={post.image}

                alt="post"

                className="admin-post-image"
              />

            )}

            {/* ✅ COMMENTS */}

            <div className="admin-comments">

              <h3>
                Comments
              </h3>

              {post.comments
                ?.length === 0 && (

                <p className="no-comment-text">

                  No comments

                </p>
              )}

              {post.comments?.map(

                (comment) => (

                  <div
                    key={comment._id}

                    className="admin-comment"
                  >

                    <div>

                      <strong>

                        {
                          comment.userName
                        }

                      </strong>

                      <p>
                        {
                          comment.text
                        }
                      </p>

                    </div>

                    <button

                      className="admin-delete-comment"

                      onClick={() =>
                        deleteComment(

                          post._id,

                          comment._id
                        )
                      }
                    >

                      Delete

                    </button>

                  </div>
                )
              )}

            </div>

          </div>
        )
      )}

    </div>
  );
};

export default ManageCommunity;
