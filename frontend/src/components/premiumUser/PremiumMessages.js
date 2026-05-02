import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./premiumMessages.css";

export default function PremiumMessages() {

  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const res = await axios.get(
        "http://localhost:5000/api/messages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("DATA:", res.data); // 🔍 debug
      setMessages(res.data);

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  // 🔥 MOST IMPORTANT
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
   <div className="messages-page">

  {/* 🔝 Header */}
  <div className="messages-header">
    <div className="top-buttons">
      <button onClick={() => navigate(-1)} className="back-btn">
        ⬅ Back
      </button>

      <button onClick={() => navigate("/premium-dashboard")} className="home-btn">
        🏠 Dashboard
      </button>
    </div>

    <h2>📩 My Messages</h2>
  </div>

  {/* 📩 Messages */}
  <div className="messages-list">
    {messages.map((msg, i) => (
      <div key={i} className="message-card">
        <p><strong>You:</strong> {msg.message}</p>
        <p>
          <strong>Admin:</strong> {msg.reply || "No reply yet"}
        </p>
      </div>
    ))}
  </div>

</div>
  );
}