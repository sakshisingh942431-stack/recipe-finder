import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/auth";
import { AuthContext } from "../context/AuthContext";
import "./auth.css";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/api/users/login", {
        email,
        password,
      });

      const user = response.data.user || response.data;
      const token = response.data.token;

      if (user.role !== "admin") {
        setError("Only admin can login here");
        return;
      }

      login(token, user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/admin");
    } catch (err) {
      setError("Invalid admin login");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="auth-title">Admin Login</h2>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="auth-form"
          autoComplete="off"
        >

          <input
            className="auth-input"
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            name="adminEmail"
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            name="adminPassword"
            required
          />

          <button
            type="submit"
            className="btn-yellow auth-submit"
          >
            Login as Admin
          </button>

          <p className="auth-meta">
            <Link to="/admin-forgot-password">
              Forgot Password?
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}