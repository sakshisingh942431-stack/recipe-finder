import React, { useEffect, useState } from "react";
import "./tips.css";
import bgImage from "../assets/image.png";

const API_BASE = "http://localhost:5000/api/tips";

/* ===== STATIC TIPS (same as before) ===== */
const TIPS = [
  // ===== Beginner (10) =====
  { id: 1, text: "Always read the entire recipe before starting.", category: "Beginner", icon: "📘" },
  { id: 2, text: "Measure ingredients properly for consistent results.", category: "Beginner", icon: "⚖️" },
  { id: 3, text: "Use sharp knives to make cutting safer and easier.", category: "Beginner", icon: "🔪" },
  { id: 4, text: "Prep all ingredients before turning on the stove.", category: "Beginner", icon: "🧺" },
  { id: 5, text: "Start with simple recipes.", category: "Beginner", icon: "🍽️" },
  { id: 6, text: "Taste food while cooking.", category: "Beginner", icon: "👅" },
  { id: 7, text: "Use room temperature ingredients.", category: "Beginner", icon: "🌡️" },
  { id: 8, text: "Clean spills immediately while cooking.", category: "Beginner", icon: "🧽" },
  { id: 9, text: "Use the correct pan size.", category: "Beginner", icon: "🥘" },
  { id: 10, text: "Don’t rush the cooking process.", category: "Beginner", icon: "⏳" },

  // ===== Spices (10) =====
  { id: 11, text: "Use fresh herbs to enhance flavor.", category: "Spices", icon: "🌿" },
  { id: 12, text: "Toast spices to unlock more flavor.", category: "Spices", icon: "🔥" },
  { id: 13, text: "Grind whole spices instead of pre-ground.", category: "Spices", icon: "🌀" },
  { id: 14, text: "Add delicate spices at the end.", category: "Spices", icon: "🧂" },
  { id: 15, text: "Store spices in airtight containers.", category: "Spices", icon: "📦" },
  { id: 16, text: "Avoid burning spices in hot oil.", category: "Spices", icon: "🚫" },
  { id: 17, text: "Use garam masala at the end.", category: "Spices", icon: "🌶️" },
  { id: 18, text: "Replace old spices regularly.", category: "Spices", icon: "🔄" },
  { id: 19, text: "Balance spice with acid like lemon.", category: "Spices", icon: "🍋" },
  { id: 20, text: "Crush spices before adding.", category: "Spices", icon: "🪨" },

  // ===== Technique (10) =====
  { id: 21, text: "Don’t overcrowd the pan.", category: "Technique", icon: "🍳" },
  { id: 22, text: "Preheat the pan before oil.", category: "Technique", icon: "⏱️" },
  { id: 23, text: "Let water boil before adding pasta.", category: "Technique", icon: "💧" },
  { id: 24, text: "Cook on medium heat to avoid burning.", category: "Technique", icon: "🔥" },
  { id: 25, text: "Let food sear before flipping.", category: "Technique", icon: "🔁" },
  { id: 26, text: "Use lids to retain moisture.", category: "Technique", icon: "🫕" },
  { id: 27, text: "Drain excess oil after frying.", category: "Technique", icon: "🛢️" },
  { id: 28, text: "Rest cooked food before serving.", category: "Technique", icon: "⏸️" },
  { id: 29, text: "Use correct heat for sautéing.", category: "Technique", icon: "🔥" },
  { id: 30, text: "Avoid stirring constantly.", category: "Technique", icon: "✋" },

  // ===== Protein (10) =====
  { id: 31, text: "Let meat rest before slicing.", category: "Protein", icon: "🥩" },
  { id: 32, text: "Marinate protein for tenderness.", category: "Protein", icon: "🥣" },
  { id: 33, text: "Bring meat to room temperature.", category: "Protein", icon: "🌡️" },
  { id: 34, text: "Use thermometer for doneness.", category: "Protein", icon: "🌡️" },
  { id: 35, text: "Don’t flip meat repeatedly.", category: "Protein", icon: "🔁" },
  { id: 36, text: "Pat meat dry before cooking.", category: "Protein", icon: "🧻" },
  { id: 37, text: "Use high heat to sear.", category: "Protein", icon: "🔥" },
  { id: 38, text: "Slice meat against the grain.", category: "Protein", icon: "🔪" },
  { id: 39, text: "Avoid overcrowding protein.", category: "Protein", icon: "🍖" },
  { id: 40, text: "Rest grilled meat before serving.", category: "Protein", icon: "⏳" },

  // ===== Quick Hacks (10) =====
  { id: 41, text: "Add lemon juice to brighten dishes.", category: "Quick Hacks", icon: "🍋" },
  { id: 42, text: "Fix excess salt with potato or cream.", category: "Quick Hacks", icon: "🥔" },
  { id: 43, text: "Soak onions to reduce bitterness.", category: "Quick Hacks", icon: "🧅" },
  { id: 44, text: "Clean as you cook.", category: "Quick Hacks", icon: "🧽" },
  { id: 45, text: "Use ice water for crisp veggies.", category: "Quick Hacks", icon: "🧊" },
  { id: 46, text: "Add sugar to balance acidity.", category: "Quick Hacks", icon: "🍬" },
  { id: 47, text: "Use leftover rice for fried rice.", category: "Quick Hacks", icon: "🍚" },
  { id: 48, text: "Microwave lemons for more juice.", category: "Quick Hacks", icon: "⚡" },
  { id: 49, text: "Use curd to reduce spice heat.", category: "Quick Hacks", icon: "🥛" },
  { id: 50, text: "Wrap herbs in damp paper towel.", category: "Quick Hacks", icon: "🌿" },
];


