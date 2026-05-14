const mongoose = require("mongoose");

const waterSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  intake: {
    type: Number,
    default: 0,
  },

  goal: {
    type: Number,
    default: 3000,
  },

  streak: {
    type: Number,
    default: 0,
  },

  history: [
    {
      amount: Number,
      total: Number,
      time: String,
    },
  ],

  weeklyData: [
    {
      day: String,
      amount: Number,
    },
  ],

}, {
  timestamps: true,
});

module.exports =
  mongoose.model(
    "Water",
    waterSchema
  );