import React, { useEffect, useState } from "react";
import "./admin.css";

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});

  const token = localStorage.getItem("token");

  // ✅ FETCH ALL MESSAGES (ADMIN)
  useEffect(() => {
    fetch("http://localhost:5000/api/messages/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

  // ✅ DELETE MESSAGE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  };

  // ✅ SEND REPLY
  const sendReply = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/messages/reply/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 VERY IMPORTANT
        },
        body: JSON.stringify({
          reply: replyText[id],
        }),
      });

      alert("Reply sent ✅");

      // UI update
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, reply: replyText[id] } : msg
        )
      );
    } catch (err) {
      alert("Error sending reply ❌");
    }
  };

  return (
    <div className="admin-panel">
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

      <div className="admin-content">
        <div className="admin-topbar">
          <h1>📩 Messages</h1>
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

              {msg.reply && (
                <p style={{ color: "green", marginTop: "8px" }}>
                  <b>Admin Reply:</b> {msg.reply}
                </p>
              )}

              <input
                type="text"
                placeholder="Write reply..."
                value={replyText[msg._id] || ""}
                onChange={(e) =>
                  setReplyText({
                    ...replyText,
                    [msg._id]: e.target.value,
                  })
                }
                style={{
                  marginTop: "10px",
                  padding: "6px",
                  width: "100%",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />

              <button
                onClick={() => sendReply(msg._id)}
                style={{
                  marginTop: "8px",
                  background: "green",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Reply
              </button>

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