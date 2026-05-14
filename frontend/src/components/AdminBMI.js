import React,
{
  useEffect,
  useState
}
from "react";

import axios
from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
}
from "recharts";

import "./adminBMI.css";

import {
  useNavigate
}
from "react-router-dom";

const AdminBMI = () => {

  const navigate =
    useNavigate();

  const [stats, setStats] =
    useState({});

  const [bmiData, setBmiData] =
    useState([]);

  // ✅ FILTER STATE

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const recordsPerPage = 5;

  // ✅ FETCH ADMIN DATA

  const fetchAdminBMI =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/bmi/admin/all"
          );

        setStats(
          res.data.stats
        );

        setBmiData(
          res.data.bmiData
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchAdminBMI();

  }, []);

  // ✅ DELETE BMI

  const deleteBMI = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/bmi/delete/${id}`
      );

      fetchAdminBMI();

    } catch (error) {

      console.log(error);
    }
  };

  // ✅ FILTERED DATA

  const filteredBMI =

    bmiData.filter((item) => {

      const matchStatus =

        filterStatus === "All"

          ? true

          : item.status ===
            filterStatus;

      const matchSearch =

        item.status
          .toLowerCase()

          .includes(
            searchTerm.toLowerCase()
          )

        ||

        item.weight
          .toString()

          .includes(searchTerm)

        ||

        item.bmi
          .toString()

          .includes(searchTerm);

      return (
        matchStatus &&
        matchSearch
      );
    });

  const lastIndex =
    currentPage * recordsPerPage;

  const firstIndex =
    lastIndex - recordsPerPage;

  const currentRecords =
    filteredBMI.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      filteredBMI.length /
      recordsPerPage
    );

  // ✅ PIE CHART DATA

  const chartData = [

    {
      name: "Normal",
      value:
        stats.normalCount || 0,
    },

    {
      name: "Overweight",
      value:
        stats.overweightCount || 0,
    },

    {
      name: "Obese",
      value:
        stats.obeseCount || 0,
    },

    {
      name: "Underweight",
      value:
        stats.underweightCount || 0,
    },
  ];

  const COLORS = [
    "#38b000",
    "#ffb703",
    "#d00000",
    "#3a86ff",
  ];

  return (

    <div className="admin-bmi-page">

      {/* ✅ BACK BUTTON */}

      <button
        className="back-btn"

        onClick={() =>
          navigate("/admin")
        }
      >
        ← Back to Dashboard
      </button>

      <h1>
        BMI Admin Dashboard
      </h1>

      {/* ================= */}
      {/* STATS */}
      {/* ================= */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>
            {stats.totalBMI}
          </h2>
          <p>
            Total BMI
          </p>
        </div>

        <div className="stat-card">
          <h2>
            {stats.normalCount}
          </h2>
          <p>
            Normal
          </p>
        </div>

        <div className="stat-card">
          <h2>
            {stats.overweightCount}
          </h2>
          <p>
            Overweight
          </p>
        </div>

        <div className="stat-card">
          <h2>
            {stats.obeseCount}
          </h2>
          <p>
            Obese
          </p>
        </div>

      </div>

      {/* ================= */}
      {/* CHART */}
      {/* ================= */}

      <div className="chart-box">

        <h2>
          BMI Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <PieChart>

            <Pie
              data={chartData}

              cx="50%"
              cy="50%"

              outerRadius={120}

              dataKey="value"

              label
            >

              {chartData.map(
                (entry, index) => (

                  <Cell
                    key={index}

                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* ================= */}
      {/* TABLE */}
      {/* ================= */}

      <div className="table-box">

        <h2>
          Latest BMI Records
        </h2>

        {/* ✅ FILTER */}

        <div className="filter-box">

          <input
            type="text"

            placeholder="Search BMI / Weight / Status"

            value={searchTerm}

            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

          <select
            value={filterStatus}

            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
          >

            <option value="All">
              All
            </option>

            <option value="Normal">
              Normal
            </option>

            <option value="Overweight">
              Overweight
            </option>

            <option value="Obese">
              Obese
            </option>

            <option value="Underweight">
              Underweight
            </option>

          </select>

        </div>

        <table>

          <thead>

            <tr>

              <th>
                Weight
              </th>

              <th>
                BMI
              </th>

              <th>
                Status
              </th>

              <th>
                Date
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {currentRecords.map(
              (item) => (

                <tr key={item._id}>

                  <td>
                    {item.weight} KG
                  </td>

                  <td>
                    {item.bmi}
                  </td>

                  <td>
                    {item.status}
                  </td>

                  <td>

                    {
                      new Date(
                        item.createdAt
                      ).toLocaleString()
                    }

                  </td>

                  <td>

                    <button
                      className="delete-btn"

                      onClick={() =>
                        deleteBMI(item._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

        <div className="pagination">

          <button

            disabled={currentPage === 1}

            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            Previous
          </button>

          <span>

            Page {currentPage}
            of {totalPages}

          </span>

          <button

            disabled={
              currentPage === totalPages
            }

            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminBMI;