const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ===============================
// ADMIN LOGIN
// ===============================
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    // Find admin user
    const admin = await User.findOne({
      email,
      role: "admin"
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    // Token create
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role
      },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Admin login successful",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};


// ===============================
// ADMIN FORGOT PASSWORD
// ===============================
exports.adminForgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const admin = await User.findOne({
      email,
      role: "admin"
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    admin.password = hashedPassword;
    await admin.save();

    res.json({
      message: "Password updated successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};