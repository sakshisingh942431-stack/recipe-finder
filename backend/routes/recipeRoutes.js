const express = require("express");

const Recipe = require("../models/RecipeModel");

const {
  importMealDb,
} = require("../controllers/mealdbController");

// 🎥 VIDEO UPLOAD
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const router = express.Router();

/* =======================================================
   ✅ GET ALL APPROVED RECIPES
======================================================= */

router.get("/", async (req, res) => {

  try {

    const recipes =
      await Recipe.find({

        isApproved: true,

      }).sort({
        createdAt: -1,
      });

    res.json(recipes);

  } catch (err) {

    console.error(
      "GET /api/recipes error:",
      err
    );

    res.status(500).json({
      message:
        "Failed to fetch recipes",
    });
  }
});

/* =======================================================
   🔥 GET PENDING RECIPES
======================================================= */

router.get(
  "/pending/all",

  async (req, res) => {

    try {

      const recipes =
        await Recipe.find({

          $or: [

            {
              isApproved: false,
            },

            {
              isApproved: {
                $exists: false,
              },
            },
          ],
        }).sort({
          createdAt: -1,
        });

      res.json(recipes);

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Failed to fetch pending recipes",
      });
    }
  }
);

/* =======================================================
   ✅ APPROVE RECIPE
======================================================= */

router.put(
  "/approve/:id",

  async (req, res) => {

    try {

      const updated =
        await Recipe.findByIdAndUpdate(

          req.params.id,

          {
            isApproved: true,
          },

          { new: true }
        );

      res.json({

        success: true,

        message:
          "Recipe approved",

        recipe: updated,
      });

    } catch (err) {

      res.status(500).json({

        success: false,

        error: err.message,
      });
    }
  }
);

/* =======================================================
   🔥 RECIPE + VIDEO UPLOAD
======================================================= */

router.post(
  "/upload",

  upload.single("video"),

  async (req, res) => {

    try {

      const data = req.body || {};

      // ✅ VIDEO URL SUPPORT
      let finalVideoUrl =
        data.videoUrl || "";

      /* ==========================================
         🎥 CLOUDINARY VIDEO UPLOAD
      ========================================== */

      if (req.file) {

        const streamUpload = () =>

          new Promise((resolve, reject) => {

            const stream =
              cloudinary.uploader.upload_stream(

                {
                  resource_type: "video",

                  folder:
                    "nutrinest-recipes",

                  quality: "auto",

                  fetch_format: "auto",
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
              .createReadStream(
                req.file.buffer
              )
              .pipe(stream);

          });

        const result =
          await streamUpload();

        // ✅ uploaded file URL overwrite
        finalVideoUrl =
          result.secure_url;
      }

      /* ==========================================
         💾 SAVE RECIPE
      ========================================== */

      const recipe =
        new Recipe({

          userId:
            data.userId &&
            data.userId !== ""
              ? data.userId
              : undefined,

          title:
            data.title || "",

          category:
            data.category || "Food",

          description:
            data.description || "",

          ingredients:
            Array.isArray(
              data.ingredients
            )

              ? data.ingredients

              : data.ingredients

              ? data.ingredients
                  .split(",")
                  .map((i) =>
                    i.trim()
                  )

              : [],

          steps:
            Array.isArray(
              data.steps
            )

              ? data.steps

              : data.steps

              ? data.steps
                  .split("\n")
                  .map((s) =>
                    s.trim()
                  )
                  .filter(Boolean)

              : [],

          tags:
            Array.isArray(data.tags)

              ? data.tags

              : data.tags

              ? data.tags
                  .split(",")
                  .map((t) =>
                    t.trim()
                  )

              : [],

          prepTime:
            Number(
              data.prepTime
            ) || 0,

          cookTime:
            Number(
              data.cookTime
            ) || 0,

          servings:
            Number(
              data.servings
            ) || 1,

          image:
            data.image || "",

          // 🎥 FINAL VIDEO URL
          videoUrl:
            finalVideoUrl,

          calories:
            Number(
              data.calories
            ) || 0,

          source:
            data.source || "local",

          // 🔥 DEFAULT PENDING
          isApproved: false,

          mealDbId:
            data.mealDbId ||
            undefined,
        });

      await recipe.save();

      res.status(201).json({

        success: true,

        message:
          "Recipe uploaded successfully. Waiting for admin approval.",

        recipe,
      });

    } catch (err) {

      console.log(
        "UPLOAD ERROR:",
        err
      );

      res.status(500).json({

        success: false,

        error:
          err.message ||
          "Upload failed",
      });
    }
  }
);

/* =======================================================
   ❌ DELETE RECIPE
======================================================= */

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await Recipe.findByIdAndDelete(id);

    res.json({
      message:
        "Recipe deleted",
    });

  } catch (err) {

    console.error(
      "DELETE /api/recipes/:id error:",
      err
    );

    res.status(500).json({
      message:
        "Failed to delete recipe",
    });
  }
});

