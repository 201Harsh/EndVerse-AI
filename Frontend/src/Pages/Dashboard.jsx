// Dashboard.js
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { FaInstagram, FaGithub, FaTimes } from "react-icons/fa";
import { UserDataContext } from "../Context/UserContext";
import Sidebar from "../Components/Sidebar";
import ChatDashboard from "../Components/ChatDashboard";
import ImageDashboard from "../Components/ImageDashboard";
import VideoDashboard from "../Components/VideoDashboard";
import CodeDashboard from "../Components/CodeDashboard";

const Dashboard = () => {
  const [showFollowPopup, setShowFollowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasUserStartedChatting, setHasUserStartedChatting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const { userChat, setuserChat } = useContext(UserDataContext);
  const userName = localStorage.getItem("name") || "EndVerse User";

  // Handle window resize and initial setup
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMenuOpen(false);
        setIsCollapsed(true);
      } else {
        setIsMenuOpen(true);
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const popupShown = localStorage.getItem("followPopupShown");
    if (!popupShown) {
      setTimeout(() => setShowFollowPopup(true), 1000);
      localStorage.setItem("followPopupShown", "true");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clearChat = () => {
    setMessages([]);
    setuserChat([]);
    setHasUserStartedChatting(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const closeFollowPopup = () => {
    setShowFollowPopup(false);
  };

  const renderActiveDashboard = () => {
    switch (activeTab) {
      case "chat":
        return (
          <ChatDashboard
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            clearChat={clearChat}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            messages={messages}
            setMessages={setMessages}
            userChat={userChat}
            setuserChat={setuserChat}
            hasUserStartedChatting={hasUserStartedChatting}
            setHasUserStartedChatting={setHasUserStartedChatting}
          />
        );
      case "image":
        return (
          <ImageDashboard
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            clearChat={clearChat}
          />
        );
      case "video":
        return (
          <VideoDashboard
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            clearChat={clearChat}
          />
        );
        case "Code":
        return (
          <CodeDashboard
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            clearChat={clearChat}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            messages={messages}
            setMessages={setMessages}
            userChat={userChat}
            setuserChat={setuserChat}
            hasUserStartedChatting={hasUserStartedChatting}
            setHasUserStartedChatting={setHasUserStartedChatting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } relative overflow-hidden flex`}
    >
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMenu}
          className={`absolute top-4 left-4 z-10 md:hidden p-2 ${
            darkMode ? "bg-gray-800/80" : "bg-white/90"
          } backdrop-blur-sm rounded-lg border ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } shadow-lg`}
          aria-label="Toggle menu"
        >
          <FiMenu
            className={`w-6 h-6 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          />
        </button>
      )}

      {/* Sidebar Menu */}
      <Sidebar
        isMobile={isMobile}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        clearChat={clearChat}
        userName={userName}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed && !isMobile ? "ml-16" : "ml-0"
        }`}
      >
        {renderActiveDashboard()}
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
              className={`relative ${
                darkMode
                  ? "bg-gray-800/95 border-gray-700"
                  : "bg-white/95 border-gray-200"
              } border rounded-xl max-w-md w-full p-6 shadow-2xl`}
            >
              <button
                onClick={closeFollowPopup}
                className={`absolute top-4 right-4 ${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-900"
                } transition`}
                aria-label="Close follow popup"
              >
                <FaTimes className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 mb-4">
                  <div
                    className={`w-full h-full rounded-full ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } overflow-hidden`}
                  >
                    <img
                      src="https://avatars.githubusercontent.com/u/160850571?v=4"
                      alt="Developer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3
                  className={`text-xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Follow the Developer
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } mb-6`}
                >
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
                    className="flex-1 flex items-center justify-center py-3 px-4 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg hover:opacity-90 transition text-white"
                  >
                    <FaInstagram className="mr-2" />
                    Instagram
                  </a>
                  <a
                    href="https://github.com/201Harsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
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
