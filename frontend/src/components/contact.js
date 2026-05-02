import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("⚠️ Please fill all fields");
      return;
    }

    setLoading(true);
    setStatus("Sending your message...");

    try {
      const token = localStorage.getItem("token"); // 🔥 IMPORTANT

      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 REQUIRED
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(data.message || "❌ Failed to send message");
      }
    } catch (error) {
      setStatus("❌ Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-wrapper">

        {/* Left */}
        <div className="contact-info">
          <span className="badge">Get In Touch</span>

          <h1>
            Let’s Build A <span>Healthier World</span> 🌿
          </h1>

          <p>
            Have recipe ideas, feature suggestions, collaborations or feedback?
            We'd love to hear from you.
          </p>

          <div className="info-box">
            <h4>📧 Email</h4>
            <p>support@nutrinest.com</p>
          </div>

          <div className="info-box">
            <h4>📍 Location</h4>
            <p>India</p>
          </div>

          <div className="info-box">
            <h4>⏰ Support Hours</h4>
            <p>Mon - Sat | 9:00 AM - 6:00 PM</p>
          </div>

          <Link to="/" className="back-home">
            ← Back to Home
          </Link>
        </div>

        {/* Form */}
        <div className="contact-card">
          <h2>Send Us Message 💬</h2>
          <p>We usually reply quickly. Good food can't wait.</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="6"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status && <p className="form-status">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;