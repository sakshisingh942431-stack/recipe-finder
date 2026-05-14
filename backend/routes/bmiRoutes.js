const express =
  require("express");

const router =
  express.Router();

const BMI =
  require("../models/BMI");


// ✅ SAVE BMI

router.post(
  "/save",

  async (req, res) => {

    try {

      const {

        userId,

        heightFeet,

        heightInch,

        weight,

        bmi,

        status,

      } = req.body;

      const newBMI =
        new BMI({

          // ✅ USER ID SAVE

          userId,

          // ✅ BMI DATA

          heightFeet,

          heightInch,

          weight,

          bmi,

          status,
        });

      await newBMI.save();

      res.json({

        success: true,

        message:
          "BMI saved successfully",
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


// ✅ GET ALL BMI HISTORY

router.get(
  "/",

  async (req, res) => {

    try {

      const allBMI =
        await BMI.find()

        .sort({
          createdAt: -1
        });

      res.json(allBMI);

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to fetch BMI data"
      });
    }
  }
);


// ✅ USER-WISE BMI HISTORY

router.get(
  "/:userId",

  async (req, res) => {

    try {

      const history =
        await BMI.find({

          userId:
            req.params.userId

        }).sort({

          createdAt: -1
        });

      res.json(history);

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to fetch BMI history"

      });
    }
  }
);
// ✅ ADMIN BMI DASHBOARD

router.get(
  "/admin/all",
  async (req, res) => {

    try {

      // 🔥 ALL BMI RECORDS

      const bmiData =
        await BMI.find()

        .sort({
          createdAt: -1
        });

      // 🔥 TOTAL BMI

      const totalBMI =
        bmiData.length;

      // 🔥 STATUS COUNTS

      const normalCount =
        bmiData.filter(
          item =>
            item.status === "Normal"
        ).length;

      const overweightCount =
        bmiData.filter(
          item =>
            item.status === "Overweight"
        ).length;

      const obeseCount =
        bmiData.filter(
          item =>
            item.status === "Obese"
        ).length;

      const underweightCount =
        bmiData.filter(
          item =>
            item.status === "Underweight"
        ).length;

      // ✅ RESPONSE

      res.json({

        success: true,

        stats: {

          totalBMI,

          normalCount,

          overweightCount,

          obeseCount,

          underweightCount,
        },

        bmiData,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Admin BMI fetch failed",
      });
    }
  }
);
// ✅ DELETE BMI RECORD

router.delete(
  "/delete/:id",

  async (req, res) => {

    try {

      await BMI.findByIdAndDelete(
        req.params.id
      );

      res.json({

        success: true,

        message:
          "BMI record deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Delete failed",
      });
    }
  }
);
module.exports =
  router;