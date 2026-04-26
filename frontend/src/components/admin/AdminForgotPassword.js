import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../utils/auth";
import "../auth.css";

export default function AdminForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/users/forgot-password", {
        email,
        password,
      });

      setMsg(res.data.message);

      setTimeout(() => {
        navigate("/admin-login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="auth-title">
          Admin Reset Password
        </h2>

        {msg && <div className="auth-info">{msg}</div>}
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">

          <input
            className="auth-input"
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="New Password"
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

          <Link
            to="/admin-login"
            className="btn-yellow btn-back"
          >
            ← Back to Admin Login
          </Link>

        </form>
      </div>
    </div>
  );
}