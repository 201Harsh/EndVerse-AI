import React, { useState, useEffect, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaInstagram,
  FaGithub,
  FaTimes,
  FaHistory,
  FaImage,
  FaVideo,
  FaUserCircle,
  FaCog,
  FaChevronRight,
  FaChevronLeft,
  FaPaperclip,
  FaMicrophone,
  FaRegPaperPlane,
  FaBars,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";

const Dashboard = () => {
  const [showFollowPopup, setShowFollowPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [messages, setMessages] = useState([]);
  const [hasUserStartedChatting, setHasUserStartedChatting] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const { userChat, setuserChat } = useContext(UserDataContext);

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
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const popupShown = localStorage.getItem("followPopupShown");
    if (!popupShown) {
      setTimeout(() => setShowFollowPopup(true), 1500);
      localStorage.setItem("followPopupShown", "true");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userName = localStorage.getItem("name") || "EndVerse User";

  // Handle incoming messages
  useEffect(() => {
    if (userChat && userChat.length > 0) {
      if (!hasUserStartedChatting) setHasUserStartedChatting(true);

      // Add user message
      const newUserMessage = {
        id: Date.now(),
        text: userChat[userChat.length - 1],
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newUserMessage]);

      // Simulate bot typing indicator
      const typingTimeout = setTimeout(() => {
        const botResponses = [
          "I understand your question about '" +
            userChat[userChat.length - 1] +
            "'. Let me help with that.",
          "That's an interesting point about '" +
            userChat[userChat.length - 1] +
            "'. Here's what I think...",
          "Thanks for sharing that! Regarding '" +
            userChat[userChat.length - 1] +
            "', here's my response.",
          "I've processed your input about '" +
            userChat[userChat.length - 1] +
            "'. Here's the information you need.",
        ];

        const randomResponse =
          botResponses[Math.floor(Math.random() * botResponses.length)];

        const newBotMessage = {
          id: Date.now() + 1,
          text: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newBotMessage]);
      }, 1000);

      return () => clearTimeout(typingTimeout);
    }
  }, [userChat, hasUserStartedChatting]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const closeFollowPopup = () => {
    setShowFollowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setIsTyping(true);
      setuserChat((prev) => [...prev, message]);
      setMessage("");

      // Simulate typing completion
      setTimeout(() => setIsTyping(false), 1500);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      // Handle file upload logic here
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden flex">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-40 md:hidden p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg"
          aria-label="Toggle menu"
        >
          <FiMenu className="w-6 h-6 text-gray-200" />
        </button>
      )}

      {/* Sidebar Menu */}
      <AnimatePresence>
        {(!isMobile || isMenuOpen) && (
          <motion.div
            initial={{ x: isMobile ? "-100%" : 0 }}
            animate={{
              x: isMobile ? (isMenuOpen ? 0 : "-100%") : 0,
            }}
            exit={{ x: isMobile ? "-100%" : 0 }}
            transition={{ type: "tween", ease: "easeInOut" }}
            className={`fixed md:relative inset-y-0 left-0 ${
              isCollapsed ? "w-16" : "w-64"
            } bg-gray-800/95 md:bg-gray-800/50 backdrop-blur-md z-50 md:z-10 shadow-2xl border-r border-gray-700 transition-all duration-300`}
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                {!isCollapsed && (
                  <div className="flex items-center">
                    <FaRobot className="w-8 h-8 text-indigo-400" />
                    <h1 className="ml-2 text-xl font-bold">EndVerse</h1>
                  </div>
                )}

                {isMobile ? (
                  <button
                    onClick={toggleMenu}
                    className="text-gray-300 hover:text-white p-1"
                    aria-label="Close menu"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={toggleCollapse}
                    className="text-gray-300 hover:text-white p-1"
                    aria-label="Toggle sidebar"
                  >
                    {isCollapsed ? (
                      <FaChevronRight className="w-5 h-5" />
                    ) : (
                      <FaChevronLeft className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>

              <div className="flex-1 mt-16 flex flex-col justify-center items-center">
                <button
                  onClick={clearChat}
                  className={`flex items-center justify-center ${
                    isCollapsed ? "w-12 px-0" : "w-full px-6"
                  } py-3 mb-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all`}
                >
                  <FaRobot className={isCollapsed ? "mx-auto" : "mr-2"} />
                  {!isCollapsed && "New Chat"}
                </button>

                <button
                  className={`flex items-center justify-center ${
                    isCollapsed ? "w-12 px-0" : "w-full px-6"
                  } py-3 mb-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all`}
                >
                  <FaHistory className={isCollapsed ? "mx-auto" : "mr-2"} />
                  {!isCollapsed && "History"}
                </button>

                {!isCollapsed && (
                  <h4 className="mt-4 mb-3 text-sm font-semibold mr-24 text-gray-300">
                    More AI Tools 👇
                  </h4>
                )}

                <button
                  className={`flex items-center justify-center ${
                    isCollapsed ? "w-12 px-0" : "w-full px-6"
                  } py-3 mb-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all`}
                >
                  <FaImage className={isCollapsed ? "mx-auto" : "mr-2"} />
                  {!isCollapsed && "Generate Image"}
                </button>

                <button
                  className={`flex items-center justify-center ${
                    isCollapsed ? "w-12 px-0" : "w-full px-6"
                  } py-3 mb-4 bg-blue-800 hover:bg-blue-700 rounded-lg transition-all`}
                >
                  <FaVideo className={isCollapsed ? "mx-auto" : "mr-2"} />
                  {!isCollapsed && "Generate Video"}
                </button>

                <button
                  className={`flex items-center justify-center ${
                    isCollapsed ? "w-12 px-0" : "w-full px-6"
                  } py-3 mb-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all mt-auto`}
                >
                  <FaCog className={isCollapsed ? "mx-auto" : "mr-2"} />
                  {!isCollapsed && "Settings"}
                </button>
              </div>

              <div className="mt-auto pb-4">
                <Link
                  to="/profile"
                  className={`flex items-center justify-center ${
                    isCollapsed
                      ? "w-10 px-0 bg-transparent"
                      : "w-full px-4 bg-gray-800 hover:bg-gray-700"
                  } py-2 text-gray-300 hover:text-white rounded-lg transition-all mt-auto`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden mr-2">
                    <FaUserCircle className="w-full h-full bg-gray-900" />
                  </div>
                  {!isCollapsed && <span>My Profile</span>}
                </Link>
                {!isCollapsed && (
                  <div className="text-center text-xs text-gray-500 mt-2">
                    EndVerse AI v2.0
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed && !isMobile ? "ml-16" : "ml-0"
        }`}
      >
        <div className="container mx-auto px-4 py-8 h-full flex flex-col">
          {/* Chat Area */}
          <main className="flex-1 flex flex-col">
            {!hasUserStartedChatting ? (
              // Initial Welcome Screen
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-md w-full"
                >
                  <div className="flex justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center"
                    >
                      <FaRobot className="w-12 h-12 text-indigo-200" />
                    </motion.div>
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold text-gray-200 mb-4"
                  >
                    Hello{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-400 to-sky-500 font-bold">
                      {userName}!
                    </span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-400 mb-8"
                  >
                    How can I help you today?
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <button
                      className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition transform hover:scale-[1.02]"
                      onClick={() => {
                        setuserChat(["What can you do?"]);
                      }}
                    >
                      <h3 className="font-medium mb-1">Capabilities</h3>
                      <p className="text-sm text-gray-400">
                        Learn what I can help with
                      </p>
                    </button>
                    <button
                      className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition transform hover:scale-[1.02]"
                      onClick={() => {
                        setuserChat(["Give me some examples"]);
                      }}
                    >
                      <h3 className="font-medium mb-1">Examples</h3>
                      <p className="text-sm text-gray-400">See what I can do</p>
                    </button>
                  </motion.div>
                  {/* Start Chatting Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8"
                  >
                    <button
                      onClick={() => setHasUserStartedChatting(true)}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-indigo-500/20"
                    >
                      Start Chatting
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            ) : (
              // Chat Interface
              <div className="flex-1 flex flex-col bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex max-w-[90%] md:max-w-[85%] ${
                            message.sender === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          {message.sender === "bot" && (
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                              <FaRobot className="w-5 h-5 text-gray-200" />
                            </div>
                          )}
                          <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className={`p-3 rounded-xl ${
                              message.sender === "user"
                                ? "bg-indigo-600/80 rounded-br-none"
                                : "bg-gray-700/80 rounded-bl-none"
                            }`}
                          >
                            <p className="text-white">{message.text}</p>
                            <div className="text-xs mt-1 opacity-70 text-right">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-700">
                  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="relative flex items-center">
                      {/* File attachment button */}
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className={`absolute left-3 md:block hidden text-gray-400 hover:text-indigo-400 transition ${
                          isMobile && message ? "hidden" : "block"
                        }`}
                        aria-label="Attach file"
                      >
                        <FaPaperclip className="w-5 h-5" />
                      </button>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                      />

...
                      {/* Text input */}
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message EndVerse AI..."
                        className={`w-full bg-gray-700 border ${
                          isTyping ? "border-indigo-500" : "border-gray-600"
                        } rounded-full py-3 ${
                          isMobile ? "pl-4 pr-12" : "pl-10 pr-16"
                        } text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                      />

                      {/* Action buttons */}
                      <div className="absolute right-3 flex items-center space-x-2">
                        {isMobile && !message && (
                          <button
                            type="button"
                            onClick={triggerFileInput}
                            className="text-gray-400 hover:text-indigo-400 transition"
                            aria-label="Attach file"
                          >
                            <FaPaperclip className="w-5 h-5" />
                          </button>
                        )}

                        <button
                          type="button"
                          className="text-gray-400 hover:text-indigo-400 transition"
                          aria-label="Voice input"
                        >
                          <FaMicrophone className="w-5 h-5" />
                        </button>

                        <motion.button
                          type="submit"
                          disabled={!message.trim()}
                          className={`p-2 rounded-full ${
                            message.trim()
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                              : "bg-gray-600 text-gray-400 cursor-not-allowed"
                          } transition`}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Send message"
                        >
                          <FaRegPaperPlane className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-indigo-400 mt-1 ml-4"
                      >
                        EndVerse AI is typing...
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            )}
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
