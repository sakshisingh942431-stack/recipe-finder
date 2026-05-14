const express = require("express");
const router = express.Router();

const ShortVideo = require("../models/ShortVideo");

const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


// ✅ TEST ROUTE
router.get("/test-upload", async (req, res) => {

  try {

    const newVideo = new ShortVideo({

      title: "Test Video",

      videoUrl:
        "https://www.w3schools.com/html/mov_bbb.mp4",

      thumbnail: "",

      user: "Sakshi",

      role: "user",

      status: "pending"
    });

    await newVideo.save();

    res.json(newVideo);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});


// 🚀 UPLOAD VIDEO
router.post(
  "/upload",
  upload.single("video"),

  async (req, res) => {

    try {

      const {
        title,
        videoUrl,
        thumbnail,
        user,
        role
      } = req.body;

      let finalVideoUrl = "";

      let publicId = "";

      // ====================================
      // ✅ FILE UPLOAD
      // ====================================

      if (req.file) {

        const streamUpload = () =>

          new Promise((resolve, reject) => {

            const stream =
              cloudinary.uploader.upload_stream(

                {

                  resource_type: "video",

                  folder: "nutrinext-shorts",

                  quality: "auto",

                  fetch_format: "auto",

                  transformation: [

                    {
                      width: 720,
                      height: 1280,
                      crop: "limit"
                    }

                  ]
                },

                (error, result) => {

                  if (error) {

                    reject(error);

                  } else {

                    resolve(result);
                  }
                }
              );

            streamifier
              .createReadStream(req.file.buffer)
              .pipe(stream);
          });

        const result =
          await streamUpload();

        finalVideoUrl =
          result.secure_url;

        // ✅ SAVE CLOUDINARY ID
        publicId =
          result.public_id;
      }

      // ====================================
      // ✅ DIRECT URL
      // ====================================

      if (videoUrl) {

        finalVideoUrl = videoUrl;
      }

      // ====================================
      // ❌ NO VIDEO
      // ====================================

      if (!finalVideoUrl) {

        return res.status(400).json({
          error: "Video required"
        });
      }

      // ====================================
      // ✅ SAVE VIDEO
      // ====================================

      const newVideo =
        new ShortVideo({

          title,

          videoUrl: finalVideoUrl,

          // ✅ CLOUDINARY ID
          cloudinaryId: publicId,

          thumbnail,

          user,

          role,

          status:
            role === "admin"
              ? "approved"
              : "pending"
        });

      await newVideo.save();

      res.status(201).json(newVideo);

    } catch (err) {

      console.log(
        "UPLOAD ERROR:",
        err
      );

      res.status(500).json({
        error: err.message
      });
    }
  }
);


// ✅ USER VIDEOS
router.get("/user", async (req, res) => {

  try {

    const videos =
      await ShortVideo.find()
      .sort({
        createdAt: -1
      });

    res.json(videos);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});


// ✅ ADMIN VIDEOS
router.get("/admin", async (req, res) => {

  try {

    const videos =
      await ShortVideo.find()
      .sort({
        createdAt: -1
      });

    res.json(videos);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});


// ✅ UPDATE STATUS
router.put("/status/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const updated =
      await ShortVideo.findByIdAndUpdate(

        req.params.id,

        { status },

        { new: true }
      );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});


// ✅ DELETE VIDEO + CLOUDINARY
router.delete("/:id", async (req, res) => {

  try {

    const video =
      await ShortVideo.findById(
        req.params.id
      );

    if (!video) {

      return res.status(404).json({
        error: "Video not found"
      });
    }

    // ====================================
    // ☁️ DELETE FROM CLOUDINARY
    // ====================================

    if (video.cloudinaryId) {

      await cloudinary.uploader.destroy(

        video.cloudinaryId,

        {
          resource_type: "video"
        }
      );
    }

    // ====================================
    // ❌ DELETE FROM MONGODB
    // ====================================

    await ShortVideo.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Video deleted successfully"
    });

  } catch (err) {

    console.log(
      "DELETE ERROR:",
      err
    );

    res.status(500).json({
      error: err.message
    });
  }
});


// ❤️ LIKE SYSTEM
router.put("/like/:id", async (req, res) => {

  try {

    const { userId } = req.body;

    if (!userId) {

      return res.status(400).json({
        error: "userId required"
      });
    }

    const video =
      await ShortVideo.findById(
        req.params.id
      );

    if (!video) {

      return res.status(404).json({
        error: "Video not found"
      });
    }

    if (!video.likedBy) {

      video.likedBy = [];
    }

    const alreadyLiked =
      video.likedBy.includes(userId);

    // 🔄 UNLIKE
    if (alreadyLiked) {

      video.likes = Math.max(
        0,
        video.likes - 1
      );

      video.likedBy =
        video.likedBy.filter(
          (u) => u !== userId
        );

      await video.save();

      return res.json({

        message: "Unliked",

        likes: video.likes,

        liked: false
      });
    }

    // ❤️ LIKE

    video.likes += 1;

    video.likedBy.push(userId);

    await video.save();

    res.json({

      message: "Liked",

      likes: video.likes,

      liked: true
    });

  } catch (err) {

    console.log(
      "LIKE ERROR:",
      err
    );

    res.status(500).json({
      error: err.message
    });
  }
});


// 💬 COMMENT
router.post("/comment/:id", async (req, res) => {

  try {

    const { text, user } =
      req.body;

    const video =
      await ShortVideo.findById(
        req.params.id
      );

    if (!video) {

      return res.status(404).json({
        error: "Video not found"
      });
    }

    video.comments.push({
      text,
      user
    });

    await video.save();

    res.json(video);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});


// 💬 ADMIN REPLY
router.post(
  "/reply/:videoId/:commentIndex",

  async (req, res) => {

    try {

      const { text, user } =
        req.body;

      const video =
        await ShortVideo.findById(
          req.params.videoId
        );

      if (!video) {

        return res.status(404).json({
          error: "Video not found"
        });
      }

      video.comments[
        req.params.commentIndex
      ].replies.push({

        text,
        user
      });

      await video.save();

      res.json(video);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
  }
);


// ❌ DELETE COMMENT
router.delete(
  "/comment/:videoId/:commentId",

  async (req, res) => {

    try {

      const {
        videoId,
        commentId
      } = req.params;

      const video =
        await ShortVideo.findById(
          videoId
        );

      video.comments =
        video.comments.filter(

          (c) =>
            c._id.toString() !==
            commentId
        );

      await video.save();

      res.json({
        message: "Comment deleted"
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
  }
);


// ❌ DELETE REPLY
router.delete(
  "/reply/:videoId/:commentId/:replyId",

  async (req, res) => {

    try {

      const {
        videoId,
        commentId,
        replyId
      } = req.params;

      const video =
        await ShortVideo.findById(
          videoId
        );

      const comment =
        video.comments.id(commentId);

      comment.replies =
        comment.replies.filter(

          (r) =>
            r._id.toString() !==
            replyId
        );

      await video.save();

      res.json({
        message: "Reply deleted"
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
  }
);


// 🔥 TRENDING
router.get("/trending", async (req, res) => {

  try {

    const videos =
      await ShortVideo.find({
        status: "approved"
      })

      .sort({
        likes: -1
      })

      .limit(5);

    res.json(videos);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});


// 🔄 RESET LIKES
router.put("/reset-likes/:id", async (req, res) => {

  try {

    const video =
      await ShortVideo.findById(
        req.params.id
      );

    video.likes = 0;

    video.likedBy = [];

    await video.save();

    res.json({
      message: "Likes reset"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});


module.exports = router;