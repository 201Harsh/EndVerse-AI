// components/ChatDashboard.js
import { useState, useEffect, useRef } from "react";
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
  FaThumbsDown,
  FaStop,
} from "react-icons/fa";
import axiosInstance from "../config/Axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  setHasUserStartedChatting,
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const userName = localStorage.getItem("name") || "EndVerse User";
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState(null);
  const [voices, setVoices] = useState([]);
  const speechSynthesis = window.speechSynthesis;
  const navigate = useNavigate();

  // Load voices when they become available
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      } else {
        speechSynthesis.onvoiceschanged = () => {
          setVoices(speechSynthesis.getVoices());
        };
      }
    };

    loadVoices();

    return () => {
      speechSynthesis.onvoiceschanged = null;
      speechSynthesis.cancel();
    };
  }, []);

  // Load saved messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chat_messages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        const messagesWithDates = parsedMessages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);

        if (messagesWithDates.length > 0) {
          setHasUserStartedChatting(true);
        }
      } catch (error) {
        console.error("Failed to parse saved messages:", error);
        localStorage.removeItem("chat_messages");
        toast.error("Failed to load chat history", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      const limitedMessages = messages.slice(-50);
      localStorage.setItem("chat_messages", JSON.stringify(limitedMessages));
    } else {
      localStorage.removeItem("chat_messages");
    }
  }, [messages]);

  // Handle incoming messages
  useEffect(() => {
    if (userChat && userChat.length > 0) {
      if (!hasUserStartedChatting) setHasUserStartedChatting(true);

      const newUserMessage = {
        id: Date.now(),
        text: userChat[userChat.length - 1],
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newUserMessage]);

      const getAIResponse = async () => {
        setIsTyping(true);
        const token = localStorage.getItem("token");
        try {
          const response = await axiosInstance.post(
            "/ai/chat",
            {
              prompt: userChat[userChat.length - 1],
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            const newBotMessage = {
              id: Date.now() + 1,
              text: response.data.answer,
              sender: "bot",
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, newBotMessage]);
          }
        } catch (error) {
          console.error("Error getting AI response:", error);
          toast.error(
            error.response?.data?.message || "Failed to get AI response",
            {
              position: "bottom-left",
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

          const fallbackMessage = {
            id: Date.now() + 1,
            text: "I'm having trouble responding right now. Please try again later.",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, fallbackMessage]);
        } finally {
          setIsTyping(false);
        }
      };

      getAIResponse();
    }
  }, [userChat, hasUserStartedChatting]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSpeak = (text, index) => {
    if (isSpeaking && currentSpeakingIndex === index) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingIndex(null);
      return;
    }

    if (isSpeaking) {
      speechSynthesis.cancel();
      setTimeout(() => speakText(text, index), 150);
    } else {
      speakText(text, index);
    }
  };

  const speakText = (text, index) => {
    let cleanedText = text.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );

    const signatureRegex =
      /\*\*\*EndVerse AI v[\d.]+ \(Powered by EndGaming AI\)\*\*\*/i;
    cleanedText = cleanedText.replace(signatureRegex, "").trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);

    if (voices.length > 0) {
      utterance.voice = voices[0];
      utterance.lang = voices[0].lang || "en-US";
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeakingIndex(index);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingIndex(null);
    };

    utterance.onerror = (event) => {
      if (event.error !== "interrupted") {
        toast.error(`Voice playback failed: ${event.error}`, {
          position: "bottom-left",
          autoClose: 3000,
          theme: "dark",
        });
      }
      setIsSpeaking(false);
      setCurrentSpeakingIndex(null);
    };

    speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      setuserChat((prev) => [...prev, message]);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isTyping) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const redirectToPage = () => {
    navigate("/examples");
  };

  const formatMessage = (text) => {
    if (!text) return "";

    const parts = text.split(
      "***EndVerse AI v2.0 (Powered by EndGaming AI)***"
    );
    const mainContent = parts[0].trim();
    const signature = parts[1]
      ? "***EndVerse AI v2.0 (Powered by EndGaming AI)***" + parts[1]
      : null;

    return (
      <div className="message-content">
        {formatTextContent(mainContent)}
        {signature && (
          <div
            className={`mt-4 pt-4 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {formatTextContent(signature)}
          </div>
        )}
      </div>
    );
  };

  const formatTextContent = (text) => {
    return text.split("\n").map((line, lineIndex) => {
      if (line.trim() === "") return null;

      const regex =
        /(<a\s+[^>]*href="[^"]*"[^>]*>.*?<\/a>|\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|".*?"|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/gu;

      const parts = line
        .split(regex)
        .filter(Boolean)
        .map((part, partIndex) => {
          const key = `${lineIndex}-${partIndex}`;

          // Handle anchor tag
          if (part.startsWith("<a ") && part.includes("</a>")) {
            const match = part.match(
              /<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/i
            );
            if (match) {
              const [, href, text] = match;
              return (
                <span
                  key={key}
                  className={`${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  } font-medium underline cursor-pointer`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(href, "_blank", "noopener,noreferrer");
                  }}
                >
                  {text}
                </span>
              );
            }
          }

          // Bold + italic (***text***)
          if (part.startsWith("***") && part.endsWith("***")) {
            return (
              <span
                key={key}
                className={`font-bold italic ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                } inline`}
              >
                {part.slice(3, -3)}
              </span>
            );
          }

          // Bold (**text**)
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <span
                key={key}
                className={`font-bold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                } inline`}
              >
                {part.slice(2, -2)}
              </span>
            );
          }

          // Italic (*text*)
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <span
                key={key}
                className={`italic ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } inline`}
              >
                {part.slice(1, -1)}
              </span>
            );
          }

          // Quoted ("text")
          if (part.startsWith('"') && part.endsWith('"')) {
            return (
              <span
                key={key}
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } italic inline`}
              >
                {part}
              </span>
            );
          }

          // Emoji handling
          const emojiRegex =
            /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
          if (emojiRegex.test(part)) {
            return <span key={key}>{part}</span>;
          }

          // Default text
          return <span key={key}>{part}</span>;
        });

      return (
        <p key={lineIndex} className="mb-2 text-sm leading-relaxed">
          {parts}
        </p>
      );
    });
  };

  if (!hasUserStartedChatting) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-4 pb-16">
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
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
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
            className={`text-xl mb-8 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
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
              className={`p-4 rounded-lg border transition transform hover:scale-[1.02] ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm"
              }`}
              onClick={redirectToPage}
            >
              <h3
                className={`font-medium mb-1 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Capabilities
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Learn what I can help with
              </p>
            </button>
            <button
              className={`p-4 rounded-lg border transition transform hover:scale-[1.02] ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm"
              }`}
              onClick={redirectToPage}
            >
              <h3
                className={`font-medium mb-1 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Examples
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                See what I can do
              </p>
            </button>
          </motion.div>
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
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <header
        className={`py-4 px-6 border-b ${
          darkMode
            ? "border-gray-700 bg-gray-800/50"
            : "border-gray-200 bg-white/50"
        } backdrop-blur-md`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl ml-10 mt-2 md:ml-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
            Chat
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition`}
            >
              <FaHistory
                className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
              />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              } transition`}
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
      <div
        className={`flex-1 ${
          darkMode ? "bg-gray-900/50" : "bg-gray-50"
        } overflow-hidden`}
      >
        {/* Messages Container */}
        <div className="flex-1 p-4 chat-box overflow-y-auto h-[calc(100vh-180px)]">
          <div className="max-w-4xl mx-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex w-full ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 min-w-20 max-w-[85%] text-sm ${
                    msg.sender === "user"
                      ? `${
                          darkMode ? "bg-indigo-600/90" : "bg-indigo-500/90"
                        } text-white rounded-br-none`
                      : `${darkMode ? "bg-gray-800/80" : "bg-white"} ${
                          darkMode ? "text-gray-100" : "text-gray-800"
                        } rounded-bl-none ${
                          darkMode ? "" : "border border-gray-200"
                        }`
                  } rounded-xl relative`}
                >
                  {formatMessage(msg.text)}
                  <div
                    className={`text-xs mt-2 flex items-center ${
                      msg.sender === "user" ? "justify-end" : "justify-between"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <button
                        onClick={() => handleSpeak(msg.text, index)}
                        className={`p-1 rounded-full ${
                          isSpeaking && currentSpeakingIndex === index
                            ? "bg-indigo-500 text-white"
                            : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-600"
                        }`}
                        aria-label={
                          isSpeaking && currentSpeakingIndex === index
                            ? "Stop speaking"
                            : "Speak"
                        }
                      >
                        {isSpeaking && currentSpeakingIndex === index ? (
                          <FaStop className="w-3 h-3" />
                        ) : (
                          <FaMicrophone className="w-3 h-3" />
                        )}
                      </button>
                    )}
                    <span
                      className={`${
                        msg.sender === "user"
                          ? darkMode
                            ? "text-indigo-200"
                            : "text-indigo-100"
                          : darkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start w-full">
                <div
                  className={`p-3 min-w-20 max-w-[85%] ${
                    darkMode ? "bg-gray-800/80" : "bg-white"
                  } ${
                    darkMode ? "" : "border border-gray-200"
                  } rounded-bl-none rounded-xl`}
                >
                  <div className="flex space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        darkMode ? "bg-gray-500" : "bg-gray-400"
                      } animate-pulse`}
                    ></div>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        darkMode ? "bg-gray-500" : "bg-gray-400"
                      } animate-pulse delay-100`}
                    ></div>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        darkMode ? "bg-gray-500" : "bg-gray-400"
                      } animate-pulse delay-200`}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div
          className={`p-4 border-t ${
            darkMode
              ? "border-gray-700 bg-gray-800/50"
              : "border-gray-200 bg-white/50"
          } backdrop-blur-md`}
        >
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="relative flex items-center">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isTyping
                    ? "EndVerse is responding..."
                    : "Message EndVerse AI..."
                }
                rows={1}
                disabled={isTyping}
                className={`w-full ${
                  darkMode
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-white text-gray-900 placeholder-gray-500"
                } border ${
                  isTyping
                    ? "border-indigo-500"
                    : darkMode
                    ? "border-gray-600"
                    : "border-gray-300"
                } rounded-full py-3 pl-5 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none max-h-32 overflow-hidden ${
                  isTyping ? "cursor-not-allowed" : ""
                }`}
                style={{ minHeight: "48px" }}
              />

              <div className="absolute right-3 flex items-center space-x-2">
                {message && !isTyping ? (
                  <button
                    type="submit"
                    className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition"
                    aria-label="Send message"
                  >
                    <FaRegPaperPlane className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isTyping}
                    className={`p-2 rounded-full ${
                      darkMode
                        ? "text-gray-400 hover:text-indigo-400"
                        : "text-gray-500 hover:text-indigo-500"
                    } transition ${
                      isTyping ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    aria-label="Voice input"
                  >
                    <FaMicrophone className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            <div
              className={`text-xs mt-2 text-center ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              EndVerse AI may produce inaccurate information about people,
              places, or facts.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
