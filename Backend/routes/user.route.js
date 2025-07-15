const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/verify-email",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("otp").isNumeric().withMessage("OTP must be a number"),
  ],
  userController.verifyEmailUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.post("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
