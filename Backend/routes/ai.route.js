const router = require("express").Router();
const AIController = require("../controllers/ai.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/chat", authMiddleware.authUser, AIController.ChatAI);
router.post("/image", authMiddleware.authUser, AIController.ImageAI);
router.post("/code", authMiddleware.authUser, AIController.CodeAI);

module.exports = router;
