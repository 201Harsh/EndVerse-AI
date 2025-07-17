import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/Axios";
import { toast, Bounce } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/users/login", formData);

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("email", response.data.user.email);
        Navigate("/dashboard");
      }
    } catch (error) {
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
              theme: "dark",
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
          theme: "dark",
          transition: Bounce,
        }
      );
    }
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
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Sign in to your EndVerse AI account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoFocus
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
                placeholder="Enter your password"
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <a
              href="#forgot-password"
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
          >
            Login
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Create one
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
