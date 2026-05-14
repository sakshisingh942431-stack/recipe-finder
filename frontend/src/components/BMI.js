import React, {
  useState,
  useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./bmi.css";

const BMI = () => {

  const navigate = useNavigate();

  // ✅ HEIGHT STATES

  const [height, setHeight] =
    useState("");

  const [inch, setInch] =
    useState("");

  // ✅ WEIGHT

  const [weight, setWeight] =
    useState("");

  // ✅ RESULT

  const [bmi, setBmi] =
    useState(null);

  const [status, setStatus] =
    useState("");

  // ✅ IDEAL WEIGHT

  const [idealWeight, setIdealWeight] =
    useState(null);

  // ✅ CALORIES

  const [calories, setCalories] =
    useState(null);

  // ✅ HISTORY

  const [history, setHistory] =
    useState([]);

  // ✅ FETCH HISTORY
const fetchHistory = async () => {

  try {

    // ✅ GET USER

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    // ✅ AGAR USER NAHI HAI

    if (!user?.id) {

      console.log(
        "User not found"
      );

      return;
    }

    // ✅ FETCH USER BMI HISTORY

    const res =
      await axios.get(

        `http://localhost:5000/api/bmi/${user.id}`

      );

    setHistory(res.data);

  } catch (error) {

    console.log(
      "History fetch error",
      error
    );
  }
};

  // ✅ LOAD HISTORY

  useEffect(() => {

    fetchHistory();

  }, []);

  // ✅ BMI FUNCTION

  const calculateBMI = async () => {

    if (
      !height ||
      !weight
    ) {

      alert(
        "Please enter height and weight"
      );

      return;
    }

    // 🔥 FEET + INCH → METER

    const totalInches =
      (parseFloat(height) * 12) +
      parseFloat(inch || 0);

    const heightInMeter =
      totalInches * 0.0254;

    // ✅ IDEAL WEIGHT RANGE

    const minWeight =
      (
        18.5 *
        heightInMeter *
        heightInMeter
      ).toFixed(1);

    const maxWeight =
      (
        24.9 *
        heightInMeter *
        heightInMeter
      ).toFixed(1);

    setIdealWeight({
      min: minWeight,
      max: maxWeight
    });

    // ✅ CALORIE RECOMMENDATION

    const maintainCalories =
      Math.round(weight * 33);

    const weightLoss =
      maintainCalories - 400;

    const weightGain =
      maintainCalories + 400;

    setCalories({

      loss: weightLoss,

      maintain:
        maintainCalories,

      gain: weightGain
    });

    // 🔥 BMI

    const bmiValue =
      (
        weight /
        (
          heightInMeter *
          heightInMeter
        )
      ).toFixed(1);

    setBmi(bmiValue);

    // 🔥 STATUS

    let bmiStatus = "";

    if (bmiValue < 18.5) {

      bmiStatus =
        "Underweight";

    } else if (
      bmiValue >= 18.5 &&
      bmiValue < 24.9
    ) {

      bmiStatus =
        "Normal";

    } else if (
      bmiValue >= 25 &&
      bmiValue < 29.9
    ) {

      bmiStatus =
        "Overweight";

    } else {

      bmiStatus =
        "Obese";
    }

    setStatus(
      bmiStatus
    );

    // ✅ USER DATA

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    // ✅ SAVE BMI TO DATABASE

    try {

      await axios.post(
        "http://localhost:5000/api/bmi/save",

        {

          userId:
            user?.id,

          heightFeet:
            height,

          heightInch:
            inch,

          weight,

          bmi: bmiValue,

          status:
            bmiStatus,
        }
      );

      console.log(
        "BMI Saved Successfully"
      );

      // ✅ REFRESH HISTORY

      fetchHistory();

    } catch (error) {

      console.log(
        "BMI Save Error",
        error
      );
    }
  };

  return (

    <div className="bmi-page">

      {/* BACK BUTTON */}

      <button
        className="back-btn"

        onClick={() =>
          navigate(-1)
        }
      >
        ← Back
      </button>

      {/* MAIN CARD */}

      <div className="bmi-card">

        <div className="bmi-layout">

          {/* ========================= */}
          {/* LEFT PANEL */}
          {/* ========================= */}

          <div className="left-panel">

            <h1>
              BMI Tracker
            </h1>

            <p>
              Check your body mass index instantly.
            </p>

            {/* HEIGHT */}

            <div className="height-labels">

              <label>
                Height
              </label>

            </div>

            <div className="height-box">

              <input
                type="number"

                placeholder="Feet (5)"

                value={height}

                onChange={(e) =>
                  setHeight(
                    e.target.value
                  )
                }
              />

              <input
                type="number"

                placeholder="Inch (5)"

                value={inch}

                onChange={(e) =>
                  setInch(
                    e.target.value
                  )
                }
              />

            </div>

            {/* WEIGHT */}

            <input
              type="number"

              placeholder="Enter Weight in KG (60)"

              value={weight}

              onChange={(e) =>
                setWeight(
                  e.target.value
                )
              }
            />

            {/* BUTTON */}

            <button
              className="calculate-btn"

              onClick={
                calculateBMI
              }
            >
              Calculate BMI
            </button>

            {/* RESULT */}

            {bmi && (

              <div
                className={`result-box ${status.toLowerCase()}`}
              >

                <h2>
                  Your BMI: {bmi}
                </h2>

                <h3>
                  Status: {status}
                </h3>

                {/* IDEAL WEIGHT */}

                {idealWeight && (

                  <div className="ideal-weight">

                    <p>
                      Healthy Weight Range
                    </p>

                    <h4>
                      {idealWeight.min} KG
                      -
                      {idealWeight.max} KG
                    </h4>

                  </div>
                )}

                {/* CALORIE RECOMMENDATION */}

                {calories && (

                  <div className="calorie-box">

                    <h4>
                      Daily Calories
                    </h4>

                    <p>
                      Weight Loss →
                      {calories.loss} kcal
                    </p>

                    <p>
                      Maintain →
                      {calories.maintain} kcal
                    </p>

                    <p>
                      Weight Gain →
                      {calories.gain} kcal
                    </p>

                  </div>
                )}

                {/* BMI METER */}

                <div className="bmi-meter">

                  <div
                    className={`bmi-progress ${status.toLowerCase()}`}

                    style={{
                      width: `${Math.min(
                        bmi * 2,
                        100
                      )}%`
                    }}
                  ></div>

                </div>

                {/* HEALTH TIPS */}

                {status === "Underweight" && (
                  <p>
                    You should eat a balanced nutritious diet.
                  </p>
                )}

                {status === "Normal" && (
                  <p>
                    Great! Your body weight is healthy 🎉
                  </p>
                )}

                {status === "Overweight" && (
                  <p>
                    Try regular exercise and healthy meals.
                  </p>
                )}

                {status === "Obese" && (
                  <p>
                    Health risk is higher. Focus on fitness and diet.
                  </p>
                )}

              </div>
            )}

          </div>

          {/* ========================= */}
          {/* RIGHT PANEL */}
          {/* ========================= */}

          <div className="right-panel">

            {/* BMI CHART */}

            <div className="chart-section">

              <h2>
                BMI Progress Chart
              </h2>

              <ResponsiveContainer
                width="100%"
                height={320}
              >

                <LineChart data={history}>

                  <XAxis
                    dataKey="createdAt"

                    tickFormatter={(value) =>
                      new Date(value)
                        .toLocaleDateString()
                    }
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"

                    dataKey="bmi"

                    stroke="#38b000"

                    strokeWidth={4}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

            {/* BMI HISTORY */}

            <div className="history-section">

              <h2>
                BMI History
              </h2>

              {history.length === 0 ? (

                <p>
                  No history found
                </p>

              ) : (

                <div className="history-grid">

                  {history.map((item) => (

                    <div
                      className="history-card"
                      key={item._id}
                    >

                      <h3>
                        BMI: {item.bmi}
                      </h3>

                      <p>
                        Status: {item.status}
                      </p>

                      <p>
                        Weight: {item.weight} KG
                      </p>

                      <small>

                        {new Date(
                          item.createdAt
                        ).toLocaleString()}

                      </small>

                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BMI;