import React, { useEffect, useState } from "react";
import "./tips.css";
import bgImage from "../assets/image.png";
const TIPS = [
  // ===== Beginner =====
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

  // ===== Spices =====
  { id: 11, text: "Use fresh herbs to enhance flavor.", category: "Spices", icon: "🌿" },
  { id: 12, text: "Toast spices to unlock more flavor.", category: "Spices", icon: "🔥" },
  { id: 13, text: "Grind whole spices instead of pre-ground.", category: "Spices", icon: "🌀" },
  { id: 14, text: "Add delicate spices near the end of cooking.", category: "Spices", icon: "🧂" },
  { id: 15, text: "Store spices in airtight containers.", category: "Spices", icon: "📦" },
  { id: 16, text: "Avoid burning spices in hot oil.", category: "Spices", icon: "🚫" },
  { id: 17, text: "Use garam masala at the end.", category: "Spices", icon: "🌶️" },
  { id: 18, text: "Replace old spices regularly.", category: "Spices", icon: "🔄" },
  { id: 19, text: "Balance spicy heat with acid.", category: "Spices", icon: "🍋" },
  { id: 20, text: "Crush spices before adding to oil.", category: "Spices", icon: "🪨" },

  // ===== Technique =====
  { id: 21, text: "Don’t overcrowd the pan while cooking.", category: "Technique", icon: "🍳" },
  { id: 22, text: "Preheat your pan before adding oil.", category: "Technique", icon: "⏱️" },
  { id: 23, text: "Let water boil fully before adding pasta.", category: "Technique", icon: "💧" },
  { id: 24, text: "Cook on medium heat to avoid burning.", category: "Technique", icon: "🔥" },
  { id: 25, text: "Let food sear before flipping.", category: "Technique", icon: "🔁" },
  { id: 26, text: "Use lids to retain moisture.", category: "Technique", icon: "🫕" },
  { id: 27, text: "Drain excess oil after frying.", category: "Technique", icon: "🛢️" },
  { id: 28, text: "Rest cooked food before serving.", category: "Technique", icon: "⏸️" },
  { id: 29, text: "Use correct heat for sautéing.", category: "Technique", icon: "🔥" },
  { id: 30, text: "Avoid stirring constantly.", category: "Technique", icon: "✋" },

  // ===== Protein =====
  { id: 31, text: "Let meat rest before slicing for juicy results.", category: "Protein", icon: "🥩" },
  { id: 32, text: "Marinate protein to enhance tenderness.", category: "Protein", icon: "🥣" },
  { id: 33, text: "Bring meat to room temperature before cooking.", category: "Protein", icon: "🌡️" },
  { id: 34, text: "Use a thermometer for perfect doneness.", category: "Protein", icon: "🌡️" },
  { id: 35, text: "Don’t flip meat repeatedly.", category: "Protein", icon: "🔁" },
  { id: 36, text: "Pat meat dry before cooking.", category: "Protein", icon: "🧻" },
  { id: 37, text: "Use high heat to sear meat.", category: "Protein", icon: "🔥" },
  { id: 38, text: "Slice meat against the grain.", category: "Protein", icon: "🔪" },
  { id: 39, text: "Avoid overcrowding protein in pan.", category: "Protein", icon: "🍖" },
  { id: 40, text: "Rest grilled meat before serving.", category: "Protein", icon: "⏳" },

  // ===== Quick Hacks =====
  { id: 41, text: "Add lemon juice at the end to brighten dishes.", category: "Quick Hacks", icon: "🍋" },
  { id: 42, text: "Fix excess salt by adding potato or cream.", category: "Quick Hacks", icon: "🥔" },
  { id: 43, text: "Soak onions to reduce bitterness.", category: "Quick Hacks", icon: "🧅" },
  { id: 44, text: "Clean as you cook to save time.", category: "Quick Hacks", icon: "🧽" },
  { id: 45, text: "Use ice water to keep veggies crisp.", category: "Quick Hacks", icon: "🧊" },
  { id: 46, text: "Add sugar to balance acidity.", category: "Quick Hacks", icon: "🍬" },
  { id: 47, text: "Use leftover rice for fried rice.", category: "Quick Hacks", icon: "🍚" },
  { id: 48, text: "Microwave lemons for more juice.", category: "Quick Hacks", icon: "⚡" },
  { id: 49, text: "Use curd to soften spicy dishes.", category: "Quick Hacks", icon: "🥛" },
  { id: 50, text: "Keep herbs fresh in damp paper towel.", category: "Quick Hacks", icon: "🌿" },
];

  

const CATEGORIES = ["All", "Beginner", "Spices", "Technique", "Protein", "Quick Hacks"];
export default function Tips() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tipOfDay, setTipOfDay] = useState(null);
  const [savedTips, setSavedTips] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  // Tip of the Day
  useEffect(() => {
    setTipOfDay(TIPS[Math.floor(Math.random() * TIPS.length)]);
  }, []);

  // Load saved tips from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedTips")) || [];
    setSavedTips(stored);
  }, []);

  // Reset visible tips when category changes
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory]);

  const toggleSave = (tip) => {
    const exists = savedTips.find((t) => t.id === tip.id);
    const updated = exists
      ? savedTips.filter((t) => t.id !== tip.id)
      : [...savedTips, tip];

    setSavedTips(updated);
    localStorage.setItem("savedTips", JSON.stringify(updated));
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

          {/* Tip of the Day */}
          {tipOfDay && (
            <div className="tip-day">
              <h2>🌟 Tip of the Day</h2>
              <p>{tipOfDay.icon} {tipOfDay.text}</p>
            </div>
          )}

          {/* Categories */}
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

          {/* Tips Grid */}
          <div className="tips-grid">
            {visibleTips.map((tip) => {
              const isSaved = savedTips.some((t) => t.id === tip.id);

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

          {/* More Tips Button */}
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
