import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Signup from "./components/signup";
import Contact from "./components/contact";
import Tips from "./components/tips";
import MyRecipes from "./components/MyRecipes";
import RecipeDetail from "./components/RecipeDetail";
import SearchRecipes from "./components/SearchRecipes";
import Login from "./components/login";
import Profile from "./components/Profile";
import Favorites from "./components/Favorites";


import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";   // ⭐ NEW NAVBAR COMPONENT

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* ⭐ अब Navbar useContext safely चला सकता है */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/search" element={<SearchRecipes />} />
          <Route path="/myrecipes" element={<MyRecipes />} />
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route path="/favorites" element={<Favorites />} />

          <Route
            path="/recipes/:id"
            element={
              <ProtectedRoute>
                <RecipeDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
