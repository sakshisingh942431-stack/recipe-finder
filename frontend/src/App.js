import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
import ManageMessages from "./components/admin/ManageMessages";

// 🔥 IMPORTANT
import PremiumDashboard from "./components/premiumUser/PremiumDashboard";
import PremiumUpgrade from "./components/PremiumUpgrade";

// 👉 NEW (free dashboard)
import Dashboard from "./components/Dashboard";

/* ✅ Navbar hide logic component */
function Layout() {
  const location = useLocation();

  return (
    <>
      {/* ❌ Admin pages पर Navbar hide */}
      {!location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/search" element={<SearchRecipes />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/premium-upgrade" element={<PremiumUpgrade />} />

        {/* Messages */}
        <Route path="/admin/messages" element={<ManageMessages />} />

        <Route
          path="/admin-forgot-password"
          element={<AdminForgotPassword />}
        />

        {/* FREE DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PREMIUM */}
        <Route
          path="/premium-dashboard"
          element={
            <ProtectedRoute premiumOnly={true}>
              <PremiumDashboard />
            </ProtectedRoute>
          }
        />

        {/* बाकी */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myrecipes"
          element={
            <ProtectedRoute>
              <MyRecipes />
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

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-recipe"
          element={
            <ProtectedRoute adminOnly={true}>
              <AddRecipe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-recipes"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManageRecipes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/comments"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManageComments />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;