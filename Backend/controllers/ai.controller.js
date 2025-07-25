const ChatAIService = require("../services/ChatAI.service");
const ImageAIService = require("../services/ImageAI.service");
const CodeAIService = require("../services/CodeAI.service");
const UserModeel = require("../models/user.model");

module.exports.ChatAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }
    const UserId = req.user.id;

    const user = await UserModeel.findById(UserId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const UsersName = user.name;

    const answer = await ChatAIService({ prompt, UsersName });
    res.status(200).json({
      answer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.ImageAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const userId = req.user.id;

    const user = await UserModeel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.credits <= 0) {
      return res.status(400).json({
        error: "Insufficient credits",
      });
    }

    const answer = await ImageAIService({ prompt });
    res.status(200).json({
      answer,
    });

    user.credits -= 1;
    await user.save();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.CodeAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Prompt is required",
      });
    }

    const Code = await CodeAIService({ prompt });
    res.status(200).json({
      Code,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
