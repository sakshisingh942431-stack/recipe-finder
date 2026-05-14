// frontend/src/components/home.js

import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaHeartbeat,
  FaTint,
  FaUsers,
  FaPlayCircle,
  FaHeart,
  FaUtensils,
  FaStar,
  FaChartLine,
  FaLeaf
} from "react-icons/fa";

import "./home.css";
import logo from "../assets/logo.png";

const Home = () => {

  const navigate =
    useNavigate();

  const [homeData, setHomeData] =
    useState(null);

  useEffect(() => {

    const fetchHomeData =
      async () => {

        try {

          const res =
            await axios.get(
              "http://localhost:5000/api/home"
            );

          console.log(
            "HOME API:",
            res.data
          );

          setHomeData(res.data);

        } catch (err) {

          console.log(err);

        }
      };

    fetchHomeData();

  }, []);

  const handleCuisineClick =
    (category) => {

      navigate(
        `/search?category=${encodeURIComponent(category)}`
      );
    };

  const handleDashboardClick =
    () => {

      const token =
        localStorage.getItem(
          "token"
        );

      const adminToken =
        localStorage.getItem(
          "adminToken"
        );

      if (
        token ||
        adminToken
      ) {

        navigate(
          "/dashboard"
        );

      } else {

        alert(
          "Please login first"
        );

        navigate(
          "/login"
        );
      }
    };
const features = [
  {
    id: 1,
    icon: <FaUtensils />,
    title: "Healthy Recipes",
    route: "/search",
  },
  {
    id: 2,
    icon: <FaHeartbeat />,
    title: "BMI Tracker",
    route: "/bmi",
  },
  {
    id: 3,
    icon: <FaTint />,
    title: "Water Intake",
    route: "/water",
  },
  {
    id: 4,
    icon: <FaPlayCircle />,
    title: "Short Videos",
    route: "/shorts",
  },
  {
    id: 5,
    icon: <FaUsers />,
    title: "Community",
    route: "/community",
  },
  {
    id: 6,
    icon: <FaHeart />,
    title: "Favorites",
    route: "/favorites",
  },
];
  const categories = [
    {
      name: "Indian",
      img:
        "/recipe-images/indian-food.jpg",
    },
    {
      name: "Italian",
      img:
        "/recipe-images/italian-food.jpg",
    },
    {
      name: "Drinks",
      img:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Diet",
      img:
        "/recipe-images/diet-food.jpg",
    },
    {
      name: "Sweet",
      img:
        "/recipe-images/sweet.jpg",
    },
  ];

  return (

    <div className="home-container">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* HERO */}

      <section className="hero">

        <div className="home-hero-left">

          <span className="home-tagline">

            <FaLeaf />

            Healthy Living Platform

          </span>

          <h1>

            Eat Smart With

            <span>
              NutriNest
            </span>

            <img
              src={logo}
              alt="logo"
              className="hero-logo"
            />

          </h1>

          <p>

            Discover healthy recipes,
            track calories,
            watch short videos
            and build better habits
            every day.

          </p>

          <div className="hero-btns">

            <Link
              to="/search"
              className="primary-btn"
            >
              Explore Recipes
            </Link>

            <button
              onClick={
                handleDashboardClick
              }
              className="secondary-btn"
            >
              Open Dashboard
            </button>

          </div>

          {/* DYNAMIC STATS */}

          <div className="hero-stats">

            <div>

              <h3>
                {
                  homeData?.stats
                    ?.recipes || 0
                }+
              </h3>

              <p>
                Recipes
              </p>

            </div>

            <div>

              <h3>
                {
                  homeData?.stats
                    ?.users || 0
                }+
              </h3>

              <p>
                Users
              </p>

            </div>

            <div>

              <h3>
                {
                  homeData?.stats
                    ?.videos || 0
                }+
              </h3>

              <p>
                Videos
              </p>

            </div>

          </div>
{/* DYNAMIC MINI TAGS */}

<div className="mini-recipes">

  {
    homeData?.miniTags &&
    homeData.miniTags.map(
      (tag, index) => (

        <div
          className="mini-recipe-card"
          key={index}
onClick={() => {
const cleanTag =
  tag.replace(/[^\w\s]/gi, "").trim();

let searchValue = cleanTag;

if (cleanTag === "Weight Loss Meals") {
  searchValue = "Healthy";
}

if (cleanTag === "Quick Breakfast") {
  searchValue = "Breakfast";
}

if (cleanTag === "Healthy Snacks") {
  searchValue = "Snack";
}

if (cleanTag === "Fat Burner") {
  searchValue = "Diet";
}

navigate(
  `/search?q=${encodeURIComponent(searchValue)}`
);
 

}}
         
          style={{
            cursor: "pointer"
          }}
        >
          {tag}
        </div>

      )
    )
  }

</div>
 
        </div>

        <div className="home-hero-right">

          <div className="hero-image-card">

            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
              alt="Healthy Food"
            />

            <div className="mini-card one">

              <FaChartLine />

              <span>
                Calories
              </span>

            </div>

            <div className="mini-card two">

              <FaStar />

              <span>
                Top Rated
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
<section className="features">

  <h2>
    Why Choose NutriNest?
  </h2>

  <div className="feature-grid">

    {features.map((item) => (

      <div
        className="feature-card"
        key={item.id}

        onClick={() =>
          navigate(item.route)
        }
      >

        <div className="feature-icon">
          {item.icon}
        </div>

        <h3>
          {item.title}
        </h3>

      </div>

    ))}

  </div>

</section>
    
      {/* CATEGORIES */}

      <section className="categories">

        <h2>
          Popular Categories
        </h2>

        <div className="category-grid">

          {categories.map(
            (
              item,
              index
            ) => (
              <div
                className="category-card"
                key={index}
                onClick={() =>
                  handleCuisineClick(
                    item.name
                  )
                }
              >

                <img
                  src={item.img}
                  alt=""
                />

                <h3>
                  {item.name}
                </h3>

              </div>
            )
          )}

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <div className="cta-box">

          <h2>
            Build Better Food Habits
          </h2>

          <p>
            Join NutriNest and
            turn your daily meals
            into a healthier
            lifestyle.
          </p>

          <Link
            to="/signup"
            className="primary-btn"
          >
            Join Free Today
          </Link>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="footer">

        <h3>
          NutriNest
        </h3>

        <p>
          Eat Better • Live Better
        </p>

      </footer>

    </div>
  );
};

export default Home;