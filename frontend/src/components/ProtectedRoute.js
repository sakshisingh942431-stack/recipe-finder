import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  adminOnly = false,
  premiumOnly = false   // 🔥 NEW
}) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // ⏳ loading
  if (loading) {
    return <div>Loading...</div>;
  }

  let currentUser = user;

  // 🔁 fallback
  if (!currentUser) {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        currentUser = JSON.parse(storedUser);
      }
    } catch {
      currentUser = null;
    }
  }

  // ❌ not logged in
  if (!currentUser || !localStorage.getItem("token")) {
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  // 🔐 admin check
  if (adminOnly && currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // 🔥 PREMIUM CHECK (MAIN FIX)
  if (premiumOnly && !currentUser.isPremium) {
    return <Navigate to="/premium-upgrade" replace />;
  }

  return children;
}