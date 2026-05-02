import React, { useEffect, useState } from "react";

const UserMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/contact/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
        else setMessages([]);
      })
      .catch(() => setMessages([]));
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>📩 My Messages</h2>

      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              background: "#fff",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <p><b>You:</b> {msg.message}</p>

            {msg.reply ? (
              <p style={{ color: "green" }}>
                <b>Admin:</b> {msg.reply}
              </p>
            ) : (
              <p style={{ color: "gray" }}>
                Waiting for reply...
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UserMessages;