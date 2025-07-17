import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/Axios";
import { Bounce, toast } from "react-toastify";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activeInput, setActiveInput] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);

  const Navigate = useNavigate();

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character entered
    setOtp(newOtp);

    // Auto-focus next input if a digit was entered
    if (value && index < 3) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1].focus();
    }

    // Auto-submit if all digits are entered
    // if (newOtp.every((digit) => digit !== "") && index === 3) {
    //   handleSubmit();
    // }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 4);
    if (/^\d{4}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      setActiveInput(Math.min(3, newOtp.length - 1));

    //   // Auto-submit if all digits are pasted
    //   if (newOtp.length === 4) {
    //     handleSubmit();
    //   }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const otpCode = otp.join("");
    const Useremail = localStorage.getItem("email");

    try {
      const res = await axiosInstance.post("/users/verify-email", {
        email: Useremail,
        otp: otpCode,
      });

      if (res.status === 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setIsSubmitting(false);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem('name', res.data.user.name);
        Navigate("/dashboard");
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(
        error.response.data.message ||
          error.response.data.errors.forEach((element) => {
            toast.error(element.msg, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }),
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
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
        <Link
          to="/register"
          className="flex items-center text-gray-400 hover:text-gray-300 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </Link>

        <div className="flex flex-col items-center mb-8">
          <FaRobot className="w-12 h-12 text-indigo-400 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Verify Your Account
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base text-center">
            We've sent a 4-digit code to your email
          </p>
        </div>

        <form className="space-y-6">
          <div className="flex justify-center space-x-3 sm:space-x-4">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                onFocus={() => setActiveInput(index)}
                className={`w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-3xl text-center bg-gray-700/50 border ${
                  activeInput === index
                    ? "border-indigo-500"
                    : "border-gray-600"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                disabled={isSubmitting}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={otp.some((digit) => digit === "") || isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
              otp.some((digit) => digit === "") || isSubmitting
                ? "bg-indigo-600/50 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? (
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
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Didn't receive code?{" "}
          <button className="text-indigo-400 hover:text-indigo-300 font-medium">
            Resend OTP
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
