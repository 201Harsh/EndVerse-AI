import React from "react";
import Welcome from "../Pages/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import OTPVerification from "../Pages/OTPVerification";
import Dashboard from "../Pages/Dashboard";
import ProfilePage from "../Pages/ProfilePage";
import ExamplePage from "../Pages/ExamplePage";
import DashboardProtector from "../Pages/DashboardProtector";
import AutoRedirector from "../Utils/AutoRedirector";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AutoRedirector />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<OTPVerification />} />
        <Route
          path="/dashboard"
          element={
            <DashboardProtector>
              <Dashboard />
            </DashboardProtector>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/examples" element={<ExamplePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
