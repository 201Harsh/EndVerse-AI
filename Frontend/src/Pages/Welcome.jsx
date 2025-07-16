import React, { useState, useEffect } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiImage,
  FiMessageSquare,
  FiZap,
  FiUsers,
  FiStar,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { FaRobot, FaDiscord, FaTwitter } from "react-icons/fa";

const Welcome = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  // Add viewport meta tag for mobile responsiveness
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      title: "Smart Chat",
      description:
        "Engage in natural conversations with our advanced AI that understands context and nuance.",
    },
    {
      icon: <FiImage className="w-6 h-6" />,
      title: "Image Generation",
      description:
        "Create stunning visuals with just a description. 5 free images per user!",
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Get responses and generated images in seconds with our optimized AI models.",
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "Multi-user",
      description:
        "Perfect for teams with shared workspaces and collaboration features.",
    },
    {
      icon: <FiStar className="w-6 h-6" />,
      title: "Quality Assurance",
      description:
        "Our AI is trained on a diverse range of data, ensuring high-quality responses.",
    },
    {
      icon: <FaDiscord className="w-6 h-6" />,
      title: "Discord Integration",
      description:
        "Connect your Discord server with EndVerse AI and get instant responses.",
    },
    {
      icon: <FaTwitter className="w-6 h-6" />,
      title: "Twitter Integration",
      description:
        "Integrate EndVerse AI with your Twitter account for seamless interactions.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Artist",
      content:
        "EndVerse AI has revolutionized my creative process. The image generation is incredibly detailed and accurate to my prompts.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Mark Williams",
      role: "Developer",
      content:
        "The chatbot API integration was seamless. My team uses it daily for code suggestions and documentation.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Emily Chen",
      role: "Content Creator",
      content:
        "I've tried many AI tools, but EndVerse's understanding of context is unmatched. It feels like talking to a human.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "David Kim",
      role: "Product Designer",
      content:
        "The image generation quality is outstanding. I use it daily for concept art and product mockups.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      features: [
        "5 AI-generated images per month",
        "Basic chat functionality",
        "Community support",
        "Limited to 10 messages/day",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      popular: true,
      features: [
        "100 AI-generated images per month",
        "Advanced chat features",
        "Priority support",
        "Unlimited messages",
        "Early access to new features",
      ],
      cta: "Upgrade Now",
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited image generation",
        "Dedicated AI instance",
        "API access",
        "24/7 premium support",
        "Custom AI model training",
      ],
      cta: "Contact Sales",
    },
  ];

  const faqs = [
    {
      question: "How does the free image generation work?",
      answer:
        "Each user gets 5 free AI-generated images per month. These refresh every 30 days. You can track your usage in your account dashboard.",
    },
    {
      question: "Is my data secure with EndVerse AI?",
      answer:
        "Absolutely. We use end-to-end encryption for all conversations and never store your generated images longer than necessary. You can delete your data anytime.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your Pro subscription anytime with no hidden fees. You'll retain access until the end of your billing period.",
    },
    {
      question: "What makes EndVerse different from other AI chatbots?",
      answer:
        "EndVerse combines state-of-the-art language models with specialized image generation in one seamless interface. Our context retention is industry-leading, allowing for more natural, ongoing conversations.",
    },
  ];

  const showcaseItems = [
    {
      prompt: "A Beautiful Girl in Black Dress",
      image:
        "https://images.unsplash.com/photo-1631377894831-46173f7af1f9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        name: "Jamie Chen",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      },
    },
    {
      prompt: "Futuristic city at night with neon lights",
      image:
        "https://images.unsplash.com/photo-1502321685473-ad40a3eeca99?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        name: "Alex Rivera",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    },
    {
      prompt: "Beam of light on a forest road",
      image:
        "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        name: "Taylor Smith",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      },
    },
    {
      prompt: "Love in the mountains",
      image:
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user: {
        name: "Jordan Lee",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      },
    },
  ];

  const chatExamples = [
    {
      user: "How can I improve my website's conversion rate?",
      ai: "Here are 5 proven strategies:\n1. Simplify your call-to-action buttons\n2. Add customer testimonials\n3. Improve page load speed\n4. Use A/B testing for headlines\n5. Implement exit-intent popups\nWould you like me to elaborate on any of these?",
      userAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
      user: "Explain quantum computing in simple terms",
      ai: "Quantum computing uses quantum bits (qubits) that can exist in multiple states at once (superposition). This allows them to perform many calculations simultaneously. Imagine flipping a coin - in normal computing it's either heads or tails, but in quantum it's both until measured. This enables solving complex problems much faster for certain tasks like cryptography or molecular modeling.",
      userAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      user: "Write a short poem about the ocean",
      ai: "The ocean whispers in tides of blue,\nA timeless dance, both old and new.\nWaves like verses upon the sand,\nWritten by nature's gentle hand.\nIn depths unknown, secrets keep,\nWhile moonlight lulls the world to sleep.",
      userAvatar: "https://randomuser.me/api/portraits/women/62.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextShowcase = () => {
    setShowcaseIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const prevShowcase = () => {
    setShowcaseIndex(
      (prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaRobot className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
              <span className="ml-2 text-xl sm:text-2xl font-bold">
                EndVerse AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition text-sm lg:text-base"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white transition text-sm lg:text-base"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition text-sm lg:text-base"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-gray-300 hover:text-white transition text-sm lg:text-base"
              >
                FAQ
              </a>
              <div className="flex space-x-3 lg:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all text-sm sm:text-base"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all text-sm sm:text-base"
                >
                  Sign Up
                </motion.button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 focus:outline-none p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop with blur effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed top-16 left-4 right-4 z-50 bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-xl p-6 space-y-4"
              >
                <a
                  href="#features"
                  className="block text-gray-300 hover:text-white transition py-3 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="block text-gray-300 hover:text-white transition py-3 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  className="block text-gray-300 hover:text-white transition py-3 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  className="block text-gray-300 hover:text-white transition py-3 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <div className="flex flex-col space-y-3 pt-4">
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-3 rounded-lg transition-all w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </button>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-3 rounded-lg transition-all w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="inline-flex items-center mb-4 sm:mb-6 bg-indigo-900/50 rounded-full px-3 py-1 sm:px-4 sm:py-2"
              >
                <FaRobot className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                <span className="ml-2 text-xs sm:text-sm text-indigo-300 font-medium">
                  EndVerse AI v2.0
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 leading-tight"
              >
                The Future of AI <br className="hidden sm:block" />{" "}
                Conversations
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10"
              >
                Experience the most advanced AI assistant with integrated image
                generation. Get 5 free images per user and unlock new
                possibilities.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base"
                >
                  Get Started <FiArrowRight className="ml-2" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base"
                >
                  See Examples
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-8 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6"
              >
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        src={`https://randomuser.me/api/portraits/${
                          i % 2 === 0 ? "women" : "men"
                        }/${i + 20}.jpg`}
                        alt="User"
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-gray-800"
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-xs sm:text-sm text-gray-400">
                    Join <span className="text-white">100+</span> users
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image/Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative mt-12 lg:mt-0"
            >
              <div className="relative bg-gray-800/50 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg sm:rounded-xl"></div>
                <div className="relative z-10 p-3 sm:p-6">
                  <div className="flex items-center mb-2 sm:mb-4">
                    <div className="flex space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-2 sm:ml-4 text-xs sm:text-sm text-gray-400">
                      EndVerse AI Chat
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-4">
                    <div className="flex">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center">
                        <FaRobot className="text-white text-xs sm:text-sm" />
                      </div>
                      <div className="ml-2 sm:ml-3 bg-gray-700/80 rounded-lg p-2 sm:p-3 max-w-xs">
                        <p className="text-gray-100 text-xs sm:text-sm">
                          Hi there! I'm EndVerse AI. How can I assist you today?
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-indigo-600/80 rounded-lg p-2 sm:p-3 max-w-xs">
                        <p className="text-gray-100 text-xs sm:text-sm">
                          Can you generate an image of a futuristic city at
                          night?
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center">
                        <FaRobot className="text-white text-xs sm:text-sm" />
                      </div>
                      <div className="ml-2 sm:ml-3 bg-gray-700/80 rounded-lg p-2 sm:p-3">
                        <div className="w-full h-24 sm:h-40 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded flex items-center justify-center">
                          <FiImage className="w-6 h-6 sm:w-10 sm:h-10 text-indigo-400" />
                        </div>
                        <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
                          Here's your generated image. Would you like any
                          modifications?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 bg-gray-700/50 rounded-lg p-2 sm:p-3 flex items-center">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="bg-transparent flex-1 focus:outline-none text-gray-200 text-xs sm:text-sm"
                    />
                    <button className="text-indigo-400 hover:text-indigo-300">
                      <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-indigo-600/20 backdrop-blur-md p-2 sm:p-4 rounded-lg sm:rounded-xl border border-indigo-500/30 shadow-lg text-xs sm:text-sm"
              >
                <div className="flex items-center">
                  <FiZap className="text-yellow-400 w-3 h-3 sm:w-5 sm:h-5" />
                  <span className="ml-1 sm:ml-2 font-medium">
                    Lightning Fast
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-purple-600/20 backdrop-blur-md p-2 sm:p-4 rounded-lg sm:rounded-xl border border-purple-500/30 shadow-lg text-xs sm:text-sm"
              >
                <div className="flex items-center">
                  <FiImage className="text-purple-300 w-3 h-3 sm:w-5 sm:h-5" />
                  <span className="ml-1 sm:ml-2 font-medium">
                    5 Free Images
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <div className="py-12 sm:py-16 bg-gray-800/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Cutting-Edge Technologies
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              EndVerse AI combines the most advanced AI technologies to deliver
              unparalleled performance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                name: "EndGaming AI",
                description:
                  "Proprietary neural architecture for contextual understanding",
                icon: "🧠",
                color: "from-purple-500 to-indigo-600",
              },
              {
                name: "Transformers",
                description: "State-of-the-art language processing models",
                icon: "⚡",
                color: "from-green-800 to-emerald-400",
              },
              {
                name: "Diffusion Models",
                description: "Advanced image generation technology",
                icon: "🎨",
                color: "from-pink-500 to-rose-500",
              },
              {
                name: "Neural Search",
                description: "Semantic understanding for precise responses",
                icon: "🔍",
                color: "from-blue-400 to-cyan-500",
              },
              {
                name: "Reinforcement Learning",
                description: "Continuous improvement from user interactions",
                icon: "🔄",
                color: "from-green-400 to-emerald-600",
              },
              {
                name: "Generative Models",
                description: "Creating new content from learned patterns",
                icon: "🖌️",
                color: "from-red-400 to-pink-500",
              },
              {
                name: "Self-Supervised Learning",
                description: "Leveraging unlabeled data for training",
                icon: "🧩",
                color: "from-indigo-500 to-purple-500",
              },
              {
                name: "Federated Learning",
                description: "Collaborative training without data sharing",
                icon: "🤝",
                color: "from-teal-400 to-green-500",
              },
              {
                name: "Large Language Models",
                description: "Powerful language processing models",
                icon: "🧠",
                color: "from-purple-500 to-indigo-600",
              },
              {
                name: "Image Synthesis",
                description: "Creating images from textual descriptions",
                icon: "🖼️",
                color: "from-pink-500 to-rose-500",
              },
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-2 sm:p-4"
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-2 sm:mb-4 flex items-center justify-center text-2xl sm:text-3xl bg-gradient-to-br ${tech.color}`}
                >
                  {tech.icon}
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-center mb-1 sm:mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm text-center">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 md:mt-16 text-center"
          >
            <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gray-800/50 border border-gray-700 text-xs sm:text-sm">
              <span className="text-gray-300 mr-1 sm:mr-2">
                Plus 10+ other specialized technologies
              </span>
              <FiArrowRight className="text-indigo-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              EndVerse AI combines cutting-edge technology with intuitive design
              to give you the best experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-700 hover:border-indigo-500 transition-all"
              >
                <div className="text-indigo-400 mb-2 sm:mb-4">
                  {React.cloneElement(feature.icon, {
                    className: "w-5 h-5 sm:w-6 sm:h-6",
                  })}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Get started with EndVerse AI in just a few simple steps.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Steps */}
              <div className="space-y-8 sm:space-y-12">
                {[
                  {
                    title: "Sign Up",
                    description:
                      "Create your free account in seconds. No credit card required.",
                    icon: <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
                  },
                  {
                    title: "Start Chatting",
                    description:
                      "Ask questions, get answers, and have natural conversations with our AI.",
                    icon: <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
                  },
                  {
                    title: "Generate Images",
                    description:
                      "Use the /image command followed by your description to create stunning visuals.",
                    icon: <FiImage className="w-5 h-5 sm:w-6 sm:h-6" />,
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    } items-center`}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-600 flex items-center justify-center ${
                        index % 2 === 0 ? "mr-4 sm:mr-6" : "ml-4 sm:ml-6"
                      }`}
                    >
                      <div className="text-white">{step.icon}</div>
                    </div>
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 md:py-20 bg-gray-800/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Choose the plan that fits your needs. No hidden fees, cancel
              anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gray-800/50 rounded-lg sm:rounded-xl border ${
                  plan.popular
                    ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                    : "border-gray-700"
                } overflow-hidden`}
              >
                {plan.popular && (
                  <div className="bg-indigo-600 text-white text-center py-1 sm:py-2 text-xs sm:text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 text-sm sm:text-base">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-xs sm:text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base ${
                      plan.popular
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-700 hover:bg-gray-600"
                    } transition-all`}
                  >
                    {plan.cta}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              What Users Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Don't just take our word for it. Here's what our users have to
              say.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl relative"
            >
              <button
                onClick={prevTestimonial}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-1 sm:p-2 rounded-full z-10"
              >
                <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-1 sm:p-2 rounded-full z-10"
              >
                <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center mb-2 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < testimonials[currentTestimonial].rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-base sm:text-lg md:text-xl italic mb-4 sm:mb-6">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-indigo-500"
                  loading="lazy"
                />
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold text-sm sm:text-base">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-6 sm:mt-8 space-x-1 sm:space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                    currentTestimonial === index
                      ? "bg-indigo-500"
                      : "bg-gray-600"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Community Showcase
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              See what our community has created with EndVerse AI
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Image Showcase */}
              <div className="mb-8 sm:mb-12 md:mb-16">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
                  Image Generation Examples
                </h3>
                <div className="relative bg-gray-800/50 rounded-lg sm:rounded-xl overflow-hidden border border-gray-700">
                  <button
                    onClick={prevShowcase}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-1 sm:p-2 rounded-full z-10"
                  >
                    <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextShowcase}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-1 sm:p-2 rounded-full z-10"
                  >
                    <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  <div className="p-3 sm:p-4 md:p-6">
                    <div className="mb-2 sm:mb-4 flex items-center">
                      <img
                        src={showcaseItems[showcaseIndex].user.avatar}
                        alt={showcaseItems[showcaseIndex].user.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-medium text-sm sm:text-base">
                          {showcaseItems[showcaseIndex].user.name}
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm">
                          Generated with EndVerse AI
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg overflow-hidden mb-2 sm:mb-4">
                      <img
                        src={showcaseItems[showcaseIndex].image}
                        alt={showcaseItems[showcaseIndex].prompt}
                        className="w-full h-48 sm:h-64 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="bg-gray-800 p-2 sm:p-3 md:p-4 rounded-lg">
                      <p className="text-gray-300 font-medium mb-1 text-xs sm:text-sm">
                        Prompt:
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        "{showcaseItems[showcaseIndex].prompt}"
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-3 sm:mt-4 space-x-1 sm:space-x-2">
                  {showcaseItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setShowcaseIndex(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                        showcaseIndex === index
                          ? "bg-indigo-500"
                          : "bg-gray-600"
                      }`}
                      aria-label={`View example ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Chat Examples */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
                  Chat Examples
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {chatExamples.map((chat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-700 overflow-hidden"
                    >
                      <div className="p-3 sm:p-4 md:p-6">
                        <div className="flex items-center mb-2 sm:mb-4">
                          <img
                            src={chat.userAvatar}
                            alt="User"
                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3"
                            loading="lazy"
                          />
                          <p className="font-medium text-sm sm:text-base">
                            User
                          </p>
                        </div>
                        <p className="text-gray-300 mb-4 sm:mb-6 pl-8 sm:pl-11 text-sm sm:text-base">
                          {chat.user}
                        </p>

                        <div className="flex items-center mb-2 sm:mb-4">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center mr-2 sm:mr-3">
                            <FaRobot className="text-white text-xs sm:text-sm" />
                          </div>
                          <p className="font-medium text-sm sm:text-base">
                            EndVerse AI
                          </p>
                        </div>
                        <p className="text-gray-300 whitespace-pre-line pl-8 sm:pl-11 text-sm sm:text-base">
                          {chat.ai}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Can't find what you're looking for? Contact our support team.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-lg sm:rounded-xl overflow-hidden border border-gray-700"
              >
                <button className="w-full flex justify-between items-center p-3 sm:p-4 md:p-6 text-left focus:outline-none">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium">
                    {faq.question}
                  </h3>
                  <FiChevronDown className="text-gray-400 transition-transform duration-200 w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 text-gray-400 text-xs sm:text-sm md:text-base">
                  {faq.answer}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Experience EndVerse AI?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8">
              Join thousands of users who are already boosting their
              productivity and creativity with our AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base"
              >
                Get Started - It's Free <FiArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-gray-500 hover:border-gray-400 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base"
              >
                Schedule a Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <FaRobot className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
                <span className="ml-2 text-xl sm:text-2xl font-bold">
                  EndVerse AI
                </span>
              </div>
              <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm">
                The most advanced AI assistant with integrated image generation.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                  aria-label="Discord"
                >
                  <FaDiscord className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3">
                Product
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3">
                Resources
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3">
                Company
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition text-xs sm:text-sm"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} EndVerse AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
