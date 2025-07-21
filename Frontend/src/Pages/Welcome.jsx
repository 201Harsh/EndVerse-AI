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
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaDiscord,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Welcome = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

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

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
    {
      icon: <FaGithub className="w-6 h-6" />,
      title: "Developer API",
      description:
        "Build your own applications with our powerful developer API.",
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
    {
      question: "Do you offer educational discounts?",
      answer:
        "Yes! We offer special pricing for students and educators. Contact our support team with proof of your academic status to learn more.",
    },
    {
      question: "How can I integrate EndVerse with my website?",
      answer:
        "We provide comprehensive API documentation and SDKs for popular platforms. Our developer resources make integration straightforward.",
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

  const stats = [
    { value: "10M+", label: "Daily Queries" },
    { value: "500K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "AI researcher with 10+ years experience in machine learning",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Williams",
      role: "CTO",
      bio: "Former Google engineer specializing in neural networks",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in AI integration",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      bio: "Creates intuitive interfaces for complex AI systems",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? `${
                darkMode ? "bg-gray-900/95" : "bg-white/95"
              } backdrop-blur-md py-2 shadow-sm`
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
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition text-sm lg:text-base`}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition text-sm lg:text-base`}
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition text-sm lg:text-base`}
              >
                Pricing
              </a>
              <a
                href="#team"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition text-sm lg:text-base`}
              >
                Team
              </a>
              <a
                href="#faq"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition text-sm lg:text-base`}
              >
                FAQ
              </a>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-yellow-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <FiSun className="w-5 h-5" />
                  ) : (
                    <FiMoon className="w-5 h-5" />
                  )}
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  } text-white font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all text-sm sm:text-base`}
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
              className={`md:hidden ${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              } focus:outline-none p-2`}
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
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-16 left-4 right-4 z-50 ${
                  darkMode ? "bg-gray-800/95" : "bg-white/95"
                } backdrop-blur-lg rounded-xl shadow-xl p-6 space-y-4`}
              >
                <button
                  onClick={toggleDarkMode}
                  className={`w-full flex items-center justify-between py-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <span>Dark Mode</span>
                  {darkMode ? (
                    <FiSun className="w-5 h-5" />
                  ) : (
                    <FiMoon className="w-5 h-5" />
                  )}
                </button>
                <a
                  href="#features"
                  className={`block ${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  } transition py-3 text-lg`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className={`block ${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  } transition py-3 text-lg`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  className={`block ${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  } transition py-3 text-lg`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#team"
                  className={`block ${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  } transition py-3 text-lg`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </a>
                <a
                  href="#faq"
                  className={`block ${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  } transition py-3 text-lg`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <div className="flex flex-col space-y-3 pt-4">
                  <Link
                    to="/login"
                    className={`${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-500 hover:bg-gray-600"
                    } text-white font-medium px-4 py-3 rounded-lg transition-all w-full`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-3 rounded-lg transition-all w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
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
                className={`inline-flex items-center mb-4 sm:mb-6 ${
                  darkMode ? "bg-indigo-900/50" : "bg-indigo-100"
                } rounded-full px-3 py-1 sm:px-4 sm:py-2`}
              >
                <FaRobot className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                <span
                  className={`ml-2 text-xs sm:text-sm ${
                    darkMode ? "text-indigo-300" : "text-indigo-700"
                  } font-medium`}
                >
                  EndVerse AI v2.0
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 leading-tight"
              >
                The Future of AI <br className="hidden sm:block" />{" "}
                Conversations
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10 text-base sm:text-lg md:text-xl`}
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
                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base"
                >
                  Get Started <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/examples"
                  className={`${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-500 hover:bg-gray-600"
                  } text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base`}
                >
                  See Examples
                </Link>
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
                  <span
                    className={`ml-2 text-xs sm:text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Join{" "}
                    <span
                      className={`${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      100+
                    </span>{" "}
                    users
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image/Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative mt-0 lg:mt-0"
            >
              <div
                className={`relative ${
                  darkMode ? "bg-gray-800/50" : "bg-gray-100"
                } rounded-xl sm:rounded-2xl p-1.5 sm:p-2 border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    darkMode
                      ? "from-indigo-500/10 to-purple-500/10"
                      : "from-indigo-100/50 to-purple-100/50"
                  } rounded-lg sm:rounded-xl`}
                ></div>
                <div className="relative z-10 p-3 sm:p-6">
                  <div className="flex items-center mb-2 sm:mb-4">
                    <div className="flex space-x-1 sm:space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div
                      className={`ml-2 sm:ml-4 text-xs sm:text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      EndVerse AI Chat
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-4">
                    <div className="flex">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center">
                        <FaRobot className="text-white text-xs sm:text-sm" />
                      </div>
                      <div
                        className={`ml-2 sm:ml-3 ${
                          darkMode ? "bg-gray-700/80" : "bg-gray-200"
                        } rounded-lg p-2 sm:p-3 max-w-xs`}
                      >
                        <p
                          className={`${
                            darkMode ? "text-gray-100" : "text-gray-800"
                          } text-xs sm:text-sm`}
                        >
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
                      <div
                        className={`ml-2 sm:ml-3 ${
                          darkMode ? "bg-gray-700/80" : "bg-gray-200"
                        } rounded-lg p-2 sm:p-3`}
                      >
                        <div
                          className={`w-full h-24 sm:h-40 ${
                            darkMode
                              ? "bg-gradient-to-br from-indigo-900/50 to-purple-900/50"
                              : "bg-gradient-to-br from-indigo-100 to-purple-100"
                          } rounded flex items-center justify-center`}
                        >
                          <FiImage className="w-6 h-6 sm:w-10 sm:h-10 text-indigo-400" />
                        </div>
                        <p
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          } text-xs sm:text-sm mt-1 sm:mt-2`}
                        >
                          Here's your generated image. Would you like any
                          modifications?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mt-4 sm:mt-6 ${
                      darkMode ? "bg-gray-700/50" : "bg-gray-200"
                    } rounded-lg p-2 sm:p-3 flex items-center`}
                  >
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className={`bg-transparent flex-1 focus:outline-none ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      } text-xs sm:text-sm`}
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
                className={`absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 ${
                  darkMode ? "bg-indigo-600/20" : "bg-indigo-100"
                } backdrop-blur-md p-2 sm:p-4 rounded-lg sm:rounded-xl border ${
                  darkMode ? "border-indigo-500/30" : "border-indigo-200"
                } shadow-lg text-xs sm:text-sm`}
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
                className={`absolute -top-4 -right-4 sm:-top-6 sm:-right-6 ${
                  darkMode ? "bg-purple-600/20" : "bg-purple-100"
                } backdrop-blur-md p-2 sm:p-4 rounded-lg sm:rounded-xl border ${
                  darkMode ? "border-purple-500/30" : "border-purple-200"
                } shadow-lg text-xs sm:text-sm`}
              >
                <div className="flex items-center">
                  <FiImage className="text-purple-400 w-3 h-3 sm:w-5 sm:h-5" />
                  <span className="ml-1 sm:ml-2 font-medium">
                    5 Free Images
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-12 sm:py-16 ${
          darkMode ? "bg-gray-800/30" : "bg-gray-100"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-4 sm:p-6 rounded-lg ${
                  darkMode ? "bg-gray-800/50" : "bg-white"
                } text-center`}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                  {stat.value}
                </p>
                <p
                  className={`text-xs sm:text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section
        className={`py-12 sm:py-16 ${
          darkMode ? "bg-gray-800/30" : "bg-gray-50"
        }`}
      >
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
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto text-sm sm:text-base`}
            >
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
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`flex flex-col items-center p-2 sm:p-4 ${
                  darkMode ? "bg-gray-800/50" : "bg-white"
                } rounded-lg border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } shadow-sm`}
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-2 sm:mb-4 flex items-center justify-center text-2xl sm:text-3xl bg-gradient-to-br ${tech.color}`}
                >
                  {tech.icon}
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-center mb-1 sm:mb-2">
                  {tech.name}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } text-xs sm:text-sm text-center`}
                >
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-800/50" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Powerful Features
            </h2>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto text-sm sm:text-base`}
            >
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
                className={`${
                  darkMode ? "bg-gray-800/50" : "bg-white"
                } p-4 sm:p-6 rounded-lg sm:rounded-xl border ${
                  darkMode
                    ? "border-gray-700 hover:border-indigo-500"
                    : "border-gray-200 hover:border-indigo-400"
                } transition-all shadow-sm`}
              >
                <div className="text-indigo-400 mb-2 sm:mb-4">
                  {React.cloneElement(feature.icon, {
                    className: "w-5 h-5 sm:w-6 sm:h-6",
                  })}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } text-xs sm:text-sm md:text-base`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section
        id="developer"
        className={`py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-800/30" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              The Developer
            </h2>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto text-sm sm:text-base`}
            >
              The creative mind behind EndVerse AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Developer Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`${
                darkMode ? "bg-gray-800/50" : "bg-white"
              } rounded-lg overflow-hidden border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } shadow-sm col-span-1 md:col-span-2 lg:col-span-1`}
            >
              <div className="p-4 sm:p-6">
                <img
                  src="https://avatars.githubusercontent.com/u/160850571?v=4" // Replace with actual image URL
                  alt="Harsh"
                  className="w-32 h-32 mx-auto rounded-full mb-4 border-2 border-indigo-500"
                  loading="lazy"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-1">
                  Harsh
                </h3>
                <p
                  className={`${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  } text-sm sm:text-base text-center mb-2`}
                >
                  Full Stack Developer & AI Enthusiast
                </p>
                <p
                  className={`${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } text-sm text-center mb-4`}
                >
                  Creator of EndVerse AI with expertise in React, Node.js, and machine learning. Passionate about building innovative AI solutions.
                </p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://github.com/201Harsh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com/201Harshs" // Replace with actual Instagram URL
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* AI Versions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={`${
                darkMode ? "bg-gray-800/50" : "bg-white"
              } rounded-lg overflow-hidden border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } shadow-sm`}
            >
              <div className="p-4 sm:p-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1006/1006363.png" // AI icon
                  alt="AI Versions"
                  className="w-24 h-24 mx-auto mb-4"
                  loading="lazy"
                />
                <h3 className="text-lg sm:text-xl font-bold text-center mb-1">
                  AI Versions
                </h3>
                <p
                  className={`${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  } text-sm sm:text-base text-center mb-2`}
                >
                    Powered by EndGaming AI
                  </p>
                <div className="space-y-2">
                  <div className={`${
                    darkMode ? "bg-gray-700/50" : "bg-gray-100"
                  } p-2 rounded`}>
                    <p className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } font-medium`}>EndGaming AI v1.0</p>
                    <p className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } text-xs`}>Initial release with basic NLP</p>
                  </div>
                  <div className={`${
                    darkMode ? "bg-gray-700/50" : "bg-gray-100"
                  } p-2 rounded`}>
                    <p className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } font-medium`}>EndGaming AI v2.0</p>
                    <p className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } text-xs`}>Enhanced with deep learning</p>
                  </div>
                  <div className={`${
                    darkMode ? "bg-gray-700/50" : "bg-gray-100"
                  } p-2 rounded`}>
                    <p className={`${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    } font-medium`}>EndGaming AI v3.5</p>
                    <p className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } text-xs`}>Multi-modal AI capabilities</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Development Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${
                darkMode ? "bg-gray-800/50" : "bg-white"
              } rounded-lg overflow-hidden border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              } shadow-sm`}
            >
              <div className="p-4 sm:p-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" // Code icon
                  alt="Development"
                  className="w-24 h-24 mx-auto mb-4"
                  loading="lazy"
                />
                <h3 className="text-lg sm:text-xl font-bold text-center mb-1">
                  Development
                </h3>
                <p
                  className={`${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  } text-sm sm:text-base text-center mb-2`}
                >
                  Tech Stack & Tools
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className={`${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                  } px-2 py-1 rounded text-xs`}>React</span>
                  <span className={`${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                  } px-2 py-1 rounded text-xs`}>Node.js</span>
                  <span className={`${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                  } px-2 py-1 rounded text-xs`}>Python</span>
                  <span className={`${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                  } px-2 py-1 rounded text-xs`}>React Native</span>
                  <span className={`${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                  } px-2 py-1 rounded text-xs`}>MongoDB</span>
                  <span className={`${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                  } px-2 py-1 rounded text-xs`}>Tailwind CSS</span>
                </div>
                <p className={`${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } text-xs mt-4 text-center`}>
                  Developed by 201Harshs (Harsh)
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className={`py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              How It Works
            </h2>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto text-sm sm:text-base`}
            >
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
                      <p
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } text-sm sm:text-base`}
                      >
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
      <section
        id="pricing"
        className={`py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-800/30" : "bg-gray-50"
        }`}
      >
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
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto text-sm sm:text-base`}
            >
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
                className={`${
                  darkMode ? "bg-gray-800/50" : "bg-white"
                } rounded-lg sm:rounded-xl border ${
                  plan.popular
                    ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                    : darkMode
                    ? "border-gray-700"
                    : "border-gray-200"
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
                      <span
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } text-sm sm:text-base`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } text-xs sm:text-sm`}
                        >
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
                        : darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
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
      <section
        className={`py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-800/50" : "bg-white"
        }`}
      >
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
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto text-sm sm:text-base`}
            >
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
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl relative border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                onClick={prevTestimonial}
                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                } p-1 sm:p-2 rounded-full z-10`}
              >
                <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-100 hover:bg-gray-200"
                } p-1 sm:p-2 rounded-full z-10`}
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
                        : darkMode
                        ? "text-gray-600"
                        : "text-gray-300"
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
                  <p
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } text-xs sm:text-sm`}
                  >
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
                      : darkMode
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section
        className={`py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
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
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto text-sm sm:text-base`}
            >
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
                <div
                  className={`relative ${
                    darkMode ? "bg-gray-800/50" : "bg-white"
                  } rounded-lg sm:rounded-xl overflow-hidden border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={prevShowcase}
                    className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    } p-1 sm:p-2 rounded-full z-10`}
                  >
                    <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextShowcase}
                    className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    } p-1 sm:p-2 rounded-full z-10`}
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
                        <p
                          className={`${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          } text-xs sm:text-sm`}
                        >
                          Generated with EndVerse AI
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${
                        darkMode ? "bg-gray-700/50" : "bg-gray-100"
                      } rounded-lg overflow-hidden mb-2 sm:mb-4`}
                    >
                      <img
                        src={showcaseItems[showcaseIndex].image}
                        alt={showcaseItems[showcaseIndex].prompt}
                        className="w-full h-48 sm:h-64 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div
                      className={`${
                        darkMode ? "bg-gray-800" : "bg-gray-100"
                      } p-2 sm:p-3 md:p-4 rounded-lg`}
                    >
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        } font-medium mb-1 text-xs sm:text-sm`}
                      >
                        Prompt:
                      </p>
                      <p
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } text-xs sm:text-sm`}
                      >
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
                          : darkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
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
                      className={`${
                        darkMode ? "bg-gray-800/50" : "bg-white"
                      } rounded-lg sm:rounded-xl border ${
                        darkMode ? "border-gray-700" : "border-gray-200"
                      } overflow-hidden`}
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
                        <p
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } mb-4 sm:mb-6 pl-8 sm:pl-11 text-sm sm:text-base`}
                        >
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
                        <p
                          className={`${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          } whitespace-pre-line pl-8 sm:pl-11 text-sm sm:text-base`}
                        >
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
      <section
        id="faq"
        className={`py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-800/30" : "bg-white"
        }`}
      >
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
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto text-sm sm:text-base`}
            >
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
                className={`${
                  darkMode ? "bg-gray-800/50" : "bg-white"
                } rounded-lg sm:rounded-xl overflow-hidden border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <button
                  className="w-full flex justify-between items-center p-3 sm:p-4 md:p-6 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-medium">
                    {faq.question}
                  </h3>
                  <FiChevronDown
                    className={`text-indigo-400 transition-transform duration-200 w-4 h-4 sm:w-5 sm:h-5 ${
                      activeFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div
                    className={`px-4 sm:px-6 pb-4 sm:pb-6 pt-0 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } text-xs sm:text-sm md:text-base`}
                  >
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-12 sm:py-16 md:py-20 ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-r ${
              darkMode
                ? "from-indigo-900/50 to-purple-900/50"
                : "from-indigo-100 to-purple-100"
            } rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Experience EndVerse AI?
            </h2>
            <p
              className={`text-base sm:text-lg md:text-xl ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } max-w-2xl mx-auto mb-6 sm:mb-8`}
            >
              Join thousands of users who are already boosting their
              productivity and creativity with our AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base"
              >
                Get Started - It's Free <FiArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${
                  darkMode
                    ? "bg-transparent border border-gray-500 hover:border-gray-400 text-white"
                    : "bg-white border border-gray-200 hover:border-gray-300 text-gray-900"
                } font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center transition-all text-sm sm:text-base`}
              >
                Schedule a Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${darkMode ? "bg-gray-900" : "bg-white"} border-t ${
          darkMode ? "border-gray-800" : "border-gray-200"
        } py-8 sm:py-12`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <FaRobot className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
                <span className="ml-2 text-xl sm:text-2xl font-bold">
                  EndVerse AI
                </span>
              </div>
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } mb-3 sm:mb-4 text-xs sm:text-sm`}
              >
                The most advanced AI assistant with integrated image generation.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="#"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition`}
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition`}
                  aria-label="Discord"
                >
                  <FaDiscord className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition`}
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition`}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="#"
                  className={`${
                    darkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition`}
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3
                className={`text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Product
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a
                    href="#features"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    } transition text-xs sm:text-sm`}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    } transition text-xs sm:text-sm`}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    } transition text-xs sm:text-sm`}
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    } transition text-xs sm:text-sm`}
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3
                className={`text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Resources
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a
                    href="#"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    } transition text-xs sm:text-sm`}
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    } transition text-xs sm:text-sm`}
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    } transition text-xs sm:text-sm`}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    } transition text-xs sm:text-sm`}
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
