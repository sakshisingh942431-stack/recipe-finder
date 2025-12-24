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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
 
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(data.message || "❌ Something went wrong");
      }
    } catch (error) {
      setStatus("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="contact-container">
      <div className="overlay">
        <div className="contact-card">
          <h2>Contact Us 📞</h2>
          <p>We’d love to hear your feedback or recipe suggestions!</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>

          {status && <p className="form-status">{status}</p>}

          <p className="support">
            Or reach us directly at{" "}
            <a href="mailto:support@recipefinder.com">
              support@recipefinder.com
            </a>
          </p>

          <Link to="/" className="home-btn">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