/* =======================================================
   🔍 SEARCH RECIPES
======================================================= */

router.get("/search", async (req, res) => {

  try {

    const q =
      req.query.q || "";

    let recipes = [];

    recipes =
      await Recipe.find({

        isApproved: true,

        $or: [

          {
            title: {
              $regex: q,
              $options: "i",
            },
          },

          {
            category: {
              $regex: q,
              $options: "i",
            },
          },

          {
            description: {
              $regex: q,
              $options: "i",
            },
          },

          {
            tags: {
              $regex: q,
              $options: "i",
            },
          },
        ],
      });

    // ✅ FALLBACK
    if (recipes.length === 0) {

      recipes =
        await Recipe.find({

          isApproved: true,

        }).limit(8);
    }

    res.json({

      success: true,

      recipes,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: "Server Error",
    });
  }
});

/* =======================================================
   🏷 TAGS
======================================================= */

router.get("/tags", async (req, res) => {

  try {

    const tags =
      await Recipe.distinct("tags");

    res.json(tags);

  } catch (err) {

    console.error(
      "GET /api/recipes/tags error:",
      err
    );

    res.status(500).json({
      message:
        "Failed to fetch tags",
    });
  }
});

/* =======================================================
   🥦 INGREDIENTS
======================================================= */

router.get(
  "/ingredients",

  async (req, res) => {

    try {

      const ingredients =
        await Recipe.distinct(
          "ingredients"
        );

      res.json(ingredients);

    } catch (err) {

      console.error(
        "GET /api/recipes/ingredients error:",
        err
      );

      res.status(500).json({
        message:
          "Failed to fetch ingredients",
      });
    }
  }
);

/* =======================================================
   ✏ UPDATE RECIPE
======================================================= */

router.put("/:id", async (req, res) => {

  try {

    const updated =
      await Recipe.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }
      );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
});
/* =======================================================
   📊 TOTAL RECIPES COUNT
======================================================= */

router.get(
  "/count/all",

  async (req, res) => {

    try {

      const totalRecipes =
        await Recipe.countDocuments();

      res.json({
        totalRecipes,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Failed to count recipes",
      });
    }
  }
);
/* =======================================================
   🍽 SINGLE APPROVED RECIPE
======================================================= */

router.get("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const recipe =
      await Recipe.findOne({

        _id: id,

        isApproved: true,
      });

    if (!recipe) {

      return res.status(404).json({

        message:
          "Recipe not found or not approved",
      });
    }

    res.json(recipe);

  } catch (err) {

    console.error(
      "GET /api/recipes/:id error:",
      err
    );

    res.status(500).json({
      message:
        "Failed to fetch recipe",
    });
  }
});

/* =======================================================
   🍽 IMPORT MEALDB
======================================================= */

router.post(
  "/import-mealdb",
  importMealDb
);

module.exports = router;