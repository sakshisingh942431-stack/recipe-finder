import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./signup.css";
import API from "../utils/auth";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await API.post("/api/users/signup", {
        name,
        email,
        password,
      });

      navigate(
        `/login?next=${encodeURIComponent(next)}&email=${encodeURIComponent(email)}&fromSignup=1`,
        { replace: true }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Signup failed"
      );
    }

    setLoading(false);
  }

  return (
    <div className="signup-page">
      <div className="signup-layout">

        <div className="signup-left">
          <div className="signup-left-content">
            <h1>NutriNest</h1>
            <h2>Join The Healthy Community</h2>

            <p>
              Create your account to save recipes,
              explore healthy meals, track calories
              and unlock smart features.
            </p>

            <div className="signup-features">
              <span>✔ 1200+ Recipes</span>
              <span>✔ Personal Dashboard</span>
              <span>✔ Nutrition Tracking</span>
            </div>
          </div>
        </div>

        <div className="signup-right">
          <div className="signup-card">

            <h2>Create an account</h2>

            {error && (
              <div className="signup-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </form>

            <p className="signup-login-text">
              Already have an account?{" "}
              <Link
                className="signup-login-link"
                to={`/login?next=${encodeURIComponent(next)}&email=${encodeURIComponent(email)}`}
              >
                Log in
              </Link>
            </p>

            <button
              type="button"
              className="back-home-btn"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}