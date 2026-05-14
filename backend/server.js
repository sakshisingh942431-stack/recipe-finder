require("dotenv").config();
const express = require("express");
const homeRoutes =
  require("./routes/homeRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const dashboardRoutes = require("./routes/dashboardRoutes");
/* ======================
   Middleware
====================== */
app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static("uploads")
);
// 🔍 DEBUG LOGGER (important)
app.use((req, res, next) => {
  console.log(`👉 ${req.method} ${req.url}`);
  next();
});

/* ======================
   MongoDB Connection
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

/* ======================
   Routes Import
====================== */
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const contactRoutes = require("./routes/contactRoutes");
const tipRoutes = require("./routes/tipRoutes");
const adminRoutes = require("./routes/adminRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const messageRoutes = require("./routes/messageRoutes");

// ✅ NEW (Short Video Routes)
const shortVideoRoutes = require("./routes/shortVideoRoutes");
const shortRoutes = require("./routes/shortVideoRoutes");
const bmiRoutes =
  require("./routes/bmiRoutes");
  const waterRoutes =
  require("./routes/waterRoutes");
  const communityRoutes =
require("./routes/communityRoutes");
/* ======================
   API Routes
====================== */
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/messages", messageRoutes);
app.use(
  "/api/bmi",
  bmiRoutes
);
app.use(
  "/api/water",
  waterRoutes
);
app.use(
  "/api/community",
  communityRoutes
);


// ✅ NEW ROUTE
app.use("/api/videos", shortVideoRoutes);
app.use("/api/videos", shortRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/dashboard", dashboardRoutes);
/* ======================
   Health Check
====================== */
app.get("/", (req, res) => {
  res.send("🚀 NutriNest API is running");
});

/* ======================
   404 Handler
====================== */
app.use((req, res) => {
  console.log("❌ 404 HIT:", req.url);
  res.status(404).json({ message: "Route not found" });
});

/* ======================
   Global Error Handler
====================== */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ======================
   Frontend (Production)
====================== */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

/* ======================
   Start Server
====================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});