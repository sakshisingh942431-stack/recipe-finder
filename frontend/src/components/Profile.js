import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("PROFILE MESSAGES 👉", data); // debug
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages", err);
    } finally {
      setLoading(false);
    }
  };

  fetchMessages();
}, []);


  if (!user) {
    return <p className="profile-empty">Not logged in</p>;
  }

  return (
    <div className="profile-page">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-card">
        <p>
          <span>Name:</span> {user.name}
        </p>
        <p>
          <span>Email:</span> {user.email}
        </p>
      </div>

      <h3 className="profile-subtitle">My Messages</h3>

      {loading ? (
        <p className="profile-empty">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="profile-empty">No messages sent yet.</p>
      ) : (
        <div className="message-list">
          {messages.map((msg) => (
            <div key={msg._id} className="message-card">
              <p className="message-text">{msg.message}</p>
              <small className="message-date">
                {new Date(msg.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
