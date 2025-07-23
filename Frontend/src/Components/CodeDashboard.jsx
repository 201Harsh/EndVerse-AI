import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiCopy, FiPlay, FiSettings, FiSun, FiMoon } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';

const CodeDashboard = ({ darkMode, toggleDarkMode, isCollapsed }) => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [showSettings, setShowSettings] = useState(false); // Changed default to false for mobile
  const [hasUserStarted, setHasUserStarted] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const codeRef = useRef(null);
  const userName = localStorage.getItem('name') || 'EndVerse User';

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'css', label: 'CSS' },
    { value: 'jsx', label: 'JSX' },
    { value: 'sql', label: 'SQL' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'perl', label: 'Perl' },
  ];

  const samplePrompts = [
    "Create a React component for a login form",
    "Write a Python function to calculate Fibonacci sequence",
    "How to implement a binary search in JavaScript?",
    "CSS for a responsive navbar with dropdown",
    "Express.js route for user authentication"
  ];

  useEffect(() => {
    if (code) {
      Prism.highlightAll();
    }
  }, [code]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasUserStarted(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateCode = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      let mockCode = '';
      switch(language) {
        case 'javascript':
          mockCode = `// ${prompt}\nfunction solution() {\n  // Your code here\n  console.log("Hello, ${userName}!");\n}`;
          break;
        case 'python':
          mockCode = `# ${prompt}\ndef solution():\n    # Your code here\n    print("Hello, ${userName}!")`;
          break;
        case 'java':
          mockCode = `// ${prompt}\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello, ${userName}!");\n    }\n}`;
          break;
        default:
          mockCode = `/* ${prompt} */\n// Code would be generated here`;
      }
      
      setCode(mockCode);
      setIsGenerating(false);
      
      toast.success('Code generated successfully!', {
        position: isMobileView ? 'top-center' : 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: darkMode ? 'dark' : 'light',
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    if (!code) return;
    
    navigator.clipboard.writeText(code);
    toast.info('Code copied to clipboard!', {
      position: isMobileView ? 'top-center' : 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: darkMode ? 'dark' : 'light',
    });
  };

  if (!hasUserStarted) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
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
              <FiCode className="text-white text-3xl" />
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
          >
            Welcome, {userName}!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-500"
          >
            Ready to generate some code?
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/50'} backdrop-blur-md`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FiCode className="text-indigo-500 text-xl" />
            <h1 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Code Generation
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <FiSettings className={showSettings ? 'text-indigo-500' : ''} />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 overflow-auto ${isCollapsed ? 'ml-16' : 'ml-64'} ${isMobileView ? 'ml-0' : ''}`}>
        {isMobileView ? (
          // Mobile view - single column with tabs
          <div className="flex flex-col h-full">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowSettings(false)}
                className={`flex-1 py-3 px-4 text-center font-medium ${!showSettings ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                Code Output
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className={`flex-1 py-3 px-4 text-center font-medium ${showSettings ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                Settings
              </button>
            </div>
            
            {showSettings ? (
              // Settings panel for mobile
              <div className={`p-4 flex-1 overflow-auto ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Describe what code you need
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className={`w-full h-32 p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="e.g., Create a React component for a modal dialog..."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Programming Language
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.slice(0, 8).map((lang) => (
                      <motion.button
                        key={lang.value}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setLanguage(lang.value)}
                        className={`py-2 px-3 rounded-lg text-sm ${language === lang.value 
                          ? 'bg-indigo-600 text-white' 
                          : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {lang.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <motion.button
                    whileHover={{ scale: prompt.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: prompt.trim() ? 0.98 : 1 }}
                    onClick={generateCode}
                    disabled={!prompt.trim() || isGenerating}
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center text-white ${
                      !prompt.trim() || isGenerating
                        ? `${darkMode ? 'bg-gray-700' : 'bg-gray-700'} cursor-not-allowed`
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <FaRobot className="animate-pulse mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FiPlay className="mr-2" />
                        Generate Code
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="mt-4">
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
                        {sample.substring(0, 20)}{sample.length > 20 ? '...' : ''}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Code output panel for mobile
              <div className={`p-4 flex-1 overflow-auto ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold flex items-center">
                    <FiCode className="mr-2 text-indigo-500" />
                    Generated Code
                  </h2>
                  {code && (
                    <button
                      onClick={copyToClipboard}
                      className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <FiCopy />
                    </button>
                  )}
                </div>

                <div className="h-full">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="relative w-20 h-20 mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin"></div>
                        <div className="absolute inset-3 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin animation-delay-200"></div>
                        <div className="absolute inset-6 rounded-full border-4 border-t-pink-500 border-r-pink-500 border-b-transparent border-l-transparent animate-spin animation-delay-400"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaRobot className="text-indigo-400 text-xl animate-pulse" />
                        </div>
                      </div>
                      <h3 className="text-md font-medium mb-1">Generating your code</h3>
                      <p className="text-sm text-gray-500">
                        "{prompt.substring(0, 30)}{prompt.length > 30 ? '...' : ''}"
                      </p>
                    </div>
                  ) : code ? (
                    <pre className={`h-full overflow-auto rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
                      <code ref={codeRef} className={`language-${language}`}>
                        {code}
                      </code>
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <FiCode className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">No Code Generated</h3>
                      <p className="text-gray-500 text-sm">
                        Enter a prompt and click "Generate Code" to create your code
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Desktop view - original two-column layout
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
            {/* Prompt Side */}
            <div className={`p-4 h-full ${darkMode ? 'bg-gray-800/50' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Describe what code you need
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className={`w-full h-40 p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="e.g., Create a React component for a modal dialog..."
                  />
                </div>

                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 overflow-hidden"
                    >
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
                              className={`py-2 px-3 rounded-lg text-sm ${language === lang.value 
                                ? 'bg-indigo-600 text-white' 
                                : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                              }`}
                            >
                              {lang.label}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-auto">
                  <motion.button
                    whileHover={{ scale: prompt.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: prompt.trim() ? 0.98 : 1 }}
                    onClick={generateCode}
                    disabled={!prompt.trim() || isGenerating}
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center text-white ${
                      !prompt.trim() || isGenerating
                        ? `${darkMode ? 'bg-gray-700' : 'bg-gray-700'} cursor-not-allowed`
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <FaRobot className="animate-pulse mr-2" />
                        Generating Code...
                      </>
                    ) : (
                      <>
                        <FiPlay className="mr-2" />
                        Generate Code
                      </>
                    )}
                  </motion.button>

                  <div className="mt-4">
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
              </div>
            </div>

            {/* Output Side */}
            <div className={`p-4 h-full ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold flex items-center">
                  <FiCode className="mr-2 text-indigo-500" />
                  Generated Code
                </h2>
                {code && (
                  <button
                    onClick={copyToClipboard}
                    className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <FiCopy />
                  </button>
                )}
              </div>

              <div className="h-full">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative w-24 h-24 mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin"></div>
                      <div className="absolute inset-4 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin animation-delay-200"></div>
                      <div className="absolute inset-8 rounded-full border-4 border-t-pink-500 border-r-pink-500 border-b-transparent border-l-transparent animate-spin animation-delay-400"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaRobot className="text-indigo-400 text-2xl animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-1">Generating your code</h3>
                    <p className="text-sm text-gray-500">
                      "{prompt.substring(0, 50)}{prompt.length > 50 ? '...' : ''}"
                    </p>
                  </div>
                ) : code ? (
                  <pre className={`h-full overflow-auto rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
                    <code ref={codeRef} className={`language-${language}`}>
                      {code}
                    </code>
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <FiCode className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-medium mb-2">No Code Generated</h3>
                    <p className="text-gray-500">
                      Enter a prompt and click "Generate Code" to create your code
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CodeDashboard;