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

import AddRecipe from "./components/admin/AddRecipe";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageRecipes from "./components/admin/ManageRecipes";
import ManageUsers from "./components/admin/ManageUsers";
import ManageComments from "./components/admin/ManageComments";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminLogin from "./components/AdminLogin";
import ForgotPassword from "./components/ForgotPassword";
import AdminForgotPassword from "./components/admin/AdminForgotPassword";
import PremiumDashboard from "./components/premiumUser/PremiumDashboard";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>

          {/* Normal Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/search" element={<SearchRecipes />} />
          <Route path="/myrecipes" element={<MyRecipes />} />
          <Route path="/favorites" element={<Favorites />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/dashboard" element={<PremiumDashboard />} />
<Route
 path="/admin-forgot-password"
 element={<AdminForgotPassword />}
/>
          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recipes/:id"
            element={
              <ProtectedRoute>
                <RecipeDetail />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Add Recipe */}
          <Route
            path="/admin/add-recipe"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddRecipe />
              </ProtectedRoute>
            }
          />

          {/* Manage Recipes */}
          <Route
            path="/admin/manage-recipes"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageRecipes />
              </ProtectedRoute>
            }
          />

          {/* Manage Users */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          {/* Manage Comments */}
          <Route
            path="/admin/comments"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageComments />
              </ProtectedRoute>
            }
          />
<Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;