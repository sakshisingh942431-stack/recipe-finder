// frontend/src/components/ForgotPassword.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/auth";
import "./auth.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/users/forgot-password", {
        email,
        password,
      });

      setMsg("Password updated successfully!");

      setTimeout(() => {
        navigate(`/login?email=${email}`);
      }, 1500);

    } catch (err) {
      setMsg(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="auth-title">Forgot Password</h2>

       {msg && (
  <div
    style={{
      background: "#d4edda",
      color: "#155724",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "15px",
      textAlign: "center",
      fontWeight: "600"
    }}
  >
    {msg}
  </div>
)}

        <form onSubmit={handleSubmit} className="auth-form">

          <input
            type="email"
            placeholder="Enter Your Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter New Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn-yellow auth-submit"
          >
            Update Password
          </button>

        </form>

      </div>
    </div>
  );
}