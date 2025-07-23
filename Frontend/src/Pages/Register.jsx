import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff, FiCheck, FiX, FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import axiosInstance from "../config/Axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [isLoading, setisLoading] = useState(false);

  const Navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Apply theme to toast notifications
    toast.dark = darkMode;
  }, [darkMode]);

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
    setisLoading(true);

    try {
      const response = await axiosInstance.post("/users/register", formData);

      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
          transition: Bounce,
        });
        Navigate("/verify");
        localStorage.setItem("email", response.data.tempUser.email);
        setFormData({ name: "", email: "", password: "" });
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);

      toast.error(
        error.response.data.message ||
          error.response.data.errors.forEach((element) => {
            toast.error(element.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: darkMode ? "dark" : "light",
              transition: Bounce,
            });
          }),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
          transition: Bounce,
        }
      );
    }
  };

  const calculateStrengthPercentage = () => {
    const totalCriteria = 5;
    const metCriteria = Object.values(passwordStrength).filter(Boolean).length;
    return (metCriteria / totalCriteria) * 100;
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header with theme toggle */}
      <header
        className={`p-4 border-b ${
          darkMode
            ? "border-gray-800 bg-gray-900/50"
            : "border-gray-200 bg-white/50"
        } backdrop-blur-md flex justify-between items-center`}
      >
        <div className="flex items-center space-x-2">
          <FaRobot className="text-indigo-500 text-xl" />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            EndVerse AI
          </h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
          }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <FiSun className="text-yellow-400" />
          ) : (
            <FiMoon className="text-gray-700" />
          )}
        </button>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-md rounded-xl border ${
            darkMode
              ? "bg-gray-800/50 border-gray-700"
              : "bg-white border-gray-200"
          } p-6 sm:p-8`}
        >
          <div className="flex flex-col items-center mb-8">
            <FaRobot
              className={`w-12 h-12 ${
                darkMode ? "text-indigo-400" : "text-indigo-500"
              } mb-4`}
            />
            <h1
              className={`text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r ${
                darkMode
                  ? "from-indigo-400 to-purple-500"
                  : "from-indigo-500 to-purple-600"
              }`}
            >
              Create Your Account
            </h1>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-500"
              } mt-2 text-sm sm:text-base`}
            >
              Join EndVerse AI today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 text-gray-100"
                    : "bg-gray-100 border-gray-300 text-gray-900"
                } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 text-gray-100"
                    : "bg-gray-100 border-gray-300 text-gray-900"
                } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
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
                  className={`w-full ${
                    darkMode
                      ? "bg-gray-700/50 border-gray-600 text-gray-100"
                      : "bg-gray-100 border-gray-300 text-gray-900"
                  } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
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
                <div
                  className={`h-1.5 ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  } rounded-full overflow-hidden`}
                >
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
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center">
                    {passwordStrength.uppercase ? (
                      <FiCheck className="text-green-500 mr-2" />
                    ) : (
                      <FiX className="text-red-500 mr-2" />
                    )}
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      At least one uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center">
                    {passwordStrength.lowercase ? (
                      <FiCheck className="text-green-500 mr-2" />
                    ) : (
                      <FiX className="text-red-500 mr-2" />
                    )}
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      At least one lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center">
                    {passwordStrength.number ? (
                      <FiCheck className="text-green-500 mr-2" />
                    ) : (
                      <FiX className="text-red-500 mr-2" />
                    )}
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      At least one number
                    </span>
                  </div>
                  <div className="flex items-center">
                    {passwordStrength.specialChar ? (
                      <FiCheck className="text-green-500 mr-2" />
                    ) : (
                      <FiX className="text-red-500 mr-2" />
                    )}
                    <span
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
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
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <div
            className={`mt-6 text-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
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
    </div>
  );
};

export default Register;
