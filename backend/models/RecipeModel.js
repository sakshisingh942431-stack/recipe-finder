const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    qty: { type: String, trim: true },
  },
  { _id: false }
);

const RecipeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },

    title: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: "general" },
    description: { type: String, trim: true, default: "" },

    ingredients: { type: [IngredientSchema], default: [] },
    steps: { type: [String], default: [] },
    tags: { type: [String], default: [] },

    prepTime: { type: Number, min: 0, default: 0 },
    cookTime: { type: Number, min: 0, default: 0 },
    servings: { type: Number, min: 1, default: 1 },

    image: { type: String, trim: true, default: "" },

    source: {
      type: String,
      enum: ["local", "mealdb"],
      default: "local",
      index: true,
    },

    mealDbId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
  },
  { timestamps: true }
);

RecipeSchema.index({
  title: "text",
  description: "text",
  category: "text",
  tags: "text",
});

RecipeSchema.virtual("totalTime").get(function () {
  return (this.prepTime || 0) + (this.cookTime || 0);
});

RecipeSchema.methods.toPreview = function () {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    image: this.image,
    prepTime: this.prepTime,
    cookTime: this.cookTime,
    totalTime: this.totalTime,
    servings: this.servings,
    tags: this.tags,
    category: this.category,
    createdAt: this.createdAt,
  };
};

RecipeSchema.statics.search = function (q, options = {}) {
  const filter = q ? { $text: { $search: q } } : {};
  const limit = options.limit ? Number(options.limit) : 10;
  const skip = options.page ? (Number(options.page) - 1) * limit : 0;
  return this.find(filter).skip(skip).limit(limit);
};

const Recipe =
  mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
