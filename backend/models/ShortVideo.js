const mongoose = require("mongoose");


// 🔥 REPLY SCHEMA
const replySchema = new mongoose.Schema({

  text: String,

  user: String,

  createdAt: {

    type: Date,

    default: Date.now,
  },
});


// 🔥 COMMENT SCHEMA
const commentSchema = new mongoose.Schema({

  text: String,

  user: String,

  createdAt: {

    type: Date,

    default: Date.now,
  },

  replies: [replySchema],
});


// 🔥 SHORT VIDEO SCHEMA
const shortVideoSchema = new mongoose.Schema(

  {

    title: {

      type: String,

      required: true,
    },

    videoUrl: {

      type: String,

      required: true,
    },

    // ✅ NEW
    // ☁️ CLOUDINARY PUBLIC ID
    cloudinaryId: {

      type: String,

      default: "",
    },

    thumbnail: {

      type: String,

      default: "",
    },

    user: {

      type: String,

      default: "User",
    },

    role: {

      type: String,

      enum: [
        "user",
        "admin"
      ],

      default: "user",
    },

    status: {

      type: String,

      enum: [
        "pending",
        "approved",
        "rejected"
      ],

      default: "pending",
    },

    // ❤️ TOTAL LIKES
    likes: {

      type: Number,

      default: 0,
    },

    // ❤️ USERS WHO LIKED
    likedBy: [

      {

        type: String,
      },
    ],

    // 💬 COMMENTS
    comments: [commentSchema],
  },

  {

    timestamps: true,
  }
);


module.exports =
  mongoose.model(
    "ShortVideo",
    shortVideoSchema
  );