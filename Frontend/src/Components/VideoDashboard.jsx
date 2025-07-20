import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaVideo, 
  FaHistory, 
  FaSun, 
  FaMoon, 
  FaPlay, 
  FaPause,
  FaDownload,
  FaExpand,
  FaRegClock,
  FaMagic
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoDashboard = ({ darkMode, toggleDarkMode, clearChat }) => {
  // State management
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentFullscreenVideo, setCurrentFullscreenVideo] = useState(null);
  
  const videoRef = useRef(null);

  // Sample video styles
  const styles = [
    { value: "realistic", label: "Realistic", color: "from-blue-500 to-blue-600" },
    { value: "cinematic", label: "Cinematic", color: "from-purple-500 to-purple-600" },
    { value: "anime", label: "Anime", color: "from-pink-500 to-pink-600" },
    { value: "3d_animation", label: "3D Animation", color: "from-indigo-500 to-indigo-600" },
    { value: "watercolor", label: "Watercolor", color: "from-teal-500 to-teal-600" },
    { value: "claymation", label: "Claymation", color: "from-amber-500 to-amber-600" },
  ];

  // Sample prompts for inspiration
  const samplePrompts = [
    "A futuristic city with flying cars at sunset",
    "Underwater scene with colorful fish and coral reefs",
    "Time-lapse of a flower blooming in a magical forest",
    "A spaceship landing on an alien planet",
    "A dragon hatching from an egg in a medieval castle"
  ];

  // Mock video generation function
  const generateVideo = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
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
      
      // Use a placeholder video service for demo
      const newVideo = `https://sample-videos.com/video123/mp4/720/${Math.random() > 0.5 ? 'big_buck_bunny' : 'sample'}.mp4`;
      setGeneratedVideo(newVideo);
      addToHistory(newVideo);
      setIsGenerating(false);
      
      toast.success("Video generated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
        transition: Bounce,
      });
    }, 3000);
  };

  // Add video to history
  const addToHistory = (videoUrl) => {
    const newItem = {
      id: Date.now(),
      videoUrl,
      prompt,
      duration,
      timestamp: new Date().toISOString()
    };
    
    setHistory(prev => [newItem, ...prev.slice(0, 9)]);
  };

  // Remove video from history
  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    toast.info("Video removed from history", {
      position: "top-right",
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

  // Download video
  const downloadVideo = (videoUrl) => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `ai-video-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Video downloaded!", {
      position: "top-right",
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

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle fullscreen view
  const toggleFullscreen = (videoUrl = null) => {
    setCurrentFullscreenVideo(videoUrl || generatedVideo);
    setIsFullscreen(!isFullscreen);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Header */}
      <header className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaVideo className="text-indigo-500 text-xl" />
            <h1 className="text-xl ml-5 md:ml-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Video Generation
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center space-x-1 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaHistory className={showHistory ? 'text-indigo-500' : ''} />
              <span className="hidden md:inline">History</span>
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
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

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generation Panel */}
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaMagic className="mr-2 text-indigo-500" />
              Create New Video
            </h2>
            
            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Describe your video
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`w-full h-32 p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="A futuristic cityscape with flying vehicles at golden hour..."
              />
            </div>
            
            {/* Duration Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Duration: {duration}s
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="4"
                  max="10"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-indigo-500"
                />
                <span className="text-sm w-8 text-center">{duration}s</span>
              </div>
            </div>
            
            {/* Advanced Options */}
            <div className="mb-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-sm text-indigo-500 hover:text-indigo-600"
              >
                <FaRegClock className="mr-1" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced Options
              </button>
              
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-4 overflow-hidden"
                  >
                    <div>
                      <label className="block text-sm mb-2">Video Style</label>
                      <div className="grid grid-cols-2 gap-2">
                        {styles.map((s) => (
                          <motion.button
                            key={s.value}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`py-2 px-3 rounded-lg text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                          >
                            {s.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: prompt.trim() ? 1.02 : 1 }}
              whileTap={{ scale: prompt.trim() ? 0.98 : 1 }}
              onClick={generateVideo}
              disabled={!prompt.trim() || isGenerating}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center ${
                !prompt.trim() || isGenerating
                  ? `${darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-not-allowed`
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating ({progress}%)
                </>
              ) : (
                <>
                  <FaMagic className="mr-2" />
                  Generate Video
                </>
              )}
            </motion.button>
            
            {/* Prompt Ideas */}
            <div className="mt-6">
              <p className="text-sm mb-2">Need inspiration?</p>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((sample, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPrompt(sample)}
                    className={`px-3 py-1 text-xs rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {sample}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Output Panel */}
          <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
              <h2 className="font-bold flex items-center">
                <FaVideo className="mr-2 text-indigo-500" />
                Generated Video
              </h2>
              {generatedVideo && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => downloadVideo(generatedVideo)}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <FaDownload />
                  </button>
                  <button 
                    onClick={() => toggleFullscreen()}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <FaExpand />
                  </button>
                </div>
              )}
            </div>
            
            <div className="h-full min-h-[400px] flex items-center justify-center p-4">
              {isGenerating ? (
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin"></div>
                    <div className="absolute inset-4 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin animation-delay-200"></div>
                    <div className="absolute inset-8 rounded-full border-4 border-t-pink-500 border-r-pink-500 border-b-transparent border-l-transparent animate-spin animation-delay-400"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaMagic className="text-indigo-400 text-2xl animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-1">Creating your video</h3>
                  <p className="text-sm text-gray-500">{progress}% complete</p>
                  <p className="text-xs mt-4 text-gray-500">
                    "{prompt.substring(0, 50)}{prompt.length > 50 ? '...' : ''}"
                  </p>
                </div>
              ) : generatedVideo ? (
                <div className="relative group w-full h-full">
                  <video
                    ref={videoRef}
                    src={generatedVideo}
                    className="w-full h-auto max-h-[500px] object-contain rounded-lg cursor-pointer"
                    onClick={togglePlayPause}
                    loop
                  />
                  <button
                    onClick={togglePlayPause}
                    className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} transition-opacity`}
                  >
                    <div className={`p-4 rounded-full ${darkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm`}>
                      {isPlaying ? (
                        <FaPause className="text-white text-2xl" />
                      ) : (
                        <FaPlay className="text-white text-2xl" />
                      )}
                    </div>
                  </button>
                </div>
              ) : (
                <div className="text-center p-8">
                  <FaVideo className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-medium mb-2">No Video Generated</h3>
                  <p className="text-gray-500">
                    Enter a prompt and click "Generate Video" to create your animation
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
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-8 rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}
            >
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
                <h2 className="font-bold flex items-center">
                  <FaHistory className="mr-2 text-indigo-500" />
                  Generation History
                </h2>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <IoMdClose />
                </button>
              </div>
              
              <div className="max-h-[500px] overflow-y-auto p-4">
                {history.length === 0 ? (
                  <div className="text-center p-8">
                    <FaVideo className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No generation history yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {history.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -5 }}
                        className={`rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      >
                        <div className="relative aspect-video bg-black">
                          <video
                            src={item.videoUrl}
                            className="w-full h-full object-cover"
                            muted
                            loop
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromHistory(item.id);
                              }}
                              className="self-end p-1 rounded-full bg-red-500/80 hover:bg-red-600 text-white"
                            >
                              <IoMdClose className="w-3 h-3" />
                            </button>
                            <div>
                              <p className="text-xs text-white truncate">
                                {item.prompt}
                              </p>
                              <p className="text-[10px] text-gray-300 mt-1">
                                {formatTime(item.timestamp)} • {item.duration}s
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 flex justify-between items-center">
                          <div>
                            <p className="text-xs truncate">
                              {item.prompt.substring(0, 30)}
                              {item.prompt.length > 30 ? '...' : ''}
                            </p>
                            <p className="text-[10px] text-gray-500 mt-1">
                              {item.duration}s
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadVideo(item.videoUrl);
                              }}
                              className="text-gray-500 hover:text-indigo-500"
                            >
                              <FaDownload className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFullscreen(item.videoUrl);
                              }}
                              className="text-gray-500 hover:text-indigo-500"
                            >
                              <FaExpand className="w-3 h-3" />
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
            <div className="relative max-w-full max-h-full w-full h-full">
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(false);
                }}
              >
                <IoMdClose className="w-6 h-6" />
              </button>
              
              <video
                src={currentFullscreenVideo}
                className="w-full h-full object-contain"
                autoPlay
                controls
                loop
              />
              
              <div className={`absolute bottom-0 left-0 right-0 p-4 ${darkMode ? 'bg-gray-900/80' : 'bg-white/90'} text-center`}>
                <p className="font-medium">{prompt}</p>
                <p className="text-sm opacity-80">{duration}s video</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoDashboard;