// frontend/src/components/login.js

import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./auth.css";

import API from "../utils/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/dashboard";

  // Blank fields always
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setInfo("");

    try {
      const response = await API.post("/api/users/login", {
        email,
        password,
      });

      const token = response.data.token;

      const userData =
        response.data.user ||
        response.data.data ||
        response.data;

      const userId = userData._id || userData.id;
      const userName = userData.name;
      const userEmail = userData.email;
      const role = userData.role || "user";

      login(token, {
        id: userId,
        name: userName,
        email: userEmail,
        role: role,
      });

      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userId,
          name: userName,
          email: userEmail,
          role: role,
        })
      );

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate(next, { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Log in</h2>

        {info && <div className="auth-info">{info}</div>}
        {error && <div className="auth-error">{error}</div>}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
          autoComplete="off"
        >
          <input
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            name="newEmailField"
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            name="newPasswordField"
            required
          />

          <button
            type="submit"
            className="btn-yellow auth-submit"
          >
            Log in
          </button>

          <p className="auth-meta">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </p>
<p className="auth-meta">
  <Link to="/admin-login">
    Admin Login
  </Link>
</p>
          <p className="auth-meta">
            Don't have an account?{" "}
            <Link to={`/signup?next=${encodeURIComponent(next)}`}>
              Sign up
            </Link>
          </p>

          <Link
            to="/"
            className="btn-yellow btn-back"
          >
            ← Back to Home
          </Link>
        </form>
      </div>
    </div>
  );
}