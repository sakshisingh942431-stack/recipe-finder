require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

/* ======================
   Middleware
====================== */
app.use(cors());
app.use(express.json());

// debug logger (optional but useful)
app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
});

/* ======================
   MongoDB Connection
====================== */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1); // server crash karega agar DB connect nahi hua (better than silent fail)
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

/* ======================
   API Routes
====================== */
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/favorites", favoriteRoutes);

/* ======================
   Health Check Route
====================== */
app.get("/", (req, res) => {
  res.send("🚀 NutriNest API is running");
});

/* ======================
   404 Handler
====================== */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ======================
   Frontend Build (Production)
====================== */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

/* ======================
   Global Error Handler
====================== */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ======================
   Start Server
====================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});