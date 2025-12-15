
// backend/server.js (CommonJS)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// simple logger
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// mount routes (CommonJS)
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const contactRoutes = require("./routes/contactRoutes"); // ✅ NEW

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/contact", contactRoutes); // ✅ NEW

// serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
