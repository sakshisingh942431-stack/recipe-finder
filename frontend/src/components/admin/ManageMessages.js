import React, { useEffect, useState } from "react";
import "./admin.css";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
        else setMessages([]);
        setLoading(false);
      })
      .catch(() => {
        setMessages([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/contact/${id}`, {
      method: "DELETE",
    });

    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  };

  return (
    <div className="admin-panel">

      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2>NutriNest</h2>
        <p>Admin Panel</p>

        <div className="admin-menu">
          <a href="/admin">Dashboard</a>
          <a href="/admin/manage-users">Users</a>
          <a href="/admin/manage-recipes">Recipes</a>
          <a href="/admin/manage-comments">Comments</a>
          <a href="/admin/messages" className="active">Messages</a>
        </div>
      </div>

      {/* Content */}
      <div className="admin-content">
        <div className="admin-topbar">
          <h1>📩 Contact Messages</h1>
          <p>All user queries in one place</p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : messages.length === 0 ? (
          <p>No messages found</p>
        ) : (
          messages.map((msg) => (
            <div className="message-card" key={msg._id}>
              <h3>{msg.name}</h3>
              <p><b>Email:</b> {msg.email}</p>
              <p>{msg.message}</p>

              <small>
                {new Date(msg.createdAt).toLocaleString()}
              </small>

              <br />

              <button
                className="delete-btn"
                onClick={() => handleDelete(msg._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageMessages;