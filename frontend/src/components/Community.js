import React, {
  useState,
  useEffect
} from "react";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import "./community.css";

const Community = () => {

  const navigate =
    useNavigate();

  // ✅ USER

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  // ✅ STATES

  const [text, setText] =
    useState("");

  const [posts, setPosts] =
    useState([]);

  const [commentText,
    setCommentText] =
    useState({});

  const [loading, setLoading] =
    useState(false);
const [editPostId,
  setEditPostId] =
  useState("");

const [editText,
  setEditText] =
  useState("");
  const [image, setImage] =
    useState(null);

  const [
    selectedImage,
    setSelectedImage
  ] = useState("");

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

        console.log(
          "Fetch posts error",
          error
        );
      }
    };

  useEffect(() => {

    fetchPosts();

  }, []);

  // ✅ CREATE POST

  const createPost =
    async () => {

      if (
        !text.trim() &&
        !image
      ) {

        return alert(
          "Write something or upload image"
        );
      }

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "user",
          user?.id
        );

        formData.append(
          "userName",
          user?.name
        );

        formData.append(
          "text",
          text
        );

        if (image) {

          formData.append(
            "image",
            image
          );
        }

        await axios.post(

          "http://localhost:5000/api/community/create",

          formData,

          {
            headers: {

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        setText("");

        setImage(null);

        fetchPosts();

      } catch (error) {

        console.log(
          "Create post error",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  // ✅ LIKE POST

  const likePost =
    async (id) => {

      try {

        await axios.put(

          `http://localhost:5000/api/community/like/${id}`,

          {
            userId:
              user?.id,
          }
        );

        fetchPosts();

      } catch (error) {

        console.log(
          "Like error",
          error
        );
      }
    };

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

        console.log(
          "Delete error",
          error
        );
      }
    };
// ✅ EDIT POST

const editPost =
  async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/api/community/edit/${id}`,

        {
          text: editText,
        }
      );

      setEditPostId("");

      setEditText("");

      fetchPosts();

    } catch (error) {

      console.log(
        "Edit error",
        error
      );
    }
  };
  // ✅ ADD COMMENT

  const addComment =
    async (id) => {

      if (
        !commentText[id]
          ?.trim()
      ) return;

      try {

        await axios.put(

          `http://localhost:5000/api/community/comment/${id}`,

          {
            userId:
              user?.id,

            userName:
              user?.name,

            text:
              commentText[id],
          }
        );

        setCommentText({

          ...commentText,

          [id]: "",
        });

        fetchPosts();

      } catch (error) {

        console.log(
          "Comment error",
          error
        );
      }
    };

  // ✅ DELETE COMMENT

  const deleteComment =
    async (
      postId,
      commentId
    ) => {

      try {

        await axios.delete(

          `http://localhost:5000/api/community/comment/delete/${postId}/${commentId}`
        );

        fetchPosts();

      } catch (error) {

        console.log(
          "Delete comment error",
          error
        );
      }
    };

  // ✅ TIME FORMAT

  const formatTime =
    (time) => {

      const date =
        new Date(time);

      return date
        .toLocaleString();
    };

  return (

    <div className="community-page">

      {/* ✅ BACK */}

      <button
        className="community-back"
        onClick={() =>
          navigate(-1)
        }
      >
        ← Back
      </button>

      {/* ✅ TITLE */}

      <h1 className="community-title">

        🌍 Community Feed

      </h1>

      {/* ✅ CREATE POST */}

      <div className="create-post-card">

        <h2>
          Create Post
        </h2>

        <textarea
          placeholder="Share your health journey..."
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
        />

        <input
          type="file"

          accept="image/*"

          className="image-input"

          onChange={(e) =>
            setImage(
              e.target.files[0]
            )
          }
        />

        <button
          onClick={createPost}
          disabled={loading}
        >

          {loading
            ? "Posting..."
            : "Post"}

        </button>

      </div>

      {/* ✅ POSTS */}

      <div className="posts-container">

        {posts.map(
          (post) => (

            <div
              key={post._id}
              className="post-card"
            >

              {/* ✅ HEADER */}

              <div className="post-header">

                <div className="post-left">

                  <div className="avatar">

                    {
                      post.userName
                        ?.charAt(0)
                        .toUpperCase()
                    }

                  </div>

                  <div>

                    <h3>
                      {post.userName}
                    </h3>

                    <span className="time-text">

                      {
                        formatTime(
                          post.createdAt
                        )
                      }

                    </span>

                  </div>

                </div>

                {/* ✅ DELETE POST */}

                {post.user ===
                  user?.id && (

                  <button
                    className="delete-post-btn"
                    onClick={() =>
                      deletePost(
                        post._id
                      )
                    }
                  >
                    🗑
                  </button>

                )}

              </div>
<button
  className="edit-post-btn"

  onClick={() => {

    setEditPostId(
      post._id
    );

    setEditText(
      post.text
    );
  }}
>

  Edit

</button>
              {/* ✅ POST CONTENT */}

              <div className="post-content">
{
  editPostId ===
  post._id ? (

    <div className="edit-post-box">

      <textarea

        value={editText}

        onChange={(e) =>
          setEditText(
            e.target.value
          )
        }
      />

      <button

        className="save-edit-btn"

        onClick={() =>
          editPost(
            post._id
          )
        }
      >

        Save

      </button>

    </div>

  ) : (

    <p className="post-text">

      {post.text}

    </p>
  )
}
                

                {post.image && (

                  <img
                    src={post.image}

                    alt="post"

                    className="post-image"

                    onClick={() =>
                      setSelectedImage(
                        post.image
                      )
                    }
                  />

                )}

              </div>

              {/* ✅ LIKE */}

              <div className="post-actions">

                <button
                  className="like-btn"
                  onClick={() =>
                    likePost(
                      post._id
                    )
                  }
                >

                  ❤️ {
                    post.likes
                      ?.length || 0
                  }

                </button>

              </div>

              {/* ✅ COMMENT SECTION */}

              <div className="comment-section">

                <div className="comment-input-box">

                  <input
                    type="text"
                    placeholder="Write comment..."
                    value={
                      commentText[
                        post._id
                      ] || ""
                    }

                    onChange={(e) =>
                      setCommentText({

                        ...commentText,

                        [post._id]:
                          e.target.value,
                      })
                    }
                  />

                  <button
                    className="comment-btn"
                    onClick={() =>
                      addComment(
                        post._id
                      )
                    }
                  >

                    Comment

                  </button>

                </div>

                {/* ✅ COMMENTS */}

                <div className="comments-list">

                  {post.comments?.map(
                    (
                      comment,
                      index
                    ) => (

                      <div
                        key={index}
                        className="comment-item"
                      >

                        <p className="comment-user">

                          {
                            comment.userName
                          }

                        </p>

                        <p>

                          {
                            comment.text
                          }

                        </p>

                        {/* ✅ DELETE COMMENT */}

                        {
                          comment.userId ===
                            user?.id && (

                            <button
                              className="delete-comment-btn"

                              onClick={() =>
                                deleteComment(
                                  post._id,
                                  comment._id
                                )
                              }
                            >

                              Delete

                            </button>
                          )
                        }

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>
          )
        )}

      </div>

      {/* ✅ IMAGE MODAL */}

      {selectedImage && (

        <div
          className="image-modal"

          onClick={() =>
            setSelectedImage("")
          }
        >

          <button
            className="close-modal"
          >

            ✖

          </button>

          <img
            src={selectedImage}

            alt="full"

            className="full-image"

            onClick={(e) =>
              e.stopPropagation()
            }
          />

        </div>

      )}

    </div>
  );
};

export default Community;