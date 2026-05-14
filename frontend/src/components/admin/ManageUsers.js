import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      console.log("USERS:", res.data);

      setUsers(res.data);

    } catch (err) {
      console.log("FETCH USER ERROR:", err);

    } finally {
      setLoading(false);
    }
  };

  // 🔥 DELETE USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/${id}`
      );

      alert("User deleted");

      fetchUsers();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg,#e8f5e9,#fff3e0)"
      }}
    >

      {/* 🔥 TOP BAR */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginRight: "10px",
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background:
              "linear-gradient(45deg,#4CAF50,orange)",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          ⬅ Back
        </button>

        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "8px 14px",
            border: "none",
            borderRadius: "8px",
            background:
              "linear-gradient(45deg,#4CAF50,orange)",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          🏠 Dashboard
        </button>
      </div>

      <h1
        style={{
          marginBottom: "25px",
          color: "#1b1b1b"
        }}
      >
        👥 Manage Users
      </h1>

      {/* 🔥 LOADING */}
      {loading && <h3>Loading users...</h3>}

      {/* 🔥 EMPTY */}
      {!loading && users.length === 0 && (
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}
        >
          <h2>No users found 😴</h2>
        </div>
      )}

      {/* 🔥 USERS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px"
        }}
      >
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "18px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.1)"
            }}
          >

            <h2
              style={{
                marginBottom: "10px"
              }}
            >
              {user.name || "No Name"}
            </h2>

            <p>
              📧 {user.email}
            </p>

            <p>
              🛡 Role: {user.role || "user"}
            </p>

            <p>
              📅 Joined:
              {" "}
              {user.createdAt
                ? new Date(
                    user.createdAt
                  ).toLocaleDateString()
                : "N/A"}
            </p>

            <button
              onClick={() =>
                deleteUser(user._id)
              }
              style={{
                marginTop: "15px",
                padding: "10px 16px",
                border: "none",
                borderRadius: "10px",
                background: "crimson",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Delete User
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ManageUsers;