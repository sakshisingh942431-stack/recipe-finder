import React, {
  useContext,
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const API_BASE =
  "http://localhost:5000/api/recipes";

/* DEMO DATA */

const demoRecipes = {
  "111": {
    _id: "111",
    title: "High Protein Bowl",
    area: "Healthy",
    category: "Fitness Meal",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    ingredients: [
      "Grilled Chicken",
      "Brown Rice",
      "Broccoli",
      "Beans",
      "Olive Oil"
    ],
    steps: [
      "Cook brown rice.",
      "Grill chicken pieces.",
      "Steam broccoli.",
      "Mix everything in bowl.",
      "Serve fresh."
    ]
  },

  "222": {
    _id: "222",
    title: "Weight Loss Salad",
    area: "Healthy",
    category: "Low Calorie",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    ingredients: [
      "Lettuce",
      "Tomato",
      "Cucumber",
      "Avocado",
      "Lemon Dressing"
    ],
    steps: [
      "Wash vegetables.",
      "Chop all ingredients.",
      "Add dressing.",
      "Mix well and serve."
    ]
  },

  "333": {
    _id: "333",
    title: "Fruit Smoothie",
    area: "Healthy",
    category: "Drink",
    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
    ingredients: [
      "Banana",
      "Mango",
      "Milk",
      "Honey",
      "Ice Cubes"
    ],
    steps: [
      "Add all ingredients in blender.",
      "Blend for 30 seconds.",
      "Pour into glass.",
      "Serve chilled."
    ]
  }
};

export default function RecipeDetail() {

  const { user } =
    useContext(AuthContext);

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [recipe, setRecipe] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [isFav, setIsFav] =
    useState(false);

  useEffect(() => {

    const fetchRecipe =
      async () => {

        try {

          if (demoRecipes[id]) {
            setRecipe(
              demoRecipes[id]
            );
            setLoading(false);
            return;
          }

          const res =
            await fetch(
              `${API_BASE}/${id}`
            );

          const data =
            await res.json();

          setRecipe(data);

        } catch {
          setRecipe(null);
        } finally {
          setLoading(false);
        }

      };

    fetchRecipe();

  }, [id]);

  useEffect(() => {

    const fav =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || [];

    if (recipe) {
      setIsFav(
        fav.includes(
          recipe._id
        )
      );
    }

  }, [recipe]);

  const handleFavorite =
    () => {

      if (!user) {
        navigate(
          `/login?next=${encodeURIComponent(
            location.pathname
          )}`
        );
        return;
      }

      let fav =
        JSON.parse(
          localStorage.getItem(
            "favorites"
          )
        ) || [];

      if (
        fav.includes(
          recipe._id
        )
      ) {

        fav = fav.filter(
          item =>
            item !==
            recipe._id
        );

        setIsFav(false);

      } else {

        fav.push(
          recipe._id
        );

        setIsFav(true);

      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(fav)
      );
    };

  if (loading)
    return (
      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "50px"
        }}
      >
        Loading...
      </h2>
    );

  if (!recipe)
    return (
      <h2
        style={{
          textAlign:
            "center",
          marginTop:
            "50px"
        }}
      >
        Recipe Not Found
      </h2>
    );

  return (

    <div
      style={{

        minHeight:
          "100vh",

        padding:
          "35px 20px",

        background:
`
radial-gradient(circle at 10% 20%, rgba(34,197,94,0.10) 0 45px, transparent 46px),
radial-gradient(circle at 25% 70%, rgba(245,158,11,0.10) 0 38px, transparent 39px),
radial-gradient(circle at 45% 25%, rgba(34,197,94,0.08) 0 42px, transparent 43px),
radial-gradient(circle at 65% 80%, rgba(245,158,11,0.10) 0 36px, transparent 37px),
radial-gradient(circle at 82% 30%, rgba(34,197,94,0.08) 0 40px, transparent 41px),
linear-gradient(135deg,#ecfdf5,#d1fae5,#fef3c7)
`

      }}
    >

      <div
        style={{

          maxWidth:
            "1050px",

          margin:
            "auto",

          padding:
            "35px",

          borderRadius:
            "30px",

          background:
            "rgba(255,255,255,.82)",

          backdropFilter:
            "blur(10px)",

          boxShadow:
            "0 20px 45px rgba(0,0,0,.08)"

        }}
      >

        <Link
          to="/favorites"
          style={{
            textDecoration:
              "none",
            color:
              "#16a34a",
            fontWeight:
              "700",
            fontSize:
              "18px"
          }}
        >
          ⬅ Back
        </Link>

        <div
          style={{

            display:
              "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            marginTop:
              "18px",

            flexWrap:
              "wrap",

            gap: "15px"

          }}
        >

          <h1
            style={{
              fontSize:
                "48px",
              margin: 0,
              color:
                "#0f172a"
            }}
          >
            {recipe.title}
          </h1>

          <button
            onClick={
              handleFavorite
            }
            style={{

              border:
                "none",

              background:
                "#fff",

              width:
                "55px",

              height:
                "55px",

              borderRadius:
                "50%",

              fontSize:
                "24px",

              cursor:
                "pointer",

              boxShadow:
                "0 10px 20px rgba(0,0,0,.08)"

            }}
          >
            {isFav
              ? "❤️"
              : "🤍"}
          </button>

        </div>

        <p
          style={{
            color:
              "#475569",
            marginTop:
              "10px",
            fontSize:
              "18px"
          }}
        >
          {recipe.area} •{" "}
          {recipe.category}
        </p>

        <img
          src={
            recipe.image
          }
          alt={
            recipe.title
          }
          style={{

            width:
              "100%",

            height:
              "460px",

            objectFit:
              "cover",

            borderRadius:
              "24px",

            marginTop:
              "25px",

            boxShadow:
              "0 15px 30px rgba(0,0,0,.10)"

          }}
        />

        <div
          style={{

            marginTop:
              "30px",

            display:
              "grid",

            gridTemplateColumns:
              "1fr 1fr",

            gap:
              "25px"

          }}
        >

          {/* Ingredients */}

          <div
            style={{

              background:
                "#ffffffdd",

              padding:
                "26px",

              borderRadius:
                "24px",

              boxShadow:
                "0 8px 20px rgba(0,0,0,.05)"

            }}
          >

            <h2
              style={{
                color:
                  "#16a34a",
                marginBottom:
                  "18px",
                fontSize:
                  "34px"
              }}
            >
              Ingredients
            </h2>

            <ul
              style={{
                paddingLeft:
                  "22px",
                lineHeight:
                  "2",
                fontSize:
                  "18px"
              }}
            >
              {recipe.ingredients.map(
                (
                  item,
                  i
                ) => (
                  <li key={i}>
                    {item}
                  </li>
                )
              )}
            </ul>

          </div>

          {/* Steps */}

          <div
            style={{

              background:
                "#ffffffdd",

              padding:
                "26px",

              borderRadius:
                "24px",

              boxShadow:
                "0 8px 20px rgba(0,0,0,.05)"

            }}
          >

            <h2
              style={{
                color:
                  "#f59e0b",
                marginBottom:
                  "18px",
                fontSize:
                  "34px"
              }}
            >
              Steps
            </h2>

            <ol
              style={{
                paddingLeft:
                  "22px",
                lineHeight:
                  "2",
                fontSize:
                  "18px"
              }}
            >
              {recipe.steps.map(
                (
                  step,
                  i
                ) => (
                  <li key={i}>
                    {step}
                  </li>
                )
              )}
            </ol>

          </div>

        </div>

      </div>

    </div>
  );
}