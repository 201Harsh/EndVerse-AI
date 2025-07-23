import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaCheck, FaSpinner } from 'react-icons/fa';
import { FiCode, FiCpu, FiDatabase, FiCloud, FiServer } from 'react-icons/fi';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [serverStatus, setServerStatus] = useState({
    aiEngine: false,
    database: false,
    api: false,
    auth: false
  });

  useEffect(() => {
    // Simulate progress
    const progressTimer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) return 100;
        return oldProgress + 1;
      });
    }, 30);

    // Simulate server checks
    const checkIntervals = {
      aiEngine: setTimeout(() => updateServerStatus('aiEngine'), 500),
      database: setTimeout(() => updateServerStatus('database'), 800),
      api: setTimeout(() => updateServerStatus('api'), 1200),
      auth: setTimeout(() => updateServerStatus('auth'), 1600)
    };

    return () => {
      clearInterval(progressTimer);
      Object.values(checkIntervals).forEach(clearTimeout);
    };
  }, []);

  const updateServerStatus = (service) => {
    setServerStatus(prev => ({ ...prev, [service]: true }));
  };

  const allServicesReady = Object.values(serverStatus).every(Boolean);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-900 text-white z-50 flex flex-col items-center justify-center"
    >
      <div className="relative w-32 h-32 mb-8">
        {/* Main Robot Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaRobot className="w-20 h-20 text-indigo-400" />
        </motion.div>

        {/* Orbiting Icons */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FiCode className="w-6 h-6 text-purple-400" />
          </div>
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
            <FiCpu className="w-6 h-6 text-blue-400" />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <FiDatabase className="w-6 h-6 text-green-400" />
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
            <FiCloud className="w-6 h-6 text-cyan-400" />
          </div>
        </motion.div>
      </div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
      >
        EndVerse AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-400 mb-6"
      >
        {allServicesReady ? "All systems ready!" : "Initializing systems..."}
      </motion.p>

      {/* Server Status Checklist */}
      <div className="w-64 mb-6 space-y-3">
        <ServerStatusItem 
          name="AI Engine" 
          icon={<FiCpu />} 
          isReady={serverStatus.aiEngine} 
        />
        <ServerStatusItem 
          name="Database" 
          icon={<FiDatabase />} 
          isReady={serverStatus.database} 
        />
        <ServerStatusItem 
          name="API Service" 
          icon={<FiCode />} 
          isReady={serverStatus.api} 
        />
        <ServerStatusItem 
          name="Authentication" 
          icon={<FiServer />} 
          isReady={serverStatus.auth} 
        />
      </div>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
        />
      </div>

      <div className="text-sm text-gray-500 mb-8">
        {progress}% complete
      </div>

      {/* Continue button appears when all services are ready */}
      {allServicesReady && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium flex items-center"
        >
          Enter EndVerse
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </motion.button>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.1,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="absolute w-2 h-2 rounded-full bg-indigo-500 opacity-10"
          />
        ))}
      </div>
    </motion.div>
  );
};

const ServerStatusItem = ({ name, icon, isReady }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between"
    >
      <div className="flex items-center">
        <span className="mr-3 text-gray-400">
          {icon}
        </span>
        <span className="text-gray-300">
          {name}
        </span>
      </div>
      {isReady ? (
        <FaCheck className="text-green-400" />
      ) : (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner className="text-yellow-400" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Preloader;