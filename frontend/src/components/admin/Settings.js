import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [websiteName, setWebsiteName] = useState(
    localStorage.getItem("websiteName") || "NutriNest"
  );

  // 🔥 APPLY THEME USING CLASS
  useEffect(() => {

    if (theme === "dark") {

      document.body.classList.add("dark-mode");

    } else {

      document.body.classList.remove("dark-mode");
    }

  }, [theme]);

  // 🔥 SAVE SETTINGS
  const handleSave = () => {

    localStorage.setItem("theme", theme);

    localStorage.setItem(
      "websiteName",
      websiteName
    );

    alert(`${theme} theme saved successfully ✅`);

    // 🔥 RELOAD APP
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",

        background:
          theme === "dark"
            ? "#121212"
            : "linear-gradient(135deg,#e8f5e9,#fff3e0)",

        color:
          theme === "dark"
            ? "#ffffff"
            : "#000000",

        transition: "0.3s ease"
      }}
    >

      {/* 🔥 TOP BUTTONS */}
      <div style={{ marginBottom: "20px" }}>

        <button
          onClick={() => navigate(-1)}
          style={{
            marginRight: "10px",
            padding: "10px 16px",
            border: "none",
            borderRadius: "10px",

            background:
              "linear-gradient(45deg,#4CAF50,orange)",

            color: "#fff",

            cursor: "pointer",

            fontWeight: "bold"
          }}
        >
          ⬅ Back
        </button>

        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "10px",

            background:
              "linear-gradient(45deg,#4CAF50,orange)",

            color: "#fff",

            cursor: "pointer",

            fontWeight: "bold"
          }}
        >
          🏠 Dashboard
        </button>

      </div>

      {/* 🔥 TITLE */}
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "45px"
        }}
      >
        ⚙ Settings
      </h1>

      {/* 🔥 SETTINGS CARD */}
      <div
        style={{
          maxWidth: "500px",

          background:
            theme === "dark"
              ? "#1e1e1e"
              : "#ffffff",

          padding: "30px",

          borderRadius: "20px",

          boxShadow:
            "0 5px 20px rgba(0,0,0,0.15)",

          transition: "0.3s ease"
        }}
      >

        {/* WEBSITE NAME */}
        <div style={{ marginBottom: "25px" }}>

          <label
            style={{
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >
            Website Name
          </label>

          <input
            type="text"
            value={websiteName}
            onChange={(e) =>
              setWebsiteName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",

              background:
                theme === "dark"
                  ? "#2a2a2a"
                  : "#ffffff",

              color:
                theme === "dark"
                  ? "#ffffff"
                  : "#000000"
            }}
          />

        </div>

        {/* THEME */}
        <div style={{ marginBottom: "30px" }}>

          <label
            style={{
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >
            Theme
          </label>

          <select
            value={theme}
            onChange={(e) =>
              setTheme(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
              outline: "none",
              cursor: "pointer",

              background:
                theme === "dark"
                  ? "#2a2a2a"
                  : "#ffffff",

              color:
                theme === "dark"
                  ? "#ffffff"
                  : "#000000"
            }}
          >
            <option value="light">
              Light
            </option>

            <option value="dark">
              Dark
            </option>

          </select>

        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "12px",

            background:
              "linear-gradient(45deg,#4CAF50,orange)",

            color: "#fff",

            cursor: "pointer",

            fontWeight: "bold",

            fontSize: "16px"
          }}
        >
          Save Settings
        </button>

      </div>

    </div>
  );
};

export default Settings;