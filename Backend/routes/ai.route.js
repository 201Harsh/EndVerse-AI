const router = require("express").Router();
const AIController = require("../controllers/ai.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/chat", authMiddleware.authUser, AIController.ChatAI);

module.exports = router;
