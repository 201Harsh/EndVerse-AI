import React from "react";
import Welcome from "../Pages/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import OTPVerification from "../Pages/OTPVerification";
import Dashboard from "../Pages/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<OTPVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
