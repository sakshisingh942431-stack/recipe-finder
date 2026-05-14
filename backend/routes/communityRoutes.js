const express =
  require("express");

const communityUpload =
  require(
    "../middleware/communityUpload"
  );

const router =
  express.Router();

const Community =
  require("../models/Community");


// ✅ CREATE POST

router.post(

  "/create",

  communityUpload.single("image"),

  async (req, res) => {

    try {

      const {
        user,
        userName,
        text,
      } = req.body;

      const newPost =
        new Community({

          user,

          userName,

          text,

          image:
            req.file
              ? `http://localhost:5000/uploads/${req.file.filename}`
              : "",
        });

      await newPost.save();

      res.status(201).json({

        success: true,

        post: newPost,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Create post failed",
      });
    }
  }
);


// ✅ GET POSTS

router.get(
  "/all",

  async (req, res) => {

    try {

      const posts =
        await Community.find()

          .sort({
            createdAt: -1,
          });

      res.json({

        success: true,

        posts,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
      });
    }
  }
);


// ✅ LIKE POST

router.put(
  "/like/:id",

  async (req, res) => {

    try {

      const {
        userId,
      } = req.body;

      const post =
        await Community.findById(
          req.params.id
        );

      if (!post) {

        return res
          .status(404)
          .json({
            message:
              "Post not found",
          });
      }

      // ✅ SAFETY FIX

      if (
        !Array.isArray(
          post.likes
        )
      ) {

        post.likes = [];
      }

      const alreadyLiked =
        post.likes.includes(
          userId
        );

      if (alreadyLiked) {

        post.likes =
          post.likes.filter(
            (id) =>
              id !== userId
          );

      } else {

        post.likes.push(
          userId
        );
      }

      await post.save();

      res.json({

        success: true,

        likes:
          post.likes.length,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);


// ✅ DELETE POST

router.delete(
  "/delete/:id",

  async (req, res) => {

    try {

      await Community.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);


// ✅ ADD COMMENT

router.put(
  "/comment/:id",

  async (req, res) => {

    try {

      const {

        userId,

        userName,

        text,

      } = req.body;

      const post =
        await Community.findById(
          req.params.id
        );

      if (!post) {

        return res
          .status(404)
          .json({
            message:
              "Post not found",
          });
      }

      post.comments.push({

        userId,

        userName,

        text,
      });

      await post.save();

      res.json({
        success: true,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);


// ✅ DELETE COMMENT

router.delete(

  "/comment/delete/:postId/:commentId",

  async (req, res) => {

    try {

      const {
        postId,
        commentId,
      } = req.params;

      const post =
        await Community.findById(
          postId
        );

      if (!post) {

        return res
          .status(404)
          .json({
            message:
              "Post not found",
          });
      }

      post.comments =
        post.comments.filter(

          (comment) =>

            comment._id.toString()
            !== commentId
        );

      await post.save();

      res.json({

        success: true,

        message:
          "Comment deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);
// ✅ EDIT POST

router.put(

  "/edit/:id",

  async (req, res) => {

    try {

      const {
        text,
      } = req.body;

      const updatedPost =
        await Community.findByIdAndUpdate(

          req.params.id,

          {
            text,
          },

          {
            new: true,
          }
        );

      res.json({

        success: true,

        post: updatedPost,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,
      });
    }
  }
);

module.exports = router;