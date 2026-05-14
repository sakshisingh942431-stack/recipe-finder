import React, { useState, useContext } from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaArrowLeft
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

import "./PremiumUpgrade.css";

export default function PremiumUpgrade() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [selectedPlan,
    setSelectedPlan] =
    useState("299");

  const [paymentMode,
    setPaymentMode] =
    useState("card");

  const handlePayment = (e) => {

    e.preventDefault();

    const userData =
      JSON.parse(
        localStorage.getItem("user")
      ) || {};

    const updatedUser = {

      ...userData,

      isPremium: true,

      plan: "premium",

      role: "user"
    };

    // SAVE USER

    localStorage.setItem(

      "user",

      JSON.stringify(updatedUser)
    );

    const token =
      localStorage.getItem("token") ||
      "premium-user";

    localStorage.setItem(
      "token",
      token
    );

    // CONTEXT UPDATE

    login(token, updatedUser);

    console.log(
      "FINAL USER:",
      updatedUser
    );

    alert(
      "Payment Successful 🎉"
    );

    // NAVIGATE

    navigate(
      "/Premium-dashboard",
      { replace: true }
    );
  };

  return (

    <div className="premium-page">

      {/* 🔙 BACK ICON */}

      <div
        className="premium-back-icon"
        onClick={() => navigate(-1)}
      >

        <FaArrowLeft />

      </div>

      <div className="premium-card">

        <h1>
          Upgrade to Premium 🌿
        </h1>

        <p>

          Unlock advanced tools,
          trackers, meal planner
          and premium dashboard.

        </p>

        {/* 🔥 PLANS */}

        <div className="plans">

          <div

            className={
              selectedPlan === "299"
                ? "plan active"
                : "plan"
            }

            onClick={() =>
              setSelectedPlan("299")
            }
          >

            <h3>₹299</h3>

            <p>Monthly</p>

          </div>

          <div

            className={
              selectedPlan === "878"
                ? "plan active"
                : "plan"
            }

            onClick={() =>
              setSelectedPlan("878")
            }
          >

            <h3>₹878</h3>

            <p>Quarterly</p>

          </div>

          <div

            className={
              selectedPlan === "1400"
                ? "plan active"
                : "plan"
            }

            onClick={() =>
              setSelectedPlan("1400")
            }
          >

            <h3>₹1400</h3>

            <p>Yearly</p>

          </div>

        </div>

        {/* 🔥 PAYMENT TABS */}

        <div className="payment-tabs">

          <button
            type="button"
            onClick={() =>
              setPaymentMode("card")
            }
          >
            Card
          </button>

          <button
            type="button"
            onClick={() =>
              setPaymentMode("upi")
            }
          >
            UPI
          </button>

          <button
            type="button"
            onClick={() =>
              setPaymentMode("qr")
            }
          >
            QR
          </button>

        </div>

        {/* 🔥 CARD */}

        {paymentMode === "card" && (

          <div className="pay-box">

            <input
              type="text"
              placeholder="Card Number"
            />

            <input
              type="text"
              placeholder="Name on Card"
            />

            <input
              type="text"
              placeholder="Expiry"
            />

            <input
              type="text"
              placeholder="CVV"
            />

          </div>
        )}

        {/* 🔥 UPI */}

        {paymentMode === "upi" && (

          <div className="pay-box">

            <input
              type="text"
              placeholder="Enter UPI ID"
            />

          </div>
        )}

        {/* 🔥 QR */}

        {paymentMode === "qr" && (

          <div className="pay-box qr-box">

            <h3>
              Pay ₹{selectedPlan}
            </h3>

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=NutriNestPremium"
              alt="QR"
            />

            <p>
              Scan QR and click
              I Have Paid
            </p>

          </div>
        )}

        {/* 🔥 PAY BUTTON */}

        <button

          type="button"

          className="pay-btn"

          onClick={handlePayment}
        >

          Pay ₹{selectedPlan}

        </button>

      </div>

    </div>
  );
}