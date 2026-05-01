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

    setMsg("");
    setError("");

    try {
      const res = await API.post(
        "/api/users/forgot-password",
        {
          email,
          password,
        }
      );

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
      <div className="login-layout">

        {/* LEFT SIDE */}
        <div className="login-left admin-left">
          <div className="left-content">
            <h1>NutriNest</h1>
            <h2>Admin Recovery 🔐</h2>

            <p>
              Reset your admin password to regain
              secure access to recipes, users,
              dashboard controls and moderation tools.
            </p>

            <div className="feature-list">
              <span>✔ Secure Recovery</span>
              <span>✔ Fast Access Restore</span>
              <span>✔ Protected Admin Panel</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <div className="auth-card">

            <h2 className="auth-title">
              Reset Password
            </h2>

            <p className="auth-subtitle">
              Admin verification required
            </p>

            {msg && (
              <div className="auth-info">
                {msg}
              </div>
            )}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="auth-form"
            >
              <input
                className="auth-input"
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

              <input
                className="auth-input"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
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

      </div>
    </div>
  );
}