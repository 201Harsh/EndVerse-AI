// components/VideoDashboard.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaClock } from 'react-icons/fa';

const VideoDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const userName = localStorage.getItem("name") || "EndVerse User";

  useEffect(() => {
    // After 3 seconds, transition from welcome to coming soon
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      {showWelcome ? (
        // Welcome animation
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
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
              <FaVideo className="text-white text-3xl" />
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
            Video Dashboard is loading...
          </motion.p>
        </motion.div>
      ) : (
        // Coming soon animation
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              y: [0, -10, 0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center">
              <FaClock className="text-white text-4xl" />
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
          >
            Coming Soon
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-500 mb-8"
          >
            Our video dashboard is under construction. We're working hard to bring you an amazing experience!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full shadow-lg"
          >
            Stay Tuned!
          </motion.div>
          
          <motion.div
            className="mt-8 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p>In the meantime, enjoy our Other features!</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VideoDashboard;