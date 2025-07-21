// components/ChatDashboard.js
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaHistory,
  FaSun,
  FaMoon,
  FaPaperclip,
  FaMicrophone,
  FaRegPaperPlane,
  FaThumbsUp,
  FaThumbsDown
} from "react-icons/fa";

const ChatDashboard = ({ 
  darkMode, 
  toggleDarkMode, 
  clearChat, 
  isTyping, 
  setIsTyping,
  messages,
  setMessages,
  userChat,
  setuserChat,
  hasUserStartedChatting,
  setHasUserStartedChatting
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
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
      setIsTyping(true);
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
        setIsTyping(false);
      }, 1500 + Math.random() * 1000);

      return () => clearTimeout(typingTimeout);
    }
  }, [userChat, hasUserStartedChatting]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      setIsTyping(true);
      setuserChat((prev) => [...prev, message]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isTyping) {
      e.preventDefault();
      handleSubmit(e);
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
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <header className={`py-4 px-6 border-b ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'} backdrop-blur-md`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl ml-10 mt-2 md:ml-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">Chat</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition`}
            >
              <FaHistory className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition`}
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
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
                className={`text-4xl font-bold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
              >
                Hello{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 leading-tight font-bold">
                  {userName}!
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-xl mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
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
                  className={`p-4 rounded-lg border transition transform hover:scale-[1.02] ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50 shadow-sm'}`}
                  onClick={() => {
                    setuserChat(["What can you do?"]);
                  }}
                >
                  <h3 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Capabilities</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Learn what I can help with
                  </p>
                </button>
                <button
                  className={`p-4 rounded-lg border transition transform hover:scale-[1.02] ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50 shadow-sm'}`}
                  onClick={() => {
                    setuserChat(["Give me some examples"]);
                  }}
                >
                  <h3 className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Examples</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>See what I can do</p>
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
          <div className={`flex-1 flex flex-col ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} overflow-hidden`}>
            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="max-w-4xl mx-auto space-y-6">
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
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                          <FaRobot className={`w-5 h-5 ${darkMode ? 'text-gray-200' : 'text-gray-600'}`} />
                        </div>
                      )}
                      <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className={`p-4 rounded-xl relative ${
                          message.sender === "user"
                            ? `${darkMode ? 'bg-indigo-600/90' : 'bg-indigo-500/90'} rounded-br-none text-white`
                            : `${darkMode ? 'bg-gray-800/80' : 'bg-white'} ${darkMode ? 'rounded-bl-none' : 'rounded-bl-none border border-gray-200'}`
                        }`}
                      >
                        <p className={message.sender === "user" ? "text-white" : darkMode ? "text-gray-100" : "text-gray-800"}>
                          {message.text}
                        </p>
                        <div className={`text-xs mt-2 flex items-center ${message.sender === 'user' ? 'justify-end' : 'justify-between'}`}>
                          {message.sender === 'bot' && (
                            <div className="flex space-x-2">
                              <button className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                <FaThumbsUp className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              </button>
                              <button className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                <FaThumbsDown className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              </button>
                            </div>
                          )}
                          <span className={`${message.sender === 'user' ? darkMode ? 'text-indigo-200' : 'text-indigo-100' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex max-w-[85%]">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                        <FaRobot className={`w-5 h-5 ${darkMode ? 'text-gray-200' : 'text-gray-600'}`} />
                      </div>
                      <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800/80' : 'bg-white border border-gray-200'} rounded-bl-none`}>
                        <div className="flex space-x-2">
                          <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-pulse`}></div>
                          <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-pulse delay-100`}></div>
                          <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-gray-400'} animate-pulse delay-200`}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'} backdrop-blur-md`}>
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="relative flex items-center">
                  {/* File attachment button */}
                  {/* <button
                    type="button"
                    onClick={triggerFileInput}
                    disabled={isTyping}
                    className={`absolute left-3 ${darkMode ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-500 hover:text-indigo-500'} transition ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label="Attach file"
                  >
                    <FaPaperclip className="w-5 h-5" />
                  </button> */}

                  {/* <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  /> */}

                  {/* Text input */}
                  <textarea
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isTyping ? "EndVerse is responding..." : "Message EndVerse AI..."}
                    rows={1}
                    disabled={isTyping}
                    className={`w-full ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'} border ${
                      isTyping ? 'border-indigo-500' : darkMode ? 'border-gray-600' : 'border-gray-300'
                    } rounded-full py-3 pl-5 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none max-h-32 overflow-hidden ${isTyping ? 'cursor-not-allowed' : ''}`}
                    style={{ minHeight: '48px' }}
                  />

                  {/* Action buttons */}
                  <div className="absolute right-3 flex items-center space-x-2">
                    {message && !isTyping ? (
                      <motion.button
                        type="submit"
                        className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition"
                        whileTap={{ scale: 0.95 }}
                        aria-label="Send message"
                      >
                        <FaRegPaperPlane className="w-5 h-5" />
                      </motion.button>
                    ) : (
                      <button
                        type="button"
                        disabled={isTyping}
                        className={`p-2 rounded-full ${darkMode ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-500 hover:text-indigo-500'} transition ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label="Voice input"
                      >
                        <FaMicrophone className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  EndVerse AI may produce inaccurate information about people, places, or facts.
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatDashboard;