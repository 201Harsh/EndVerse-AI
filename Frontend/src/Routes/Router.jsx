import React from "react";
import Welcome from "../Pages/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import OTPVerification from "../Pages/OTPVerification";
import Dashboard from "../Pages/Dashboard";
import ProfilePage from "../Pages/ProfilePage";
import ExamplePage from "../Pages/ExamplePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<OTPVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/examples" element={<ExamplePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
