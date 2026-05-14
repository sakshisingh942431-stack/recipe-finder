const express = require("express");

const router = express.Router();

const Water = require("../models/Water");


// ✅ SAVE / UPDATE WATER DATA

router.post(
  "/save",
  async (req, res) => {

    try {

      const {
        user,
        intake,
        goal,
        streak,
        history,
        weeklyData,
      } = req.body;

      let waterData =
        await Water.findOne({
          user,
        });

      if (waterData) {

        waterData.intake =
          intake;

        waterData.goal =
          goal;

        waterData.streak =
          streak;

        waterData.history =
          history;

        waterData.weeklyData =
          weeklyData;

        await waterData.save();

      } else {

        waterData =
          new Water({

            user,
            intake,
            goal,
            streak,
            history,
            weeklyData,

          });

        await waterData.save();
      }

      res.status(200).json({

        success: true,

        message:
          "Water data saved",

        waterData,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",
      });
    }
  }
);


// ✅ GET ALL WATER DATA
// IMPORTANT → YE ROUTE UPPER HONA CHAHIYE

router.get(
  "/all",
  async (req, res) => {

    try {
const data = await Water.find()
  .populate("user", "name email");

      res.status(200).json({

        success: true,

        data,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Error fetching water data",
      });
    }
  }
);


// ✅ ADMIN ANALYTICS

router.get(
  "/admin/all",
  async (req, res) => {

    try {

      const allWaterUsers =
        await Water.find() .populate(
      "user",
      "name email"
    );

      res.status(200).json({

        success: true,

        totalUsers:
          allWaterUsers.length,

        data:
          allWaterUsers,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",
      });
    }
  }
);


// ✅ GET SINGLE USER WATER DATA
// IMPORTANT → YE SABSE NICHE HONA CHAHIYE

router.get(
  "/:userId",
  async (req, res) => {

    try {

      const waterData =
        await Water.findOne({

          user:
            req.params.userId,
        });

      res.status(200).json(
        waterData
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Server Error",
      });
    }
  }
);
// ✅ DELETE USER WATER DATA

router.delete(
  "/delete/:id",
  async (req, res) => {

    try {

      await Water.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Water data deleted",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          "Delete failed",
      });
    }
  }
);
module.exports = router;