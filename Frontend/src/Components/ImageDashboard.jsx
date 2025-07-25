import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiImage,
  FiDownload,
  FiShare2,
  FiSettings,
  FiClock,
  FiTrash2,
  FiPlus,
  FiRefreshCw,
} from "react-icons/fi";
import { FaMagic, FaPalette, FaExpand, FaRobot, FaImage } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../config/Axios";

const ImageDashboard = ({
  darkMode,
  toggleDarkMode,
  clearHistory,
  isCollapsed,
}) => {
  // State management
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [credits, setCredits] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentFullscreenImage, setCurrentFullscreenImage] = useState(null);
  const [hasUserStarted, setHasUserStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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


  // Sample prompts for inspiration
  const samplePrompts = [
    "Magical forest with glowing plants",
    "Portrait of a cyberpunk samurai",
    "Underwater kingdom with mermaids",
    "Steampunk airship in the clouds",
    "A realistic Image of a Beautiful Woman in Black Dress on a Beach",
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

  useEffect(() => {
    const getCresits = async () => {
      const res = await axiosInstance.get("/users/profile");
      if (res.status === 200) {
        setCredits(res.data.user.credits);
      }
    };

    getCresits();
  }, [credits]);

  // Image generation function
  const generateImage = async () => {
    if (!prompt.trim() || credits <= 0) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          // Stop at 90% to wait for API response
          clearInterval(interval);
          return 90;
        }
        return prev + 2;
      });
    }, 100);

    try {
      const response = await axiosInstance.post("/ai/image", {
        prompt,
      });

      if (response.status === 200) {
        if (response.data && response.data.answer.image) {
          clearInterval(interval);
          setProgress(100);

          const newImage = response.data.answer.image;
          setGeneratedImage(newImage);
          addToHistory(newImage);
          setCredits((prev) => prev - 1);

          toast.success("Image generated successfully!", {
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

          setTimeout(scrollToBottom, 100);
        } else {
          throw new Error("Invalid image data in response");
        }
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    } catch (error) {
      clearInterval(interval);

      toast.error("Image generation failed!", {
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
    } finally {
      setIsGenerating(false);
    }
  };

  // Add image to history
  const addToHistory = (imageUrl) => {
    const newItem = {
      id: Date.now(),
      imageUrl,
      prompt,
      timestamp: new Date().toISOString(),
    };

    setHistory((prev) => [newItem, ...prev.slice(0, 19)]);
  };

  // Remove image from history
  const removeFromHistory = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast.info("Image removed from history", {
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

  // Download image
  const downloadImage = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `EndVerseAI-image-${prompt.slice(0, 15)}-Endgaming.com.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!", {
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

  // Toggle fullscreen view
  const toggleFullscreen = (imageUrl) => {
    setCurrentFullscreenImage(imageUrl || generatedImage);
    setIsFullscreen(!isFullscreen);
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
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
              <FaImage className="text-white text-3xl" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
          >
            Welcome, {userName}!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-500"
          >
            Ready to create amazing AI art?
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
            <FaMagic className="text-indigo-500 text-xl" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Image Generation
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
            >
              {isMobile ? credits : `Credits: ${credits}`}
            </div>
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
              Create New Image
            </h2>

            {/* Prompt Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Describe your vision
              </label>
              <textarea
                value={prompt}
                autoFocus
                maxLength={200}
                onChange={(e) => setPrompt(e.target.value)}
                className={`w-full resize-none ${
                  isMobile ? "h-24" : "h-32"
                } p-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-100 border-gray-300"
                } border focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="A majestic dragon soaring over mountain peaks..."
              />
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: credits > 0 && prompt.trim() ? 1.02 : 1 }}
              whileTap={{ scale: credits > 0 && prompt.trim() ? 0.98 : 1 }}
              onClick={generateImage}
              disabled={!prompt.trim() || credits <= 0 || isGenerating}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center text-white ${
                !prompt.trim() || credits <= 0 || isGenerating
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
              ) : credits <= 0 ? (
                "No Credits Left"
              ) : (
                <>
                  <FaMagic className="mr-2" />
                  {isMobile ? "Generate" : "Generate Image"}
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
                <FiImage className="mr-2 text-indigo-500" />
                Generated Image
              </h2>
              {generatedImage && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => downloadImage(generatedImage)}
                    className={`p-2 rounded-lg ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <FiDownload />
                  </button>
                  <button
                    onClick={() => toggleFullscreen()}
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
                      <FaMagic className="text-indigo-400 text-2xl animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">
                    Creating your image
                  </h3>
                  <p className="text-sm text-gray-500">{progress}% complete</p>
                  <p className="text-xs mt-4 text-gray-500">
                    "{prompt.substring(0, isMobile ? 30 : 50)}
                    {prompt.length > (isMobile ? 30 : 50) ? "..." : ""}"
                  </p>
                </div>
              ) : generatedImage ? (
                <div className="relative group w-full h-full">
                  <img
                    src={generatedImage}
                    alt="Generated AI art"
                    className="w-full h-auto max-h-[500px] object-contain rounded-lg cursor-zoom-in"
                    onClick={() => toggleFullscreen()}
                  />
                </div>
              ) : (
                <div className="text-center p-6">
                  <FiImage className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <h3 className="text-lg font-medium mb-1">
                    No Image Generated
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
                    <FiImage className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      No generation history yet
                    </p>
                  </div>
                ) : (
                  <div
                    className={`grid ${
                      isMobile
                        ? "grid-cols-2 gap-2"
                        : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
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
                        <div className="relative aspect-square">
                          <img
                            src={item.imageUrl}
                            alt={item.prompt}
                            className="w-full h-full object-cover"
                            onClick={() => {
                              setGeneratedImage(item.imageUrl);
                              setPrompt(item.prompt);
                              setShowHistory(false);
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
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
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadImage(item.imageUrl);
                              }}
                              className="text-gray-500 hover:text-indigo-500"
                            >
                              <FiDownload className="w-3 h-3" />
                            </button>
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
            <div className="relative max-w-full max-h-full">
              <button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 rounded-full bg-gray-500 hover:bg-gray-400 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(false);
                }}
              >
                <IoMdClose className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <motion.img
                src={currentFullscreenImage}
                alt="Fullscreen preview"
                className="max-w-full max-h-screen object-contain"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              />

              <div
                className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 ${
                  darkMode ? "bg-gray-900/80" : "bg-white/90"
                } text-center`}
              >
                <p className={`${isMobile ? "text-sm" : "font-medium"}`}>
                  {prompt}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageDashboard;
