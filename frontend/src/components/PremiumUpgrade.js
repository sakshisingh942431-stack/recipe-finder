import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./PremiumUpgrade.css";

export default function PremiumUpgrade() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [selectedPlan, setSelectedPlan] = useState("299");
  const [paymentMode, setPaymentMode] = useState("card");

  const handlePayment = (e) => {

    e.preventDefault(); // 🔥 IMPORTANT FIX

    const userData =
      JSON.parse(localStorage.getItem("user")) || {};

    const updatedUser = {
      ...userData,
      isPremium: true,
      plan: "premium",
      role: "user"
    };

    // save
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const token =
      localStorage.getItem("token") || "premium-user";
    localStorage.setItem("token", token);

    // context update
    login(token, updatedUser);

    console.log("FINAL USER:", updatedUser);

    alert("Payment Successful 🎉");

    // 🔥 RELIABLE NAVIGATION
    navigate("/Premium-dashboard", { replace: true });
  };

  return (
    <div className="premium-page">
      <div className="premium-card">

        <h1>Upgrade to Premium 🌿</h1>

        <p>
          Unlock advanced tools, trackers,
          meal planner and premium dashboard.
        </p>

        <div className="plans">

          <div
            className={selectedPlan === "199" ? "plan active" : "plan"}
            onClick={() => setSelectedPlan("199")}
          >
            <h3>₹299</h3>
            <p>Monthly</p>
          </div>

          <div
            className={selectedPlan === "799" ? "plan active" : "plan"}
            onClick={() => setSelectedPlan("799")}
          >
            <h3>₹878</h3>
            <p>Quarterly</p>
          </div>

          <div
            className={selectedPlan === "1499" ? "plan active" : "plan"}
            onClick={() => setSelectedPlan("1499")}
          >
            <h3>₹1400</h3>
            <p>Yearly</p>
          </div>

        </div>

        <div className="payment-tabs">
          <button type="button" onClick={() => setPaymentMode("card")}>Card</button>
          <button type="button" onClick={() => setPaymentMode("upi")}>UPI</button>
          <button type="button" onClick={() => setPaymentMode("qr")}>QR</button>
        </div>

        {paymentMode === "card" && (
          <div className="pay-box">
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Name on Card" />
            <input type="text" placeholder="Expiry" />
            <input type="text" placeholder="CVV" />
          </div>
        )}

        {paymentMode === "upi" && (
          <div className="pay-box">
            <input type="text" placeholder="Enter UPI ID" />
          </div>
        )}

        {paymentMode === "qr" && (
          <div className="pay-box qr-box">
            <h3>Pay ₹{selectedPlan}</h3>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=NutriNestPremium"
              alt="QR"
            />
            <p>Scan QR and click I Have Paid</p>
          </div>
        )}

        <button
          type="button"   // 🔥 FIX
          className="pay-btn"
          onClick={handlePayment}
        >
          Pay ₹{selectedPlan}
        </button>

      </div>
    </div>
  );
}