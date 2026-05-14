import React, { useEffect } from "react";

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
import ManageMessages from "./components/admin/ManageMessages";
import AdminForgotPassword from "./components/admin/AdminForgotPassword";
import ShortsAdmin from "./components/admin/ShortsAdmin";
import LikesAdmin from "./components/admin/LikesAdmin";
import EditRecipe from "./components/admin/EditRecipe";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminLogin from "./components/AdminLogin";
import ForgotPassword from "./components/ForgotPassword";

// 🔥 PREMIUM
import PremiumDashboard from "./components/premiumUser/PremiumDashboard";
import PremiumUpgrade from "./components/PremiumUpgrade";
import PremiumShorts from "./components/premiumUser/PremiumShorts";
import PremiumMessages from "./components/premiumUser/PremiumMessages";

// 👉 FREE DASHBOARD
import Dashboard from "./components/Dashboard";

// 🔥 ADMIN EXTRA PAGES
import Analytics from "./components/admin/Analytics";
import Notifications from "./components/admin/Notifications";
import Settings from "./components/admin/Settings";
import AdminBMI from "./components/AdminBMI";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ManageCommunity from "./components/admin/ManageCommunity";

// ✅ NEW PAGES
import BMI from "./components/BMI";
import Water from "./components/Water";
import ShortVideos from "./components/ShortVideos";
import Community from "./components/Community";
import AdminWater from "./components/AdminWater";
import Upload from "./components/Upload";
// 🔥 GLOBAL CSS
import "./App.css";

/* ✅ Navbar only on Home page */
function Layout() {

  const location = useLocation();

  // ✅ only home page navbar
  const showNavbar = location.pathname === "/";

  return (
    <>
      {/* ✅ Navbar only homepage */}
      {showNavbar && <Navbar />}

      <Routes>

        {/* ========================= */}
        {/* 🌍 PUBLIC ROUTES */}
        {/* ========================= */}

        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/tips" element={<Tips />} />

        <Route path="/search" element={<SearchRecipes />} />

        {/* ✅ FIXED ROUTE */}
        <Route
          path="/recipes"
          element={
            <ProtectedRoute>
              <SearchRecipes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/community"
          element={<ManageCommunity />}
        />

        <Route
          path="/premium-upgrade"
          element={<PremiumUpgrade />}
        />

        <Route
          path="/admin-forgot-password"
          element={<AdminForgotPassword />}
        />

        {/* ✅ NEW FEATURE ROUTES */}

        <Route path="/bmi" element={<BMI />} />

        <Route path="/water" element={<Water />} />

        <Route path="/shorts" element={<ShortVideos />} />

        <Route path="/community" element={<Community />} />
<Route
  path="/upload-recipe"
  element={
    <ProtectedRoute>
      <Upload />
    </ProtectedRoute>
  }
/>
        {/* ========================= */}
        {/* 📊 ADMIN EXTRA */}
        {/* ========================= */}

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute adminOnly={true}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-water"
          element={<AdminWater />}
        />

        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute adminOnly={true}>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute adminOnly={true}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* 👤 USER ROUTES */}
        {/* ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

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

        {/* ========================= */}
        {/* 💎 PREMIUM ROUTES */}
        {/* ========================= */}

        <Route
          path="/premium-dashboard"
          element={
            <ProtectedRoute premiumOnly={true}>
              <PremiumDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/premium/shorts"
          element={
            <ProtectedRoute premiumOnly={true}>
              <PremiumShorts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/premium/messages"
          element={
            <ProtectedRoute premiumOnly={true}>
              <PremiumMessages />
            </ProtectedRoute>
          }
        />
<Route
  path="/premium/community"
  element={
    <ProtectedRoute premiumOnly={true}>
      <Community />
    </ProtectedRoute>
  }
/>

<Route
  path="/premium/bmi"
  element={
    <ProtectedRoute premiumOnly={true}>
      <BMI />
    </ProtectedRoute>
  }
/>

<Route
  path="/premium/water"
  element={
    <ProtectedRoute premiumOnly={true}>
      <Water />
    </ProtectedRoute>
  }
/>

<Route
  path="/premium/settings"
  element={
    <ProtectedRoute premiumOnly={true}>
      <Settings />
    </ProtectedRoute>
  }
/>
        {/* ========================= */}
        {/* 🔥 ADMIN ROUTES */}
        {/* ========================= */}

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
          path="/admin/edit-recipe/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditRecipe />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/manage-comments"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManageComments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute adminOnly={true}>
              <ManageMessages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/shorts"
          element={
            <ProtectedRoute adminOnly={true}>
              <ShortsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-bmi"
          element={
            <AdminProtectedRoute>
              <AdminBMI />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/likes"
          element={
            <ProtectedRoute adminOnly={true}>
              <LikesAdmin />
            </ProtectedRoute>
          }
        />

        {/* ✅ 404 PAGE */}
        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", marginTop: "50px" }}>
              404 Page Not Found
            </h1>
          }
        />

      </Routes>
    </>
  );
}

function App() {

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme") || "light";

    document.body.classList.remove("dark-mode");
    document.body.classList.remove("light-mode");

    document.body.classList.add(
      savedTheme === "dark"
        ? "dark-mode"
        : "light-mode"
    );

  }, []);

  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;