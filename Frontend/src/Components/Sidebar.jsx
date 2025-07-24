import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiImage,
  FiVideo,
  FiSun,
  FiMoon,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiCode,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../config/Axios";

const Sidebar = ({
  isMobile,
  isMenuOpen,
  toggleMenu,
  isCollapsed,
  toggleCollapse,
  darkMode,
  toggleDarkMode,
  activeTab,
  setActiveTab,
  clearChat,
  userName,
}) => {
  const navItems = [
    { id: "chat", icon: <FiMessageSquare size={20} />, label: "Chat" },
    { id: "image", icon: <FiImage size={20} />, label: "Image" },
    { id: "video", icon: <FiVideo size={20} />, label: "Video" },
    { id: "Code", icon: <FiCode size={20} />, label: "Code" },
  ];

  const Navigate = useNavigate();

  const handleLogout = () => {
    const res = axiosInstance.post("/users/logout");
    if (res.status === 200) {
      localStorage.clear();
      toast.success(res.data.message, {
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
      Navigate("/");
    }
  };

  // For mobile, we want the sidebar to overlay and take full width when open
  if (isMobile) {
    return (
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed inset-y-0 left-0 z-30 w-full ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-xl`}
          >
            <div className="flex flex-col h-full p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full ${
                      darkMode ? "bg-indigo-600" : "bg-indigo-100"
                    } flex items-center justify-center mr-3`}
                  >
                    <span
                      className={`font-bold ${
                        darkMode ? "text-white" : "text-indigo-800"
                      }`}
                    >
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3
                    className={`font-semibold text-lg ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {userName}
                  </h3>
                </div>
                <button
                  onClick={toggleMenu}
                  className={`p-2 rounded-full ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <FiChevronLeft
                    size={20}
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveTab(item.id);
                          toggleMenu();
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition ${
                          activeTab === item.id
                            ? darkMode
                              ? "bg-indigo-600 text-white"
                              : "bg-indigo-100 text-indigo-800"
                            : darkMode
                            ? "hover:bg-gray-700 text-gray-300"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span className="text-lg">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="mt-auto space-y-4">
                <button
                  onClick={clearChat}
                  className={`w-full flex items-center p-3 rounded-lg transition ${
                    darkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <FiTrash2 size={20} className="mr-3" />
                  <span className="text-lg">Clear Chat</span>
                </button>

                <button
                  onClick={toggleDarkMode}
                  className={`w-full flex items-center p-3 rounded-lg transition ${
                    darkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {darkMode ? (
                    <>
                      <FiSun size={20} className="mr-3" />
                      <span className="text-lg">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <FiMoon size={20} className="mr-3" />
                      <span className="text-lg">Dark Mode</span>
                    </>
                  )}
                </button>

                {/* My Profile Section */}
                <div
                  className={`mt-6 pt-4 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <Link
                    to="/profile"
                    className={`w-full flex items-center p-3 rounded-lg transition ${
                      darkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <FiUser size={20} className="mr-3" />
                    <span className="text-lg">My Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center p-3 rounded-lg transition ${
                      darkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <FiLogOut size={20} className="mr-3" />
                    <span className="text-lg">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // For desktop - either expanded or collapsed
  return (
    <motion.div
      initial={{ width: isCollapsed ? 64 : 240 }}
      animate={{ width: isCollapsed ? 64 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`hidden md:flex flex-col h-screen fixed ${
        darkMode ? "bg-gray-800" : "bg-white"
      } border-r ${
        darkMode ? "border-gray-700" : "border-gray-200"
      } z-20 overflow-hidden`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          } mb-8`}
        >
          {!isCollapsed ? (
            <>
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full ${
                    darkMode ? "bg-indigo-600" : "bg-indigo-100"
                  } flex items-center justify-center mr-3`}
                >
                  <span
                    className={`font-bold ${
                      darkMode ? "text-white" : "text-indigo-800"
                    }`}
                  >
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {userName}
                </h3>
              </div>
              <button
                onClick={toggleCollapse}
                className={`p-1 rounded-full ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <FiChevronLeft
                  size={18}
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                />
              </button>
            </>
          ) : (
            <button
              onClick={toggleCollapse}
              className={`p-1 rounded-full ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <FiChevronRight
                size={18}
                className={darkMode ? "text-gray-300" : "text-gray-600"}
              />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center ${
                    isCollapsed ? "justify-center p-3" : "p-3"
                  } rounded-lg transition ${
                    activeTab === item.id
                      ? darkMode
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-100 text-indigo-800"
                      : darkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  title={isCollapsed ? item.label : ""}
                >
                  <span className={isCollapsed ? "" : "mr-3"}>{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto space-y-4">
          <button
            onClick={clearChat}
            className={`flex items-center ${
              isCollapsed ? "justify-center p-3 w-10 h-10" : "p-3 w-full"
            } rounded-lg transition ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            title={isCollapsed ? "Clear Chat" : ""}
          >
            <FiTrash2 size={20} className={isCollapsed ? "" : "mr-3"} />
            {!isCollapsed && <span>Clear Chat</span>}
          </button>

          <button
            onClick={toggleDarkMode}
            className={`flex items-center ${
              isCollapsed ? "justify-center p-3 w-10 h-10" : "p-3 w-full"
            } rounded-lg transition ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            title={isCollapsed ? (darkMode ? "Light Mode" : "Dark Mode") : ""}
          >
            {darkMode ? (
              <>
                <FiSun size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <FiMoon size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Dark Mode</span>}
              </>
            )}
          </button>

          {/* My Profile Section */}
          <div
            className={`mt-6 pt-4 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <Link
              to="/profile"
              className={` flex items-center ${
                isCollapsed ? "justify-center w-10 h-10 p-3" : "p-3 w-full"
              } rounded-lg transition ${
                darkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title={isCollapsed ? "My Profile" : ""}
            >
              <FiUser size={20} className={isCollapsed ? "" : "mr-3"} />
              {!isCollapsed && <span>My Profile</span>}
            </Link>
            <button
              onClick={handleLogout}
              className={` flex items-center cursor-pointer ${
                isCollapsed ? "justify-center w-10 h-10 p-3" : "p-3 w-full"
              } rounded-lg transition ${
                darkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              title={isCollapsed ? "My Profile" : ""}
            >
              <FiLogOut size={20} className={isCollapsed ? "" : "mr-3"} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
