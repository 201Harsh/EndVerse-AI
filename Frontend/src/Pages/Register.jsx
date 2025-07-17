import React, { useState } from "react";
import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import axiosInstance from "../config/Axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axiosInstance.post("/users/register", formData);

    console.log(response);

    console.log("Registration data:", formData);
  };

  const calculateStrengthPercentage = () => {
    const totalCriteria = 5;
    const metCriteria = Object.values(passwordStrength).filter(Boolean).length;
    return (metCriteria / totalCriteria) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800/50 rounded-xl border border-gray-700 p-6 sm:p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <FaRobot className="w-12 h-12 text-indigo-400 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Create Your Account
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Join EndVerse AI today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                placeholder="Create a password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Strength Meter */}
            <div className="mt-3">
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300"
                  style={{
                    width: `${calculateStrengthPercentage()}%`,
                  }}
                ></div>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center">
                  {passwordStrength.length ? (
                    <FiCheck className="text-green-500 mr-2" />
                  ) : (
                    <FiX className="text-red-500 mr-2" />
                  )}
                  <span className="text-xs text-gray-400">
                    At least 6 characters
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordStrength.uppercase ? (
                    <FiCheck className="text-green-500 mr-2" />
                  ) : (
                    <FiX className="text-red-500 mr-2" />
                  )}
                  <span className="text-xs text-gray-400">
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordStrength.lowercase ? (
                    <FiCheck className="text-green-500 mr-2" />
                  ) : (
                    <FiX className="text-red-500 mr-2" />
                  )}
                  <span className="text-xs text-gray-400">
                    At least one lowercase letter
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordStrength.number ? (
                    <FiCheck className="text-green-500 mr-2" />
                  ) : (
                    <FiX className="text-red-500 mr-2" />
                  )}
                  <span className="text-xs text-gray-400">
                    At least one number
                  </span>
                </div>
                <div className="flex items-center">
                  {passwordStrength.specialChar ? (
                    <FiCheck className="text-green-500 mr-2" />
                  ) : (
                    <FiX className="text-red-500 mr-2" />
                  )}
                  <span className="text-xs text-gray-400">
                    At least one special character
                  </span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
          >
            Create Account
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
