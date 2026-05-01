import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/auth";
import "./auth.css";

export default function ForgotPassword() {
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
      await API.post("/api/users/forgot-password", {
        email,
        password,
      });

      setMsg("Password updated successfully!");

      setTimeout(() => {
        navigate(`/login?email=${email}`);
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

        <div className="login-left">
          <div className="left-content">
            <h1>NutriNest</h1>
            <h2>Account Recovery 🔒</h2>

            <p>
              Reset your password and continue
              your healthy journey securely.
            </p>

            <div className="feature-list">
              <span>✔ Secure Reset</span>
              <span>✔ Quick Recovery</span>
              <span>✔ Safe Access</span>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="auth-card">

            <h2 className="auth-title">
              Forgot Password
            </h2>

            <p className="auth-subtitle">
              Enter details to reset access
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
                type="email"
                placeholder="Enter Your Email"
                className="auth-input"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

              <input
                type="password"
                placeholder="Enter New Password"
                className="auth-input"
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

              <button
                type="button"
                className="btn-yellow btn-back"
                onClick={() => navigate("/login")}
              >
                ← Back to Login
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}