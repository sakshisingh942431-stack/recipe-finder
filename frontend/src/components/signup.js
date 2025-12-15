// frontend/src/components/signup.js
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./signup.css"; // keep CSS import

import API from "../utils/auth"; // axios + token helpers (we will NOT auto-login here)

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  // preserve the next param if present (where user originally wanted to go)
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
      // call backend signup
      const res = await API.post("/api/users/signup", {
        name,
        email,
        password,
      });

      const data = res.data || {};
      setLoading(false);

      // Even if backend returns a token, we will NOT auto-login.
      // Instead send user to the login page so they must explicitly log in.
      // Keep next and email in query so login page can prefill and redirect.
      navigate(`/login?next=${encodeURIComponent(next)}&email=${encodeURIComponent(email)}&fromSignup=1`, { replace: true });
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || err.message || "Signup failed");
      setLoading(false);
    }
  }

  return (
    <div
      className="signup-container"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="signup-card">
        <h2>Create an account</h2>
        {error && <div className="signup-error">{error}</div>}

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
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
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
  );
}
