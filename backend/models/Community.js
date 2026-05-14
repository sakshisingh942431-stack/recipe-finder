const mongoose = require("mongoose");

const commentSchema =
  new mongoose.Schema(

    {

      userId: {
        type: String,
      },

      userName: {
        type: String,
      },

      text: {
        type: String,
      },

      image: {

        type: String,

        default: "",
      },

    },

    {
      timestamps: true,
    }
  );

const communitySchema =
  new mongoose.Schema(

    {

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },

      userName: {

        type: String,
      },

      text: {

        type: String,

        default: "",
      },

      image: {

        type: String,

        default: "",
      },

      // ✅ FIXED LIKES

      likes: [

        {
          type: String,
        },
      ],

      comments: [

        commentSchema,
      ],
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Community",
    communitySchema
  );