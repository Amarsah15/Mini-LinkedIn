import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/common/Header";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PostsPage from "./pages/PostsPage";
import NotFoundPage from "./pages/NotFoundPage";

import { useAuthStore } from "./store/authStore";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Help from "./pages/Help";

function App() {
  const navigate = useNavigate();
  // Utility function
  function areCookiesEnabled() {
    document.cookie = "testcookie=1";
    const cookiesEnabled = document.cookie.indexOf("testcookie") !== -1;
    return cookiesEnabled;
  }

  useEffect(() => {
    if (!areCookiesEnabled()) {
      alert(
        "Cookies are disabled in your browser. Please enable cookies to continue."
      );
      navigate("/help");
    }
  }, []);

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: "#363636", color: "#fff" },
          success: { duration: 3000, theme: { primary: "#0077B5" } },
        }}
      />

      <Header />

      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!authUser ? <RegisterPage /> : <Navigate to={"/"} />}
        />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
        <Route
          index
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/posts"
          element={authUser ? <PostsPage /> : <Navigate to={"/login"} />}
        />

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </div>
  );
}

export default App;
