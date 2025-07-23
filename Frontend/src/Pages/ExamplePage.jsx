import { motion } from "framer-motion";
import { useState } from "react";
import { FiSun, FiMoon, FiCode, FiMessageSquare, FiImage, FiVideo, FiDatabase, FiChevronDown } from "react-icons/fi";
import { FaRobot, FaChalkboardTeacher, FaChartLine } from "react-icons/fa";
import { BsLightningFill, BsShieldLock } from "react-icons/bs";

const ExamplePage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [activeTab, setActiveTab] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const aiExamples = [
    {
      title: "Creative Writing",
      description: "Generate poems, stories, and creative content",
      examples: [
        {
          prompt: "Write a short poem about the ocean",
          response: "The ocean's waves dance wild and free,\nA sapphire expanse as far as I see.\nWhispers of tides in moon's embrace,\nEternal rhythm, timeless grace.",
          type: "text"
        },
        {
          prompt: "Create a fantasy character description",
          response: "Eldrin Shadowweaver, a rogue mage with eyes like smoldering embers, wears a cloak woven from twilight itself. His fingers crackle with forbidden magic, and his past is written in the scars across his knuckles.",
          type: "text"
        }
      ],
      icon: <FiMessageSquare className="text-2xl" />,
      category: "text"
    },
    {
      title: "Code Generation",
      description: "Write and explain code in multiple languages",
      examples: [
        {
          prompt: "Python function to calculate factorial",
          response: "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)",
          type: "code"
        },
        {
          prompt: "Explain this React component",
          response: "This is a functional React component that creates a counter. It uses the useState hook to manage state, increments the count when the button is clicked, and displays the current count in a paragraph element.",
          type: "code"
        }
      ],
      icon: <FiCode className="text-2xl" />,
      category: "code"
    },
    {
      title: "Image Generation",
      description: "Create stunning visuals from text descriptions",
      examples: [
        {
          prompt: "Generate a futuristic cityscape at night",
          response: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format",
          type: "image"
        },
        {
          prompt: "Create a watercolor painting of a forest",
          response: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=800&auto=format",
          type: "image"
        }
      ],
      icon: <FiImage className="text-2xl" />,
      category: "image"
    },
    {
      title: "Video Concepts",
      description: "Storyboard and script ideas for video content",
      examples: [
        {
          prompt: "Outline a 1-minute product explainer video",
          response: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          type: "video"
        },
        {
          prompt: "Suggest shots for a travel vlog intro",
          response: "https://www.youtube.com/embed/BHACKCNDMW8",
          type: "video"
        }
      ],
      icon: <FiVideo className="text-2xl" />,
      category: "video"
    },
    {
      title: "Data Analysis",
      description: "Interpret and visualize complex data",
      examples: [
        {
          prompt: "Explain this sales data trend",
          response: "The data shows a 25% increase in Q3 sales, likely due to the summer promotion campaign. However, customer acquisition costs rose by 15%, suggesting we should optimize our marketing channels.",
          type: "data"
        },
        {
          prompt: "Suggest a visualization for this dataset",
          response: "A stacked bar chart would effectively show the proportion of different product categories sold each month, while a line graph overlay could display the overall revenue trend.",
          type: "data"
        }
      ],
      icon: <FiDatabase className="text-2xl" />,
      category: "data"
    },
    {
      title: "Educational Content",
      description: "Create learning materials and explanations",
      examples: [
        {
          prompt: "Explain quantum physics to a 5th grader",
          response: "Imagine tiny particles that can be in two places at once, like a spinning top that's both standing up and lying down at the same time. Quantum physics studies these strange behaviors of very small things.",
          type: "education"
        },
        {
          prompt: "Create a lesson plan about photosynthesis",
          response: "1. Introduction: Show plants growing toward light\n2. Explanation: Sunlight + water + CO2 = sugar + oxygen\n3. Activity: Measure oxygen bubbles from water plants\n4. Assessment: Draw and label the photosynthesis process",
          type: "education"
        }
      ],
      icon: <FaChalkboardTeacher className="text-2xl" />,
      category: "education"
    }
  ];

  const filteredExamples = activeTab === "all" 
    ? aiExamples 
    : aiExamples.filter(example => example.category === activeTab);

  return (
    <section
      id="examples"
      className={`min-h-screen py-4 sm:py-8 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto px-3 sm:px-6">
        {/* Mobile Filter Dropdown */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className={`w-full flex items-center justify-between p-3 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            } border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <span className={`font-medium ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}>
              {activeTab === "all" ? "All Categories" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </span>
            <FiChevronDown className={`transition-transform ${
              mobileFiltersOpen ? "rotate-180" : ""
            } ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
          </button>
          
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-1 rounded-lg overflow-hidden ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="p-2 space-y-1">
                {["all", "text", "code", "image", "video", "data", "education"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setMobileFiltersOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      activeTab === tab
                        ? darkMode
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-100 text-indigo-800"
                        : darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab === "all" ? "All Categories" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Header with Dark Mode Toggle */}
        <header className={`py-4 px-4 sm:px-6 rounded-xl mb-6 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border shadow-lg`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xl sm:text-2xl font-bold truncate bg-clip-text text-transparent bg-gradient-to-r ${
                  darkMode ? "from-indigo-400 to-purple-600" : "from-indigo-600 to-purple-700"
                }`}
              >
                EndVerse AI Playground
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`text-sm truncate ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Explore AI capabilities through real examples
              </motion.p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                {["all", "text", "code", "image", "video", "data", "education"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-1 text-xs rounded-full capitalize ${
                      activeTab === tab
                        ? darkMode
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-100 text-indigo-800"
                        : darkMode
                        ? "text-gray-300 hover:bg-gray-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {tab === "all" ? "All" : tab}
                  </button>
                ))}
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                } transition-colors`}
              >
                {darkMode ? (
                  <FiSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                ) : (
                  <FiMoon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* AI Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredExamples.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className={`rounded-xl overflow-hidden ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              } border shadow-lg`}
            >
              <div className={`p-4 sm:p-5 ${
                darkMode ? "bg-gray-800" : "bg-gray-50"
              }`}>
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 ${
                    darkMode ? "bg-gray-700 text-indigo-400" : "bg-indigo-100 text-indigo-600"
                  }`}>
                    {category.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-lg sm:text-xl font-bold truncate ${
                      darkMode ? "text-gray-100" : "text-gray-800"
                    }`}>
                      {category.title}
                    </h3>
                    <p className={`text-xs sm:text-sm truncate ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {category.examples.map((example, exIndex) => (
                    <div
                      key={exIndex}
                      className={`rounded-lg overflow-hidden ${
                        darkMode ? "bg-gray-700/30" : "bg-gray-100"
                      }`}
                    >
                      <div className="p-3 sm:p-4">
                        <div className="mb-2 sm:mb-3">
                          <p className={`font-medium text-xs sm:text-sm flex items-center ${
                            darkMode ? "text-indigo-400" : "text-indigo-600"
                          }`}>
                            <FaRobot className="mr-1 sm:mr-2 text-xs" /> Prompt:
                          </p>
                          <p className={`mt-1 text-xs sm:text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                          }`}>
                            {example.prompt}
                          </p>
                        </div>
                        <div>
                          <p className={`font-medium text-xs sm:text-sm flex items-center ${
                            darkMode ? "text-green-400" : "text-green-600"
                          }`}>
                            <BsLightningFill className="mr-1 sm:mr-2 text-xs" /> AI Response:
                          </p>
                          {example.type === "image" ? (
                            <div className="mt-2 sm:mt-3 rounded-md overflow-hidden">
                              <img 
                                src={example.response} 
                                alt="AI generated" 
                                className="w-full h-auto rounded border border-gray-300 dark:border-gray-600"
                                loading="lazy"
                              />
                            </div>
                          ) : example.type === "video" ? (
                            <div className="mt-2 sm:mt-3 aspect-video rounded-md overflow-hidden">
                              <iframe 
                                src={example.response} 
                                className="w-full h-full" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                                title="AI video example"
                                loading="lazy"
                              ></iframe>
                            </div>
                          ) : example.type === "code" ? (
                            <pre className={`mt-1 sm:mt-2 p-2 sm:p-3 text-xs sm:text-sm rounded ${
                              darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-200 text-gray-800"
                            } overflow-x-auto`}>
                              <code>{example.response}</code>
                            </pre>
                          ) : (
                            <p className={`mt-1 sm:mt-2 text-xs sm:text-sm ${
                              darkMode ? "text-gray-300" : "text-gray-800"
                            }`}>
                              {example.response}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 text-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-md flex items-center justify-center mx-auto text-xs sm:text-sm ${
                      darkMode
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                    } font-medium transition-colors shadow-md ${
                      darkMode ? "shadow-indigo-900/30" : "shadow-indigo-500/20"
                    }`}
                  >
                    Try {category.title}
                    <svg className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`mt-12 sm:mt-16 p-5 sm:p-8 rounded-xl ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } border shadow-lg`}
        >
          <h3 className={`text-xl sm:text-2xl font-bold mb-6 text-center ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}>
            Why Choose EndVerse AI?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <BsLightningFill className="text-2xl sm:text-3xl" />,
                title: "Lightning Fast",
                description: "Generate responses in seconds with our optimized AI models",
                color: "text-yellow-500"
              },
              {
                icon: <FaChartLine className="text-2xl sm:text-3xl" />,
                title: "Multi-Modal",
                description: "Work with text, code, images, and video in one platform",
                color: "text-indigo-500"
              },
              {
                icon: <BsShieldLock className="text-2xl sm:text-3xl" />,
                title: "Secure & Private",
                description: "Enterprise-grade security for your data and intellectual property",
                color: "text-green-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className={`p-4 sm:p-6 rounded-lg flex flex-col items-center text-center ${
                  darkMode ? "bg-gray-700/30" : "bg-gray-50"
                }`}
              >
                <div className={`p-3 sm:p-4 rounded-full mb-3 sm:mb-4 ${feature.color} ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } shadow-md`}>
                  {feature.icon}
                </div>
                <h4 className={`font-bold text-base sm:text-lg mb-1 sm:mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}>
                  {feature.title}
                </h4>
                <p className={`text-xs sm:text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className={`mt-12 sm:mt-16 p-5 sm:p-8 rounded-xl ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } border shadow-lg`}
        >
          <h3 className={`text-xl sm:text-2xl font-bold mb-6 text-center ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}>
            Trusted by Teams Worldwide
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: "EndVerse AI reduced our content creation time by 70% while maintaining our brand voice perfectly.",
                author: "Sarah K., Marketing Director",
                company: "TechCorp Inc."
              },
              {
                quote: "The code generation features helped our junior developers learn faster while increasing productivity.",
                author: "James L., CTO",
                company: "DevSolutions"
              },
              {
                quote: "Game-changing for our creative team. We can now prototype ideas in minutes instead of days.",
                author: "Maria G., Creative Lead",
                company: "Pixel Studios"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`p-4 sm:p-6 rounded-lg ${
                  darkMode ? "bg-gray-700/30" : "bg-gray-50"
                }`}
              >
                <blockquote className={`italic mb-3 sm:mb-4 text-sm sm:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                    darkMode ? "bg-indigo-600" : "bg-indigo-100"
                  } flex items-center justify-center mr-2 sm:mr-3`}>
                    <span className={`font-bold text-xs sm:text-sm ${
                      darkMode ? "text-white" : "text-indigo-800"
                    }`}>
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className={`font-medium text-sm sm:text-base ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}>
                      {testimonial.author}
                    </p>
                    <p className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className={`mt-12 sm:mt-16 py-6 text-center ${
            darkMode ? "text-gray-500" : "text-gray-400"
          } text-xs sm:text-sm`}
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">API Docs</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          <p>EndVerse AI may produce inaccurate information. Verify critical outputs.</p>
          <p className="mt-1">© {new Date().getFullYear()} EndVerse AI. All rights reserved.</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ExamplePage;