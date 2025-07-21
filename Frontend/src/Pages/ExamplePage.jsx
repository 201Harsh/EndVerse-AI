import { motion } from "framer-motion";
import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ExamplePage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const aiExamples = [
    {
      title: "Creative Writing",
      description: "Generate poems, stories, and creative content",
      examples: [
        {
          prompt: "Write a short poem about the ocean",
          response: "The ocean's waves dance wild and free, A sapphire expanse as far as I see. Whispers of tides in moon's embrace, Eternal rhythm, timeless grace."
        },
        {
          prompt: "Create a fantasy character description",
          response: "Eldrin Shadowweaver, a rogue mage with eyes like smoldering embers, wears a cloak woven from twilight itself. His fingers crackle with forbidden magic, and his past is written in the scars across his knuckles."
        }
      ],
      icon: "✍️"
    },
    {
      title: "Code Generation",
      description: "Write and explain code in multiple languages",
      examples: [
        {
          prompt: "Python function to calculate factorial",
          response: "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n-1)"
        },
        {
          prompt: "Explain this React component",
          response: "This is a functional React component that creates a counter. It uses the useState hook to manage state, increments the count when the button is clicked, and displays the current count in a paragraph element."
        }
      ],
      icon: "💻"
    },
    {
      title: "Conversational AI",
      description: "Natural, human-like conversations",
      examples: [
        {
          prompt: "What's your favorite book?",
          response: "As an AI, I don't have personal preferences, but I can recommend 'Dune' by Frank Herbert for its rich world-building or 'Pride and Prejudice' for its timeless social commentary - what genre interests you?"
        },
        {
          prompt: "Tell me a fun fact",
          response: "Did you know honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!"
        }
      ],
      icon: "💬"
    },
    {
      title: "Data Analysis",
      description: "Interpret and visualize complex data",
      examples: [
        {
          prompt: "Explain this sales data trend",
          response: "The data shows a 25% increase in Q3 sales, likely due to the summer promotion campaign. However, customer acquisition costs rose by 15%, suggesting we should optimize our marketing channels."
        },
        {
          prompt: "Suggest a visualization for this dataset",
          response: "A stacked bar chart would effectively show the proportion of different product categories sold each month, while a line graph overlay could display the overall revenue trend."
        }
      ],
      icon: "📊"
    }
  ];

  return (
    <section
      id="examples"
      className={`min-h-screen py-12 sm:py-16 md:py-20 ${
        darkMode ? "bg-gray-900/50" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header with Dark Mode Toggle */}
        <header className={`py-4 px-6 rounded-lg mb-8 ${
          darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
        } border backdrop-blur-md`}>
          <div className="flex items-center justify-between">
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                darkMode ? "from-indigo-400 to-purple-600" : "from-indigo-600 to-purple-700"
              }`}
            >
              AI Capabilities Showcase
            </motion.h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                } transition-colors`}
              >
                {darkMode ? (
                  <FiSun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`mt-2 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore examples of what EndVerse AI can do
          </motion.p>
        </header>

        {/* AI Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {aiExamples.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`rounded-xl overflow-hidden ${
                darkMode ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
              } border shadow-lg backdrop-blur-sm`}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <div>
                    <h3 className={`text-xl font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-800"
                    }`}>
                      {category.title}
                    </h3>
                    <p className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.examples.map((example, exIndex) => (
                    <div
                      key={exIndex}
                      className={`rounded-lg p-4 ${
                        darkMode ? "bg-gray-700/30" : "bg-gray-100"
                      }`}
                    >
                      <div className="mb-2">
                        <p className={`font-medium text-sm ${
                          darkMode ? "text-indigo-400" : "text-indigo-600"
                        }`}>
                          Prompt:
                        </p>
                        <p className={darkMode ? "text-gray-300" : "text-gray-800"}>
                          {example.prompt}
                        </p>
                      </div>
                      <div>
                        <p className={`font-medium text-sm ${
                          darkMode ? "text-green-400" : "text-green-600"
                        }`}>
                          AI Response:
                        </p>
                        <p className={darkMode ? "text-gray-300" : "text-gray-800"}>
                          {example.response}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-md ${
                      darkMode
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    } text-white font-medium transition-colors shadow-md ${
                      darkMode ? "shadow-indigo-900/30" : "shadow-indigo-500/30"
                    }`}
                  >
                    Try {category.title}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real-world Applications Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className={`text-xl sm:text-2xl font-bold mb-6 text-center ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}>
            Real-world Applications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏥",
                title: "Healthcare",
                description: "Medical research analysis, patient Q&A, and symptom checking with proper disclaimers."
              },
              {
                icon: "🎓",
                title: "Education",
                description: "Personalized tutoring, language learning, and interactive study tools."
              },
              {
                icon: "💼",
                title: "Business",
                description: "Market analysis, report generation, and customer service automation."
              }
            ].map((app, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`p-6 rounded-lg border ${
                  darkMode ? "bg-gray-800/40 border-gray-700" : "bg-white border-gray-200"
                } shadow-md backdrop-blur-sm`}
              >
                <div className={`text-4xl mb-3 ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}>
                  {app.icon}
                </div>
                <h4 className={`font-bold mb-2 ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}>
                  {app.title}
                </h4>
                <p className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {app.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className={`mt-16 py-6 text-center ${
            darkMode ? "text-gray-500" : "text-gray-400"
          } text-sm`}
        >
          <p>EndVerse AI may produce inaccurate information about people, places, or facts.</p>
          <p className="mt-1">© {new Date().getFullYear()} EndVerse AI. All rights reserved.</p>
        </motion.footer>
      </div>
    </section>
  );
};

export default ExamplePage;