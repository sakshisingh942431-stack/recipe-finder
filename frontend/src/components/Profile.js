import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [tips, setTips] = useState([]);

  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingTips, setLoadingTips] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingMessages(false);
      setLoadingTips(false);
      return;
    }

    /* ================= FETCH MESSAGES ================= */
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to load messages", err);
      } finally {
        setLoadingMessages(false);
      }
    };

    /* ================= FETCH TIPS ================= */
    const fetchTips = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tips/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setTips(data);
      } catch (err) {
        console.error("Failed to load tips", err);
      } finally {
        setLoadingTips(false);
      }
    };

    fetchMessages();
    fetchTips();
  }, []);

  if (!user) {
    return <p className="profile-empty">Not logged in</p>;
  }

  return (
    <div className="profile-page">
      <h2 className="profile-title">My Profile</h2>

      {/* ================= USER INFO ================= */}
      <div className="profile-card">
        <p>
          <span>Name:</span> {user.name}
        </p>
        <p>
          <span>Email:</span> {user.email}
        </p>
      </div>

      {/* ================= MESSAGES ================= */}
      <h3 className="profile-subtitle">My Messages</h3>

      {loadingMessages ? (
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

      {/* ================= TIPS ================= */}
      <h3 className="profile-subtitle">My Tips</h3>

      {loadingTips ? (
        <p className="profile-empty">Loading tips...</p>
      ) : tips.length === 0 ? (
        <p className="profile-empty">No tips added yet.</p>
      ) : (
        <div className="tip-list">
          {tips.map((tip) => (
            <div key={tip._id} className="tip-card">
              <h4 className="tip-title">{tip.title}</h4>
              <p className="tip-text">{tip.description}</p>
              <small className="tip-date">
                {new Date(tip.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
