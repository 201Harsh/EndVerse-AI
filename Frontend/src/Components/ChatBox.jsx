import React, { useState, useRef, useEffect } from 'react';
import { FaPaperclip, FaMicrophone, FaRegPaperPlane } from 'react-icons/fa';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Handle file upload logic here
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`fixed bottom-0 md:left-16 left-0 right-0 md:w-8xl bg-gray-800/50 backdrop-blur-md border-t border-gray-700 p-2 ${isMobile ? 'pb-4' : 'pb-2'}`}>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-center">
          {/* File attachment button - hidden on mobile when keyboard is active */}
          <button
            type="button"
            onClick={triggerFileInput}
            className={`absolute left-3 text-gray-400 hover:text-indigo-400 transition ${isMobile ? 'hidden' : 'block'}`}
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
          
          {/* Text input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message EndVerse AI..."
            className={`w-full bg-gray-700 border border-gray-600 rounded-full py-3 ${isMobile ? 'pl-4 pr-12' : 'pl-10 pr-16'} text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          
          {/* Action buttons */}
          <div className={`absolute right-3 flex items-center space-x-2 ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
            {/* Show paperclip on mobile when no message */}
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
            
            <button
              type="submit"
              disabled={!message.trim()}
              className={`p-2 rounded-full ${message.trim() ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'} transition`}
              aria-label="Send message"
            >
              <FaRegPaperPlane className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;