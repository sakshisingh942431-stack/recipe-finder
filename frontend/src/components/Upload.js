import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import {
  FaUtensils,
  FaImage,
  FaVideo,
  FaList,
  FaClock,
  FaUsers,
  FaFire,
  FaTags,
  FaUpload,
  FaPlayCircle,
  FaArrowLeft,
} from "react-icons/fa";

import "./upload.css";

export default function Upload() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");

  // 🎥 VIDEO
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  // EXTRA
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [calories, setCalories] = useState("");
  const [tags, setTags] = useState("");

  const [loading, setLoading] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);

      formData.append(
        "ingredients",
        ingredients
      );

      formData.append(
        "steps",
        steps
      );

      formData.append(
        "image",
        image
      );

      formData.append(
        "videoUrl",
        videoUrl
      );

      formData.append(
        "prepTime",
        prepTime
      );

      formData.append(
        "cookTime",
        cookTime
      );

      formData.append(
        "servings",
        servings
      );

      formData.append(
        "calories",
        calories
      );

      formData.append(
        "tags",
        tags
      );

      formData.append(
        "userId",
        user?._id || ""
      );

      // 🎥 VIDEO FILE
      if (video) {

        formData.append(
          "video",
          video
        );
      }

      await axios.post(
        "http://localhost:5000/api/recipes/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "✅ Recipe uploaded successfully"
      );

      // RESET
      setTitle("");
      setIngredients("");
      setSteps("");
      setImage("");
      setVideo(null);
      setVideoUrl("");
      setPrepTime("");
      setCookTime("");
      setServings("");
      setCalories("");
      setTags("");

    } catch (err) {

      console.log(err);

      alert(
        "❌ Upload failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="upload-page">

      <div className="upload-container">

        {/* LEFT SECTION */}

        <div className="left-section">

          {/* BACK BUTTON */}
<div
  className="back-icon"
  onClick={() => navigate(-1)}
>
  <FaArrowLeft />
</div>

         

          {/* HEADER */}

          <div className="upload-title">

            <div className="upload-icon">
              🍴
            </div>

            <div>
              <h1>
                Upload Recipe
              </h1>

              <p>
                Share your delicious recipe with the world 🍽️
              </p>
            </div>

          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* TITLE */}

            <div className="form-group">

              <label>
                <FaUtensils />
                Recipe Title
              </label>

              <input
                type="text"
                placeholder="e.g. Gulab Jamun"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                required
              />

            </div>

            {/* IMAGE */}

            <div className="form-group">

              <label>
                <FaImage />
                Image URL
              </label>

              <input
                type="text"
                placeholder="https://..."
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
                required
              />

            </div>

            {/* INGREDIENTS */}

            <div className="form-group">

              <label>
                <FaList />
                Ingredients
              </label>

              <textarea
                placeholder="Milk, Sugar, Flour..."
                value={ingredients}
                onChange={(e) =>
                  setIngredients(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* STEPS */}

            <div className="form-group">

              <label>
                <FaList />
                Cooking Steps
              </label>

              <textarea
                placeholder="1. Prepare dough..."
                value={steps}
                onChange={(e) =>
                  setSteps(
                    e.target.value
                  )
                }
                required
              />

            </div>

            {/* EXTRA */}

            <div className="info-grid">

              <div className="form-group">

                <label>
                  <FaClock />
                  Prep Time
                </label>

                <input
                  type="number"
                  placeholder="15"
                  value={prepTime}
                  onChange={(e) =>
                    setPrepTime(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  <FaClock />
                  Cook Time
                </label>

                <input
                  type="number"
                  placeholder="30"
                  value={cookTime}
                  onChange={(e) =>
                    setCookTime(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  <FaUsers />
                  Servings
                </label>

                <input
                  type="number"
                  placeholder="4"
                  value={servings}
                  onChange={(e) =>
                    setServings(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  <FaFire />
                  Calories
                </label>

                <input
                  type="number"
                  placeholder="250"
                  value={calories}
                  onChange={(e) =>
                    setCalories(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* TAGS */}

            <div className="form-group">

              <label>
                <FaTags />
                Tags
              </label>

              <input
                type="text"
                placeholder="Dessert, Sweet..."
                value={tags}
                onChange={(e) =>
                  setTags(
                    e.target.value
                  )
                }
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="upload-btn"
            >

              <FaUpload />

              {loading
                ? "Uploading..."
                : "Upload Recipe"}

            </button>

          </form>

        </div>

        {/* RIGHT SECTION */}

        <div className="right-section">

          <h2 className="video-title">

            <FaVideo />

            Recipe Video

          </h2>

          {/* VIDEO URL */}

          <div className="video-url">

            <input
              type="text"
              placeholder="YouTube / Drive / MP4 URL"
              value={videoUrl}
              onChange={(e) =>
                setVideoUrl(
                  e.target.value
                )
              }
            />

          </div>

          <div className="or-text">
            OR
          </div>

          {/* VIDEO FILE */}

          <label className="upload-box">

            <FaUpload
              style={{
                fontSize: "32px",
                marginBottom: "12px",
              }}
            />

            <h3>
              Upload Video File
            </h3>

            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) =>
                setVideo(
                  e.target.files[0]
                )
              }
            />

          </label>

          {/* VIDEO PREVIEW */}

          <div className="preview-box">

            {videoUrl ? (

              <video
                src={videoUrl}
                controls
                style={{
                  width: "100%",
                  borderRadius: "18px",
                }}
              />

            ) : video ? (

              <video
                src={URL.createObjectURL(video)}
                controls
                style={{
                  width: "100%",
                  borderRadius: "18px",
                }}
              />

            ) : (

              <div className="empty-preview">

                <FaPlayCircle
                  style={{
                    fontSize: "60px",
                    color: "#22c55e",
                    marginBottom: "12px",
                  }}
                />

                <p>
                  Video preview will appear here
                </p>

              </div>
            )}

          </div>

          {/* FOOD IMAGES */}

          <div className="recipe-preview-grid">

            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop"
              alt="food"
            />

            <img
              src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop"
              alt="food"
            />

          </div>

          {/* SUPPORT */}

          <div className="support-box">

            <h4>
              Supported Formats
            </h4>

            <p>
              YouTube, Vimeo,
              Google Drive,
              MP4 links or direct uploads
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}