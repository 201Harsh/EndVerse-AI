import React, { useState } from "react";
import {
  FaRobot,
  FaInstagram,
  FaGithub,
  FaUser,
  FaEnvelope,
  FaCog,
  FaArrowLeft,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProfilePage = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link
          to="/dashboard"
          className="flex items-center text-indigo-400 hover:text-indigo-300 transition"
        >
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        <div className="flex items-center">
          <FiMenu className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
              <div className="relative mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 mb-4">
                <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                  <img
                    src="https://avatars.githubusercontent.com/u/160850571?v=4"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-1">Harsh Singh</h2>
              <p className="text-indigo-400 mb-4">@201harsh</p>

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
                  className="text-gray-300 hover:text-white"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center text-gray-400">
                  <FaEnvelope className="mr-2" />
                  <span>harsh@example.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FaRobot className="mr-2" />
                  <span>EndVerse AI User</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              {/* Tabs */}
              <div className="flex border-b border-gray-700 mb-6">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "profile"
                      ? "text-indigo-400 border-b-2 border-indigo-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "settings"
                      ? "text-indigo-400 border-b-2 border-indigo-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`px-4 py-2 font-medium ${
                    activeTab === "activity"
                      ? "text-indigo-400 border-b-2 border-indigo-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Activity
                </button>
              </div>

              {/* Profile Tab Content */}
              {activeTab === "profile" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Harsh Singh"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        defaultValue="201harsh"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Bio</label>
                      <textarea
                        defaultValue="AI Enthusiast and Developer"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">
                      Save Changes
                    </button>
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
                    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center mb-3">
                        <FaCog className="text-indigo-400 mr-2" />
                        <h4 className="font-medium">General Settings</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Dark Mode</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">
                            Email Notifications
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center mb-3">
                        <FaUser className="text-indigo-400 mr-2" />
                        <h4 className="font-medium">Privacy Settings</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Public Profile</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Show Activity</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
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
                    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-start">
                        <div className="bg-indigo-600/20 p-2 rounded-lg mr-3">
                          <FaRobot className="text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            New chat session started
                          </h4>
                          <p className="text-gray-400 text-sm">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-start">
                        <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                          <FaCog className="text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Updated profile settings
                          </h4>
                          <p className="text-gray-400 text-sm">1 day ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-start">
                        <div className="bg-green-600/20 p-2 rounded-lg mr-3">
                          <FaUser className="text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Connected GitHub account
                          </h4>
                          <p className="text-gray-400 text-sm">3 days ago</p>
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
