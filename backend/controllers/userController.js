const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// ==========================
// 🔥 SIGNUP
// ==========================
exports.signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔥 CHECK EXISTING USER
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 🔥 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      message: "Signup successful",
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Signup error",
    });
  }
};

// ==========================
// 🔥 LOGIN
// ==========================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // 🔥 PASSWORD MATCH
    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    // 🔥 TOKEN
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login error",
    });
  }
};

// ==========================
// 🔥 FORGOT PASSWORD
// ==========================
exports.forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // 🔥 HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // 🔥 UPDATE PASSWORD
    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password updated successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Reset password error",
    });
  }
};

// ==========================
// 🔥 GET ALL USERS
// ==========================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching users",
    });
  }
};

// ==========================
// 🔥 DELETE USER
// ==========================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};
// 🔥 GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find().sort({
      createdAt: -1
    });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch users"
    });

  }
};

// 🔥 DELETE USER
exports.deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Delete failed"
    });

  }
};