const CATEGORIES = ["All", "Beginner", "Spices", "Technique", "Protein", "Quick Hacks"];

export default function Tips() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tipOfDay, setTipOfDay] = useState(null);
  const [savedTips, setSavedTips] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  const token = localStorage.getItem("token");

  /* ================= TIP OF THE DAY ================= */
  useEffect(() => {
    setTipOfDay(TIPS[Math.floor(Math.random() * TIPS.length)]);
  }, []);

  /* ================= FETCH SAVED TIPS FROM BACKEND ================= */
  useEffect(() => {
    if (!token) return;

    const fetchSavedTips = async () => {
      try {
        const res = await fetch(`${API_BASE}/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setSavedTips(data);
      } catch (err) {
        console.error("Failed to load saved tips", err);
      }
    };

    fetchSavedTips();
  }, [token]);

  /* ================= RESET ON CATEGORY CHANGE ================= */
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory]);

  /* ================= SAVE TIP TO BACKEND ================= */
  const toggleSave = async (tip) => {
    if (!token) {
      alert("Please login to save tips");
      return;
    }

    const alreadySaved = savedTips.some(
      (t) => t.description === tip.text
    );

    if (alreadySaved) {
      alert("Tip already saved");
      return;
    }

    try {
      await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: tip.category,
          description: tip.text,
        }),
      });

      setSavedTips((prev) => [
        ...prev,
        { title: tip.category, description: tip.text },
      ]);
    } catch (err) {
      console.error("Failed to save tip", err);
    }
  };

  const filteredTips =
    selectedCategory === "All"
      ? TIPS
      : TIPS.filter((t) => t.category === selectedCategory);

  const visibleTips = filteredTips.slice(0, visibleCount);

  return (
    <div
      className="tips-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="tips-overlay">
        <div className="tips-page">

          {/* ===== Tip of the Day ===== */}
          {tipOfDay && (
            <div className="tip-day">
              <h2>🌟 Tip of the Day</h2>
              <p>{tipOfDay.icon} {tipOfDay.text}</p>
            </div>
          )}

          {/* ===== Categories ===== */}
          <div className="category-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={cat === selectedCategory ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ===== Tips Grid ===== */}
          <div className="tips-grid">
            {visibleTips.map((tip) => {
              const isSaved = savedTips.some(
                (t) => t.description === tip.text
              );

              return (
                <div key={tip.id} className="tip-card">
                  <div className="tip-icon">{tip.icon}</div>

                  <p className="tip-text">{tip.text}</p>

                  <button
                    className={`save-btn ${isSaved ? "saved" : ""}`}
                    onClick={() => toggleSave(tip)}
                  >
                    {isSaved ? "❤️ Saved" : "🤍 Save"}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ===== More Tips ===== */}
          {visibleCount < filteredTips.length && (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                className="more-tips-btn"
                onClick={() => setVisibleCount((prev) => prev + 3)}
              >
                More Tips ✨
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
