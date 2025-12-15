// frontend/src/components/login.js
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./auth.css";

import API from "../utils/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/";
  const prefillEmail = params.get("email") || "";
  const fromSignup = params.get("fromSignup") === "1";

  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState(fromSignup ? "Signup succeeded. Please log in to continue." : "");

  useEffect(() => {
    // if prefillEmail exists, put a small prompt
    if (prefillEmail && !fromSignup) {
      setInfo("We pre-filled your email. Please log in.");
    }
  }, [prefillEmail, fromSignup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    try {
      const response = await API.post("/api/users/login", { email, password });
      const { token, userId , name} = response.data;

      if (!token) {
        throw new Error("No token returned by server");
      }

      // store token & user context
      login(token, {id: userId ,
        name:response.data.name,
        email:email,
      });

      // after successful login, navigate to the requested page
      navigate(next, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Log in</h2>

        {info && <div style={{ background: "#eaf3ff", padding: 10, borderRadius: 6, marginBottom: 10 }}>{info}</div>}
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
          {/* anti-autofill hidden inputs */}
          <input
            type="text"
            name="fake-username"
            id="fake-username"
            autoComplete="username"
            style={{ position: "absolute", opacity: 0, height: 0, width: 0, border: 0, padding: 0 }}
            tabIndex="-1"
          />
          <input
            type="password"
            name="fake-password"
            id="fake-password"
            autoComplete="new-password"
            style={{ position: "absolute", opacity: 0, height: 0, width: 0, border: 0, padding: 0 }}
            tabIndex="-1"
          />

          <input
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <button type="submit" className="btn-yellow auth-submit">
            Log in
          </button>

          <p className="auth-meta">
            Don't have an account? <Link to={`/signup?next=${encodeURIComponent(next)}`}>Sign up</Link>
          </p>

          <Link to="/" className="btn-yellow btn-back">
            ← Back to Home
          </Link>
        </form>
      </div>
    </div>
  );
}
