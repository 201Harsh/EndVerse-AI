import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaInstagram,
  FaGithub,
  FaTimes,
  FaBars,
  FaUser,
} from "react-icons/fa";
import { FiX, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [showFollowPopup, setShowFollowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, menu is always open
      if (!mobile) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Check if popup has been shown before
    const popupShown = localStorage.getItem("followPopupShown");
    if (!popupShown) {
      setShowFollowPopup(true);
      localStorage.setItem("followPopupShown", "true");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeFollowPopup = () => {
    setShowFollowPopup(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden flex">
      {/* Sliding Sidebar Menu - Now on left side */}
      {(!isMobile || isMenuOpen) && (
        <motion.div
          initial={{ x: isMobile ? "-100%" : 0 }}
          animate={{ x: 0 }}
          exit={{ x: isMobile ? "-100%" : 0 }}
          transition={{ type: "tween", ease: "easeInOut" }}
          className={`fixed md:relative inset-y-0 left-0 w-64 bg-gray-800/95 md:bg-gray-800/50 backdrop-blur-md z-50 md:z-0 shadow-2xl border-r border-gray-700`}
        >
          <div className="p-4 h-full flex flex-col">
            {isMobile && (
              <div className="flex justify-end">
                <button
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-white p-2"
                  aria-label="Close menu"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-center items-center">
              <button className="flex items-center justify-center w-full py-3 px-6 mb-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all">
                <FaRobot className="mr-2" />
                New Chat
              </button>
            </div>

            {/* Profile Section at bottom */}
            <div className="mt-auto pb-4">
              <Link
                to="/profile"
                className="flex items-center justify-center w-full py-2 px-4 text-gray-300 hover:text-white rounded-lg transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden mr-2">
                  <img
                    src="https://avatars.githubusercontent.com/u/160850571?v=4"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>My Profile</span>
              </Link>
              <div className="text-center text-xs text-gray-500 mt-2">
                EndVerse AI v2.0
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Dashboard Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <FaRobot className="w-8 h-8 text-indigo-400" />
              <h1 className="ml-2 text-2xl font-bold">EndVerse AI</h1>
            </div>

            {/* Mobile Menu Button - Only shows on mobile */}
            {isMobile && (
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-300 hover:text-white p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            )}
          </header>

          {/* Main Content */}
          <main className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to Your Dashboard
            </h2>
            <p className="text-gray-400">
              Explore the power of EndVerse AI with our advanced features and
              tools.
            </p>
          </main>
        </div>
      </div>

      {/* Follow Popup */}
      <AnimatePresence>
        {showFollowPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-gray-800/95 border border-gray-700 rounded-xl max-w-md w-full p-6 shadow-2xl"
            >
              <button
                onClick={closeFollowPopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                aria-label="Close follow popup"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                    <img
                      src="https://avatars.githubusercontent.com/u/160850571?v=4"
                      alt="Developer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">Follow the Developer</h3>
                <p className="text-gray-400 mb-6">
                  Stay updated with the latest from{" "}
                  <span className="font-semibold text-indigo-400">
                    EndGaming AI
                  </span>
                </p>

                <div className="flex space-x-4 w-full">
                  <a
                    href="https://www.instagram.com/201harshs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center py-3 px-4 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg hover:opacity-90 transition"
                  >
                    <FaInstagram className="mr-2" />
                    Instagram
                  </a>
                  <a
                    href="https://github.com/201Harsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
