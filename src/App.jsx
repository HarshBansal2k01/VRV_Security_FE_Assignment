import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionManagement from "./components/PermissionManagement";
import { useAuth0 } from "@auth0/auth0-react"; 
import MoonLoader from "react-spinners/MoonLoader";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } =
    useAuth0();
  const [loading, setLoading] = useState(false);

  // Show spinner when login/logout is triggered
  const handleLogin = async () => {
    setLoading(true);
    await loginWithRedirect();
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true); // Show spinner immediately
    await logout({ returnTo: window.location.origin });

    toast.success("Logged out successfully");
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success("Logged in successfully!");
    }
  }, [isAuthenticated, user]);
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  return (
    <>
      <Navbar
        onLogin={handleLogin}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        user={user}
      />
      {isAuthenticated && (
        <Routes>
          <Route path="/" element={<UserManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/role" element={<RoleManagement />} />
          <Route path="/permission" element={<PermissionManagement />} />
        </Routes>
      )}
    </>
  );
}

export default App;
