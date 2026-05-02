const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // 🔥 ensure user linked
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    reply: {
      type: String,
      default: "", // 👈 admin reply
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto
  }
);

module.exports = mongoose.model("Message", messageSchema);