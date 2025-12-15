// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1]; // "Bearer TOKEN"
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { userId, email, name, iat, exp }
    next();
  } catch (err) {
    console.error("Auth middleware:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
