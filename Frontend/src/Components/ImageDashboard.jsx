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
  FiRefreshCw
} from "react-icons/fi";
import { FaMagic, FaPalette, FaExpand } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageDashboard = ({ darkMode, toggleDarkMode, clearHistory }) => {
  // State management
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [orientation, setOrientation] = useState("square");
  const [credits, setCredits] = useState(10);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentFullscreenImage, setCurrentFullscreenImage] = useState(null);

  // Create ref for the output panel
  const outputPanelRef = useRef(null);

  // Sample image styles
  const styles = [
    { value: "realistic", label: "Realistic", color: "from-blue-500 to-blue-600" },
    { value: "fantasy", label: "Fantasy", color: "from-purple-500 to-purple-600" },
    { value: "anime", label: "Anime", color: "from-pink-500 to-pink-600" },
    { value: "cyberpunk", label: "Cyberpunk", color: "from-indigo-500 to-indigo-600" },
    { value: "watercolor", label: "Watercolor", color: "from-teal-500 to-teal-600" },
    { value: "oil_painting", label: "Oil Painting", color: "from-amber-500 to-amber-600" },
  ];

  // Sample prompts for inspiration
  const samplePrompts = [
    "A futuristic city at sunset",
    "Magical forest with glowing plants",
    "Portrait of a cyberpunk samurai",
    "Underwater kingdom with mermaids",
    "Steampunk airship in the clouds"
  ];

  // Function to scroll to bottom of output panel
  const scrollToBottom = () => {
    if (outputPanelRef.current) {
      outputPanelRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  };

  // Mock image generation function
  const generateImage = () => {
    if (!prompt.trim() || credits <= 0) return;
    
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
      
      // Use a placeholder image service for demo
      const width = orientation === "portrait" ? 600 : orientation === "landscape" ? 800 : 700;
      const height = orientation === "portrait" ? 900 : orientation === "landscape" ? 500 : 700;
      
      const newImage = `https://picsum.photos/${width}/${height}?random=${Date.now()}`;
      setGeneratedImage(newImage);
      addToHistory(newImage);
      setCredits(prev => prev - 1);
      setIsGenerating(false);
      
      toast.success("Image generated successfully!",{
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

      // Scroll to bottom after image is generated
      setTimeout(scrollToBottom, 100);
    }, 3000);
  };

  // Add image to history
  const addToHistory = (imageUrl) => {
    const newItem = {
      id: Date.now(),
      imageUrl,
      prompt,
      style,
      timestamp: new Date().toISOString()
    };
    
    setHistory(prev => [newItem, ...prev.slice(0, 19)]);
  };

  // Remove image from history
  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    toast.info("Image removed from history",{
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
  };

  // Download image
  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-image-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!",{
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

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Header */}
      <header className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaMagic className="text-indigo-500 text-xl" />
            <h1 className="text-xl ml-5 md:ml-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
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
              className={`flex items-center space-x-1 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FiClock className={showHistory ? 'text-indigo-500' : ''} />
              <span className="hidden md:inline">History</span>
            </button>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              Credits: {credits}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generation Panel */}
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FiPlus className="mr-2 text-indigo-500" />
              Create New Image
            </h2>
            
            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Describe your vision
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`w-full h-32 p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="A majestic dragon soaring over mountain peaks..."
              />
            </div>
            
            {/* Style Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Art Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {styles.map((s) => (
                  <motion.button
                    key={s.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStyle(s.value)}
                    className={`py-2 px-3 rounded-lg text-sm ${style === s.value 
                      ? `bg-gradient-to-r ${s.color} text-white` 
                      : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {s.label}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Advanced Options */}
            <div className="mb-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-sm text-indigo-500 hover:text-indigo-600"
              >
                <FiSettings className="mr-1" />
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
                      <label className="block text-sm mb-2">Orientation</label>
                      <div className="flex gap-2">
                        {['square', 'portrait', 'landscape'].map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setOrientation(opt)}
                            className={`flex-1 py-2 rounded-lg capitalize ${orientation === opt 
                              ? 'bg-indigo-600 text-white' 
                              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: credits > 0 && prompt.trim() ? 1.02 : 1 }}
              whileTap={{ scale: credits > 0 && prompt.trim() ? 0.98 : 1 }}
              onClick={generateImage}
              disabled={!prompt.trim() || credits <= 0 || isGenerating}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center ${
                !prompt.trim() || credits <= 0 || isGenerating
                  ? `${darkMode ? 'bg-gray-700' : 'bg-gray-200'} cursor-not-allowed`
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              }`}
            >
              {isGenerating ? (
                <>
                  <FiRefreshCw className="animate-spin mr-2" />
                  Generating ({progress}%)
                </>
              ) : credits <= 0 ? (
                "No Credits Left"
              ) : (
                <>
                  <FaMagic className="mr-2" />
                  Generate Image
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
          <div 
            ref={outputPanelRef}
            className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}
          >
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
              <h2 className="font-bold flex items-center">
                <FiImage className="mr-2 text-indigo-500" />
                Generated Image
              </h2>
              {generatedImage && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => downloadImage(generatedImage)}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <FiDownload />
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
                  <h3 className="text-lg font-medium mb-1">Creating your image</h3>
                  <p className="text-sm text-gray-500">{progress}% complete</p>
                  <p className="text-xs mt-4 text-gray-500">
                    "{prompt.substring(0, 50)}{prompt.length > 50 ? '...' : ''}"
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
                  {/* <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-gray-900/80' : 'from-white/80'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4`}>
                    <div>
                      <p className="font-medium">Prompt:</p>
                      <p className="text-sm">{prompt}</p>
                      <p className="text-xs mt-1 opacity-80">Style: {style}</p>
                    </div>
                  </div> */}
                </div>
              ) : (
                <div className="text-center p-8">
                  <FiImage className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-medium mb-2">No Image Generated</h3>
                  <p className="text-gray-500">
                    Enter a prompt and click "Generate Image" to create your masterpiece
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
                  <FiClock className="mr-2 text-indigo-500" />
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
                    <FiImage className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">No generation history yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {history.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -5 }}
                        className={`rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'} cursor-pointer`}
                      >
                        <div className="relative aspect-square">
                          <img
                            src={item.imageUrl}
                            alt={item.prompt}
                            className="w-full h-full object-cover"
                            onClick={() => {
                              setGeneratedImage(item.imageUrl);
                              setPrompt(item.prompt);
                              setStyle(item.style);
                              setShowHistory(false);
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
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
                            {item.prompt.substring(0, 30)}
                            {item.prompt.length > 30 ? '...' : ''}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-500">
                              {item.style}
                            </span>
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
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(false);
                }}
              >
                <IoMdClose className="w-6 h-6" />
              </button>
              
              <motion.img
                src={currentFullscreenImage}
                alt="Fullscreen preview"
                className="max-w-full max-h-screen object-contain"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              />
              
              <div className={`absolute bottom-0 left-0 right-0 p-4 ${darkMode ? 'bg-gray-900/80' : 'bg-white/90'} text-center`}>
                <p className="font-medium">{prompt}</p>
                <p className="text-sm opacity-80">Style: {style}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageDashboard;