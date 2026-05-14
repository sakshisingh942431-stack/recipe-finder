import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import "./adminwater.css";

const AdminWater = () => {

  const navigate =
    useNavigate();

  const [waterData, setWaterData] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // ✅ NEW STATES

  const [sortType, setSortType] =
    useState("high");

  const [selectedFilter, setSelectedFilter] =
    useState("all");

  // ✅ FETCH DATA

  useEffect(() => {

    fetchWaterData();

  }, []);

  const fetchWaterData =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/water/all"
          );

        setWaterData(
          res.data.data || []
        );

      } catch (error) {

        console.log(
          "Water fetch error",
          error
        );
      }
    };

  // ✅ DELETE USER

  const deleteWaterUser =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this user's water data?"
        );

      if (!confirmDelete) return;

      try {

        await axios.delete(
          `http://localhost:5000/api/water/delete/${id}`
        );

        fetchWaterData();

      } catch (error) {

        console.log(
          "Delete error",
          error
        );
      }
    };

  // ✅ FILTER + SORT USERS

  const filteredUsers =
    waterData
      .filter((item) => {

        const matchesSearch =
          item.user?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        if (
          selectedFilter ===
          "active"
        ) {

          return (
            matchesSearch &&
            item.streak >= 1
          );
        }

        return matchesSearch;
      })

      .sort((a, b) => {

        if (
          sortType === "high"
        ) {

          return (
            b.intake -
            a.intake
          );
        }

        return (
          a.intake -
          b.intake
        );
      });

  // ✅ STATS

  const totalUsers =
    waterData.length;

  const totalIntake =
    waterData.reduce(
      (acc, item) =>
        acc + item.intake,
      0
    );

  const averageGoal =
    waterData.length > 0
      ? Math.floor(
          waterData.reduce(
            (acc, item) =>
              acc + item.goal,
            0
          ) / waterData.length
        )
      : 0;

  const activeUsers =
    waterData.filter(
      (item) =>
        item.streak >= 1
    ).length;

  // ✅ TOP USER

  const topUser =
    [...waterData].sort(
      (a, b) =>
        b.intake - a.intake
    )[0];

  // ✅ CHART DATA

  const chartData =
    filteredUsers.map(
      (item) => ({

        name:
          item.user?.name ||
          "Unknown",

        intake:
          item.intake,

      })
    );

  return (

    <div className="admin-water-page">

      {/* ✅ BACK BUTTON */}

      <button
        className="back-btn"

        onClick={() =>
          navigate(-1)
        }
      >
        ← Back
      </button>

      {/* ✅ TITLE */}

      <h1>
        💧 Water Analytics Admin
      </h1>

      {/* ✅ STATS CARDS */}

      <div className="stats-grid">

        <div className="stats-card">

          <h2>
            👥 Users
          </h2>

          <p>
            {totalUsers}
          </p>

        </div>

        <div className="stats-card">

          <h2>
            💧 Intake
          </h2>

          <p>
            {totalIntake} ml
          </p>

        </div>

        <div className="stats-card">

          <h2>
            🎯 Avg Goal
          </h2>

          <p>
            {averageGoal} ml
          </p>

        </div>

        <div className="stats-card">

          <h2>
            🔥 Active
          </h2>

          <p>
            {activeUsers}
          </p>

        </div>

      </div>

      {/* ✅ TOP USER CARD */}

      {topUser && (

        <div className="top-user-card">

          <h2>
            🏆 Top Hydrated User
          </h2>

          <h3>
            {topUser.user?.name}
          </h3>

          <p>
            💧 {topUser.intake} ml
          </p>

        </div>
      )}

      {/* ✅ SEARCH BAR */}

      <input
        type="text"

        placeholder="🔍 Search user..."

        className="search-input"

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      {/* ✅ FILTER + SORT */}

      <div className="filter-sort-box">

        <select
          value={sortType}

          onChange={(e) =>
            setSortType(
              e.target.value
            )
          }
        >

          <option value="high">
            Highest Intake
          </option>

          <option value="low">
            Lowest Intake
          </option>

        </select>

        <select
          value={selectedFilter}

          onChange={(e) =>
            setSelectedFilter(
              e.target.value
            )
          }
        >

          <option value="all">
            All Users
          </option>

          <option value="active">
            Active Users
          </option>

        </select>

      </div>

      {/* ✅ CHART */}

      <div className="chart-box">

        <h2>
          📊 Weekly Water Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart
            data={chartData}

            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
              }}
            />

            <Bar
              dataKey="intake"

              fill="#4caf50"

              radius={[
                10,
                10,
                0,
                0
              ]}

              barSize={80}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* ✅ WATER GRID */}

      <div className="admin-water-grid">

        {filteredUsers.map(
          (item, index) => {

            const percentage =
              Math.min(
                (
                  item.intake /
                  item.goal
                ) * 100,
                100
              );

            return (

              <div
                key={index}
                className="admin-water-card"
              >

                {/* ✅ ACTIVE BADGE */}

                <div className="status-badge">

                  {item.streak >= 1
                    ? "🟢 Active"
                    : "🔴 Inactive"}

                </div>

                <h2>

                  {index === 0 &&
                    "🥇 "}

                  {index === 1 &&
                    "🥈 "}

                  {index === 2 &&
                    "🥉 "}

                  👤 {

                    item.user?.name ||

                    "Unknown"

                  }

                </h2>

                <p>

                  📧 {

                    item.user?.email ||

                    "No Email"

                  }

                </p>

                <p>

                  💧 Intake:
                  {item.intake} ml

                </p>

                <p>

                  🎯 Goal:
                  {item.goal} ml

                </p>

                <p>

                  🔥 Streak:
                  {item.streak} days

                </p>

                {/* ✅ PROGRESS */}

                <div className="admin-progress">

                  <div
                    className="admin-fill"

                    style={{
                      width:
                        `${percentage}%`
                    }}
                  ></div>

                </div>

                <p>

                  {percentage.toFixed(0)}%
                  Completed

                </p>

                {/* ✅ DELETE BUTTON */}

                <button
                  className="delete-btn"

                  onClick={() =>
                    deleteWaterUser(
                      item._id
                    )
                  }
                >
                  Delete User
                </button>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
};

export default AdminWater;