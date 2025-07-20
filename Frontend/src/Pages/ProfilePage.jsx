import React, { useState, useEffect } from "react";
import {
  FaRobot,
  FaInstagram,
  FaGithub,
  FaUser,
  FaEnvelope,
  FaCog,
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaTimes
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProfilePage = ({ onBack, darkMode, toggleDarkMode }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [tempUserData, setTempUserData] = useState({
    name: "",
    username: "",
    bio: "",
    email: ""
  });
  const [userData, setUserData] = useState({
    name: localStorage.getItem("name") || "EndVerse User",
    username: "201harsh",
    bio: "AI Enthusiast and Developer",
    email: localStorage.getItem("email") || "harsh@example.com"
  });

  useEffect(() => {
    setUserData({
      name: localStorage.getItem("name") || "EndVerse User",
      username: "201harsh",
      bio: "AI Enthusiast and Developer",
      email: localStorage.getItem("email") || "harsh@example.com"
    });
  }, []);

  const handleEditClick = () => {
    setTempUserData({ ...userData });
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUserData({ ...tempUserData });
    localStorage.setItem("name", tempUserData.name);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <Link
          to="/dashboard"
          className={`flex items-center ${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'} transition`}
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        <div className="flex items-center">
          <FiMenu className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} cursor-pointer`} />
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6 text-center`}>
              <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 mb-4">
                <div className={`w-full h-full rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} overflow-hidden`}>
                  <img
                    src="https://avatars.githubusercontent.com/u/160850571?v=4"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
              <p className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4`}>@{userData.email}</p>

              <div className="flex justify-center space-x-4 mb-6">
                <a
                  href="https://www.instagram.com/201harshs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-400"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/201Harsh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>

              <div className={`space-y-2 text-left ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <FaRobot className="mr-2" />
                  <span>EndVerse AI User</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
              {/* Tabs */}
              <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-6`}>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "profile"
                      ? `${darkMode ? 'text-indigo-400' : 'text-indigo-600'} border-b-2 ${darkMode ? 'border-indigo-400' : 'border-indigo-600'}`
                      : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "settings"
                      ? `${darkMode ? 'text-indigo-400' : 'text-indigo-600'} border-b-2 ${darkMode ? 'border-indigo-400' : 'border-indigo-600'}`
                      : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`
                  }`}
                >
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "activity"
                      ? `${darkMode ? 'text-indigo-400' : 'text-indigo-600'} border-b-2 ${darkMode ? 'border-indigo-400' : 'border-indigo-600'}`
                      : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`
                  }`}
                >
                  Activity
                </button>
              </div>

              {/* Profile Tab Content */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    {!isEditing ? (
                      <button 
                        onClick={handleEditClick}
                        className={`flex items-center px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                      >
                        <FaEdit className="mr-1" /> Edit
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleSaveClick}
                          className="flex items-center px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          <FaSave className="mr-1" /> Save
                        </button>
                        <button 
                          onClick={handleCancelClick}
                          className={`flex items-center px-3 py-1 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                          <FaTimes className="mr-1" /> Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={tempUserData.name}
                          onChange={handleInputChange}
                          className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        />
                      ) : (
                        <div className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border rounded-lg px-4 py-2`}>
                          {userData.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className={`block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="email"
                          value={tempUserData.email}
                          onChange={handleInputChange}
                          className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        />
                      ) : (
                        <div className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border rounded-lg px-4 py-2`}>
                          {userData.email}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className={`block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={tempUserData.bio}
                          onChange={handleInputChange}
                          className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]`}
                        />
                      ) : (
                        <div className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border rounded-lg px-4 py-2 min-h-[100px]`}>
                          {userData.bio}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab Content */}
              {activeTab === "settings" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Account Settings
                  </h3>
                  <div className="space-y-6">
                    <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-200'} p-4 rounded-lg border`}>
                      <div className="flex items-center mb-3">
                        <FaCog className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                        <h4 className="font-medium">General Settings</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Dark Mode</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={darkMode}
                              onChange={toggleDarkMode}
                            />
                            <div className={`w-11 h-6 ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                            Email Notifications
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className={`w-11 h-6 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600`}></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-200'} p-4 rounded-lg border`}>
                      <div className="flex items-center mb-3">
                        <FaUser className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
                        <h4 className="font-medium">Privacy Settings</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Public Profile</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className={`w-11 h-6 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600`}></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>Show Activity</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className={`w-11 h-6 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600`}></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Tab Content */}
              {activeTab === "activity" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-200'} p-4 rounded-lg border`}>
                      <div className="flex items-start">
                        <div className="bg-indigo-600/20 p-2 rounded-lg mr-3">
                          <FaRobot className="text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            New chat session started
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-200'} p-4 rounded-lg border`}>
                      <div className="flex items-start">
                        <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                          <FaCog className="text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Updated profile settings
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>1 day ago</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-200'} p-4 rounded-lg border`}>
                      <div className="flex items-start">
                        <div className="bg-green-600/20 p-2 rounded-lg mr-3">
                          <FaUser className="text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Connected GitHub account
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;