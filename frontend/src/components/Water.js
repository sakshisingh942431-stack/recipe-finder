import React, {
  useState,
  useEffect
} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./water.css";

const Water = () => {

  const navigate = useNavigate();

  // ✅ WATER STATE

  const [waterIntake, setWaterIntake] =
    useState(() => {

      return Number(
        localStorage.getItem(
          "waterIntake"
        )
      ) || 0;
    });

  // ✅ HISTORY STATE

  const [history, setHistory] =
    useState([]);

  // ✅ REMINDER STATES

  const [reminderOn, setReminderOn] =
    useState(false);

  const [intervalTime, setIntervalTime] =
    useState(60);

  // ✅ CUSTOM GOAL

  const [targetWater, setTargetWater] =
    useState(() => {

      return Number(
        localStorage.getItem(
          "targetWater"
        )
      ) || 3000;
    });

  // ✅ STREAK

  const [streak, setStreak] =
    useState(() => {

      return Number(
        localStorage.getItem(
          "waterStreak"
        )
      ) || 0;
    });

  // ✅ WEEKLY DATA

  const [weeklyData, setWeeklyData] =
    useState(() => {

      return JSON.parse(
        localStorage.getItem(
          "weeklyWaterData"
        )
      ) || [];
    });

  // ✅ LOAD HISTORY

  useEffect(() => {

    const savedHistory =
      JSON.parse(
        localStorage.getItem(
          "waterHistory"
        )
      ) || [];

    setHistory(savedHistory);

  }, []);

  // ✅ SAVE WATER DATA

  useEffect(() => {

    localStorage.setItem(
      "waterIntake",
      waterIntake
    );

  }, [waterIntake]);

  // ✅ SAVE TARGET

  useEffect(() => {

    localStorage.setItem(
      "targetWater",
      targetWater
    );

  }, [targetWater]);

  // ✅ AUTO RESET EVERY NEW DAY

  useEffect(() => {

    const today =
      new Date()
        .toLocaleDateString();

    const savedDate =
      localStorage.getItem(
        "waterDate"
      );

    if (savedDate !== today) {

      localStorage.setItem(
        "waterDate",
        today
      );

      localStorage.setItem(
        "waterIntake",
        0
      );

      setWaterIntake(0);
    }

  }, []);

  // ✅ WATER REMINDER

  useEffect(() => {

    let reminder;

    if (reminderOn) {

      reminder = setInterval(() => {

        if (
          Notification.permission ===
          "granted"
        ) {

          new Notification(
            "💧 Water Reminder",
            {
              body:
                "Time to drink water!",
            }
          );
        }

      }, intervalTime * 60 * 1000);
    }

    return () =>
      clearInterval(reminder);

  }, [
    reminderOn,
    intervalTime
  ]);

  // ✅ ADD WATER

  const addWater = async (amount) => {

    const updatedWater =
      waterIntake + amount;

    setWaterIntake(
      updatedWater
    );

    // ✅ SAVE HISTORY

    const newEntry = {

      amount: amount,

      total: updatedWater,

      time:
        new Date()
          .toLocaleTimeString(),
    };

    const updatedHistory = [

      newEntry,

      ...history,
    ];

    setHistory(
      updatedHistory
    );

    localStorage.setItem(

      "waterHistory",

      JSON.stringify(
        updatedHistory
      )
    );

    // ✅ WEEKLY ANALYTICS SAVE

    const today =
      new Date()
        .toLocaleDateString(
          "en-US",
          {
            weekday: "short"
          }
        );

    const savedWeekly =
      JSON.parse(
        localStorage.getItem(
          "weeklyWaterData"
        )
      ) || [];

    const existingDay =
      savedWeekly.find(
        (item) =>
          item.day === today
      );

    if (existingDay) {

      existingDay.amount =
        updatedWater;

    } else {

      savedWeekly.push({
        day: today,
        amount: updatedWater,
      });
    }

    localStorage.setItem(
      "weeklyWaterData",
      JSON.stringify(savedWeekly)
    );

    setWeeklyData(savedWeekly);

    // ✅ STREAK UPDATE

    if (
      updatedWater >= targetWater &&
      waterIntake < targetWater
    ) {

      const updatedStreak =
        streak + 1;

      setStreak(
        updatedStreak
      );

      localStorage.setItem(
        "waterStreak",
        updatedStreak
      );
    }

    // ✅ SAVE TO DATABASE

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    console.log(user);

    try {

      await axios.post(

        "http://localhost:5000/api/water/save",

        {

          user:
            user?.id,

          intake:
            updatedWater,

          goal:
            targetWater,

          streak:
            updatedWater >= targetWater
              ? streak + 1
              : streak,

          history:
            updatedHistory,

          weeklyData:
            savedWeekly,
        }
      );

      console.log(
        "Water data saved"
      );

    } catch (error) {

      console.log(
        "Water save error",
        error
      );
    }
  };

  // ✅ RESET

  const resetWater = () => {

    setWaterIntake(0);

    setHistory([]);

    localStorage.removeItem(
      "waterHistory"
    );
  };

  // ✅ PERCENTAGE

  const percentage = Math.min(

    (waterIntake / targetWater) * 100,

    100
  );

  return (

    <div className="water-page">

      {/* BACK BUTTON */}

      <button
        className="back-btn"

        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="water-card">

        <h1>
          💧 Water Intake Tracker
        </h1>

        {/* ✅ STREAK */}

        <h3>
          🔥 Current Streak:
          {streak} days
        </h3>

        <h2>
          {waterIntake} ml
        </h2>

        <p>
          Daily Goal:
          {targetWater} ml
        </p>

        {/* ✅ GOAL */}

        <div className="goal-box">

          <h3>
            🎯 Set Daily Goal
          </h3>

          <input
            type="number"

            value={targetWater}

            onChange={(e) =>
              setTargetWater(
                Number(
                  e.target.value
                )
              )
            }
          />

        </div>

        {/* ✅ PROGRESS */}

        <div className="progress-container">

          <div
            className="progress-fill"

            style={{
              width: `${percentage}%`
            }}
          ></div>

        </div>

        <p className="percentage-text">
          {percentage.toFixed(0)}%
          Completed
        </p>

        {/* ✅ BUTTONS */}

        <div className="water-buttons">

          <button
            onClick={() =>
              addWater(250)
            }
          >
            +250 ml
          </button>

          <button
            onClick={() =>
              addWater(500)
            }
          >
            +500 ml
          </button>

          <button
            onClick={() =>
              addWater(1000)
            }
          >
            +1 Litre
          </button>

        </div>

        {/* ✅ RESET */}

        <button
          className="reset-btn"

          onClick={resetWater}
        >
          Reset
        </button>

        {/* ✅ REMINDER */}

        <div className="reminder-box">

          <h3>
            🔔 Water Reminder
          </h3>

          <select
            value={intervalTime}

            onChange={(e) =>
              setIntervalTime(
                Number(
                  e.target.value
                )
              )
            }
          >

            <option value={30}>
              Every 30 min
            </option>

            <option value={60}>
              Every 1 hour
            </option>

            <option value={120}>
              Every 2 hours
            </option>

          </select>

          <button

            className="reminder-btn"

            onClick={async () => {

              const permission =

                await Notification
                  .requestPermission();

              if (
                permission ===
                "granted"
              ) {

                setReminderOn(
                  !reminderOn
                );
              }
            }}
          >

            {reminderOn
              ? "Turn Off Reminder"
              : "Turn On Reminder"}

          </button>

        </div>

        {/* ✅ MESSAGE */}

        <div className="water-message">

          {percentage < 40 && (
            <p>
              😴 Drink more water
            </p>
          )}

          {percentage >= 40 &&
            percentage < 80 && (
            <p>
              👍 Good progress
            </p>
          )}

          {percentage >= 80 && (
            <p>
              🎉 Great job! Goal complete
            </p>
          )}

        </div>

        {/* ✅ HISTORY */}

        <div className="history-box">

          <h3>
            📜 Water History
          </h3>

          {history.length === 0 ? (

            <p>
              No history yet
            </p>

          ) : (

            <ul>

              {history.map(
                (item, index) => (

                  <li key={index}>

                    +{item.amount} ml
                    at {item.time}

                    <span>
                      {" "}
                      (Total:
                      {item.total} ml)
                    </span>

                  </li>
                )
              )}

            </ul>
          )}

        </div>

        {/* ✅ WEEKLY ANALYTICS */}

        <div className="history-box">

          <h3>
            📊 Weekly Analytics
          </h3>

          {weeklyData.length === 0 ? (

            <p>
              No weekly data yet
            </p>

          ) : (

            <div className="analytics-box">

              {weeklyData.map(
                (item, index) => {

                  const width =
                    Math.min(
                      (item.amount /
                        targetWater) * 100,
                      100
                    );

                  return (

                    <div
                      key={index}
                      className="analytics-item"
                    >

                      <p>
                        {item.day} - {item.amount} ml
                      </p>

                      <div className="analytics-bar">

                        <div
                          className="analytics-fill"

                          style={{
                            width: `${width}%`
                          }}
                        ></div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Water;