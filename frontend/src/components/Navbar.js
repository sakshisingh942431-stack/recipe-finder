import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const linkStyle = {
  fontSize: "18px",
  fontWeight: 600,
  color: "orange",
  textDecoration: "none",
};

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        padding: "16px 24px",
        borderBottom: "1px solid #eee",
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
  
        <h2 style={{ color:"orange", margin: 0 }}>🍽️ Recipe Finder</h2>

        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/search" style={linkStyle}>Search</Link>
        <Link to="/tips" style={linkStyle}>Tips</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>

      {/* RIGHT */}
      <div style={{ position: "relative" }}>
        {!user && (
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/signup" style={linkStyle}>Signup</Link>
            <Link to="/login" style={linkStyle}>Login</Link>
          </div>
        )}

        {user && (
          <>
            {/* PROFILE ICON */}
            <div
              onClick={() => setOpen(!open)}
              style={{
                cursor: "pointer",
                fontSize: 22,
                userSelect: "none",
                
              }}
            >
              👤
            </div>

            {/* DROPDOWN */}
            {open && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "120%",
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  width: 160,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  zIndex: 100,
                }}
              >
                <div
                  style={menuItem}
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                >
                  👤 Profile
                </div>

                <div
                  style={menuItem}
                  onClick={() => {
                    setOpen(false);
                    navigate("/favorites");
                  }}
                >
                  ❤️ Favorites
                </div>

                <div
                  style={{ ...menuItem, color: "crimson" }}
                  onClick={handleLogout}
                >
                  🚪 Logout
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

const menuItem = {
  padding: "12px 14px",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 500,
  borderBottom: "1px solid #f0f0f0",
};
