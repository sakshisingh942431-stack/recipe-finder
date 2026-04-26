require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const favoriteRoutes = require("./routes/favoriteRoutes");
/* ======================
   Middleware
====================== */
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

/* ======================
   MongoDB Connection
====================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

/* ======================
   Routes Import
====================== */
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const contactRoutes = require("./routes/contactRoutes");
const tipRoutes = require("./routes/tipRoutes");
const adminRoutes = require("./routes/adminRoutes");

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
   Frontend Build
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
  console.log(`Server running on port ${PORT}`);
});