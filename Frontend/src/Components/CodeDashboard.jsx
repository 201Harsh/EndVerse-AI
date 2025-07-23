import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCode,
  FiCopy,
  FiDownload,
  FiShare2,
  FiSettings,
  FiClock,
  FiTrash2,
  FiPlus,
  FiRefreshCw,
} from "react-icons/fi";
import { FaMagic, FaRobot, FaExpand } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodeDashboard = ({
  darkMode,
  toggleDarkMode,
  clearHistory,
  isCollapsed,
}) => {
  // State management
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [hasUserStarted, setHasUserStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Create refs
  const outputPanelRef = useRef(null);
  const userName = localStorage.getItem("name") || "EndVerse User";

  // Check for mobile view on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Programming languages
  const languages = [
    {
      value: "javascript",
      label: "JavaScript",
      color: "from-yellow-500 to-yellow-600",
    },
    { value: "python", label: "Python", color: "from-blue-500 to-blue-600" },
    { value: "java", label: "Java", color: "from-red-500 to-red-600" },
    { value: "csharp", label: "C#", color: "from-green-500 to-green-600" },
    { value: "php", label: "PHP", color: "from-purple-500 to-purple-600" },
    { value: "ruby", label: "Ruby", color: "from-pink-500 to-pink-600" },
    { value: "swift", label: "Swift", color: "from-amber-500 to-amber-600" },
    { value: "go", label: "Go", color: "from-teal-500 to-teal-600" },
    {
      value: "kotlin",
      label: "Kotlin",
      color: "from-orange-500 to-orange-600",
    },
    { value: "rust", label: "Rust", color: "from-lime-500 to-lime-600" },
    { value: "c", label: "C", color: "from-cyan-500 to-cyan-600" },
    { value: "cpp", label: "C++", color: "from-rose-500 to-rose-600" },
  ];

  // Sample prompts for inspiration
  const samplePrompts = [
    "A function to calculate factorial",
    "React component for a login form",
    "Python script to scrape website data",
    "Authentication middleware in Express",
    "Redux reducer for todo list",
    "A RESTful API server in C#",
  ];

  // Show welcome message initially
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasUserStarted(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Function to scroll to bottom of output panel
  const scrollToBottom = () => {
    if (outputPanelRef.current) {
      outputPanelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Mock code generation function
  const generateCode = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);

      // Generate mock code based on language
      let newCode = "";
      switch (language) {
        case "javascript":
          newCode = `// ${prompt}\nfunction solution() {\n  // Implementation here\n  return result;\n}`;
          break;
        case "python":
          newCode = `# ${prompt}\ndef solution():\n    # Implementation here\n    return result`;
          break;
        case "typescript":
          newCode = `// ${prompt}\nconst solution = (): any => {\n  // Implementation here\n  return result;\n}`;
          break;
        case "java":
          newCode = `// ${prompt}\npublic class Solution {\n  public static void main(String[] args) {\n    // Implementation here\n  }\n}`;
          break;
        case "csharp":
          newCode = `// ${prompt}\npublic class Solution {\n  public static void Main(string[] args) {\n    // Implementation here\n  }\n}`;
          break;
        case "php":
          newCode = `<?php\n// ${prompt}\nfunction solution() {\n  // Implementation here\n  return $result;\n}`;
          break;
        default:
          newCode = `// ${prompt}\n// Code generation for ${language}`;
      }

      setGeneratedCode(newCode);
      addToHistory(newCode);
      setIsGenerating(false);

      toast.success("Code generated successfully!", {
        position: isMobile ? "top-center" : "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        transition: Bounce,
      });

      // Scroll to bottom after code is generated
      setTimeout(scrollToBottom, 100);
    }, 3000);
  };

  // Add code to history
  const addToHistory = (code) => {
    const newItem = {
      id: Date.now(),
      code,
      prompt,
      language,
      timestamp: new Date().toISOString(),
    };

    setHistory((prev) => [newItem, ...prev.slice(0, 19)]);
  };

  // Remove code from history
  const removeFromHistory = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast.info("Code removed from history", {
      position: isMobile ? "top-center" : "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
      transition: Bounce,
    });
  };

  // Copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!", {
      position: isMobile ? "top-center" : "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
      transition: Bounce,
    });
  };

  // Download code
  const downloadCode = (code) => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ai-code-${Date.now()}.${language}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Code downloaded!", {
      position: isMobile ? "top-center" : "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: darkMode ? "dark" : "light",
      transition: Bounce,
    });
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!hasUserStarted) {
    return (
      <div
        className={`flex-1 flex flex-col items-center justify-center p-6 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center">
              <FiCode className="text-white text-3xl" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500"
          >
            Welcome, {userName}!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-500"
          >
            Ready to generate some AI-powered code?
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`p-4 border-b ${
          darkMode
            ? "border-gray-800 bg-gray-900/50"
            : "border-gray-200 bg-white/50"
        } backdrop-blur-md`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiCode className="text-indigo-500 text-xl" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Code Generation
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setShowHistory(!showHistory);
                if (!showHistory) {
                  setTimeout(scrollToBottom, 100);
                }
              }}
              className={`flex items-center space-x-1 p-2 rounded-lg ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <FiClock className={showHistory ? "text-indigo-500" : ""} />
              {!isMobile && <span>History</span>}
            </button>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-auto ${
          isCollapsed && !isMobile ? "ml-16" : isMobile ? "" : "ml-64"
        }`}
      >
        <div
          className={`grid ${
            isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
          } gap-4 p-4`}
        >
          {/* Generation Panel */}
          <div
            className={`rounded-xl p-4 ${isMobile ? "" : "p-6"} ${
              darkMode
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            } border`}
          >
            <h2
              className={`${
                isMobile ? "text-xl" : "text-2xl"
              } font-bold mb-4 flex items-center`}
            >
              <FiPlus className="mr-2 text-indigo-500" />
              Generate New Code
            </h2>

            {/* Prompt Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Describe what you want to code
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`w-full ${
                  isMobile ? "h-24" : "h-32"
                } p-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-100 border-gray-300"
                } border focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="A React component that displays a modal dialog..."
              />
            </div>

            {/* Language Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Programming Language
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setLanguage(lang.value)}
                    className={`py-2 px-2 rounded-lg text-xs sm:text-sm ${
                      language === lang.value
                        ? `bg-gradient-to-r ${lang.color} text-white`
                        : darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {lang.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={generateCode}
              disabled={!prompt.trim() || isGenerating}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center text-white ${
                !prompt.trim() || isGenerating
                  ? `${
                      darkMode ? "bg-gray-700" : "bg-gray-700"
                    } cursor-not-allowed`
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              }`}
            >
              {isGenerating ? (
                <>
                  <FiRefreshCw className="animate-spin mr-2" />
                  {isMobile ? `${progress}%` : `Generating (${progress}%)`}
                </>
              ) : (
                <>
                  <FaRobot className="mr-2" />
                  {isMobile ? "Generate" : "Generate Code"}
                </>
              )}
            </motion.button>

            {/* Prompt Ideas */}
            <div className="mt-4">
              <p className="text-sm mb-2">Need inspiration?</p>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((sample, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPrompt(sample)}
                    className={`px-2 py-1 text-xs rounded-full ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {sample.substring(0, isMobile ? 15 : 30)}
                    {sample.length > (isMobile ? 15 : 30) ? "..." : ""}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div
            ref={outputPanelRef}
            className={`rounded-xl overflow-hidden ${
              darkMode
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white border-gray-200"
            } border`}
          >
            <div
              className={`p-3 border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } flex justify-between items-center`}
            >
              <h2 className="font-bold flex items-center text-sm sm:text-base">
                <FiCode className="mr-2 text-indigo-500" />
                Generated Code
              </h2>
              {generatedCode && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(generatedCode)}
                    className={`p-2 rounded-lg ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <FiCopy />
                  </button>
                  <button
                    onClick={() => downloadCode(generatedCode)}
                    className={`p-2 rounded-lg ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <FiDownload />
                  </button>
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className={`p-2 rounded-lg ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <FaExpand />
                  </button>
                </div>
              )}
            </div>

            <div
              className={`${
                isMobile ? "min-h-[300px]" : "min-h-[400px]"
              } flex items-center justify-center p-4`}
            >
              {isGenerating ? (
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin"></div>
                    <div className="absolute inset-4 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin animation-delay-200"></div>
                    <div className="absolute inset-8 rounded-full border-4 border-t-pink-500 border-r-pink-500 border-b-transparent border-l-transparent animate-spin animation-delay-400"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaRobot className="text-indigo-400 text-2xl animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">
                    Generating your code
                  </h3>
                  <p className="text-sm text-gray-500">{progress}% complete</p>
                  <p className="text-xs mt-4 text-gray-500">
                    "{prompt.substring(0, isMobile ? 30 : 50)}
                    {prompt.length > (isMobile ? 30 : 50) ? "..." : ""}"
                  </p>
                </div>
              ) : generatedCode ? (
                <div className="relative group w-full h-full">
                  <pre
                    className={`w-full h-full max-h-[500px] overflow-auto p-4 rounded-lg ${
                      darkMode
                        ? "bg-gray-900 text-gray-100"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              ) : (
                <div className="text-center p-6">
                  <FiCode className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <h3 className="text-lg font-medium mb-1">
                    No Code Generated
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter a prompt and click "Generate" to create
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Panel */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-4 mx-2 sm:mx-4 rounded-xl overflow-hidden ${
                darkMode
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              } border`}
            >
              <div
                className={`p-3 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } flex justify-between items-center`}
              >
                <h2 className="font-bold flex items-center text-sm sm:text-base">
                  <FiClock className="mr-2 text-indigo-500" />
                  Generation History
                </h2>
                <div className="flex items-center space-x-2">
                  {!isMobile && history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <IoMdClose />
                  </button>
                </div>
              </div>

              <div
                className={`${
                  isMobile ? "max-h-[60vh]" : "max-h-[500px]"
                } overflow-y-auto p-2 sm:p-4`}
              >
                {history.length === 0 ? (
                  <div className="text-center p-6">
                    <FiCode className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      No generation history yet
                    </p>
                  </div>
                ) : (
                  <div
                    className={`grid ${
                      isMobile
                        ? "grid-cols-1 gap-2"
                        : "grid-cols-1 md:grid-cols-2 gap-3"
                    }`}
                  >
                    {history.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -5 }}
                        className={`rounded-lg overflow-hidden border ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        } cursor-pointer`}
                      >
                        <div className="relative">
                          <div
                            className={`p-3 ${
                              darkMode ? "bg-gray-900" : "bg-gray-50"
                            } max-h-40 overflow-hidden`}
                            onClick={() => {
                              setGeneratedCode(item.code);
                              setPrompt(item.prompt);
                              setLanguage(item.language);
                              setShowHistory(false);
                            }}
                          >
                            <pre
                              className={`text-xs overflow-x-auto ${
                                darkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              <code>
                                {item.code.substring(0, 200)}
                                {item.code.length > 200 ? "..." : ""}
                              </code>
                            </pre>
                          </div>
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2`}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromHistory(item.id);
                              }}
                              className="self-end p-1 rounded-full bg-red-500/80 hover:bg-red-600 text-white"
                            >
                              <FiTrash2 className="w-3 h-3" />
                            </button>
                            <div>
                              <p className="text-xs text-white truncate">
                                {item.prompt}
                              </p>
                              <p className="text-[10px] text-gray-300 mt-1">
                                {formatTime(item.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-xs truncate">
                            {item.prompt.substring(0, isMobile ? 15 : 30)}
                            {item.prompt.length > (isMobile ? 15 : 30)
                              ? "..."
                              : ""}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-500">
                              {item.language}
                            </span>
                            <div className="flex space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(item.code);
                                }}
                                className="text-gray-500 hover:text-indigo-500"
                              >
                                <FiCopy className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadCode(item.code);
                                }}
                                className="text-gray-500 hover:text-indigo-500"
                              >
                                <FiDownload className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative w-full max-w-4xl max-h-full">
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 rounded-full bg-gray-500 hover:bg-gray-400 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(false);
                }}
              >
                <IoMdClose className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div
                className={`rounded-lg overflow-hidden ${
                  darkMode ? "bg-gray-900" : "bg-white"
                }`}
              >
                <div
                  className={`p-3 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } flex justify-between items-center`}
                >
                  <h3 className="font-medium">{prompt}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(generatedCode)}
                      className={`p-1 rounded-lg ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <FiCopy />
                    </button>
                    <button
                      onClick={() => downloadCode(generatedCode)}
                      className={`p-1 rounded-lg ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <FiDownload />
                    </button>
                  </div>
                </div>

                <div className="max-h-[80vh] overflow-auto">
                  <pre
                    className={`p-4 text-sm ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    <code>{generatedCode}</code>
                  </pre>
                </div>

                <div
                  className={`p-2 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } text-center text-xs`}
                >
                  <span
                    className={`px-2 py-1 rounded-full ${
                      darkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {language}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeDashboard;
