const express = require("express");
const passport = require("passport");
const {
  preSignupController,
  verifySignupController,
  signupController,
  signinController,
  signinWithGoogleController,
  forgotPasswordController,
  verifyPasswordController,
} = require("../controllers/authControllers");
require("../config/passport")(passport);
const rateLimit = require("express-rate-limit");

//limitting per ip
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 5 create account requests per `window` (here, per hour)
  message: "Too many accounts created, please try again after an hour",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const authRoutes = express.Router();

authRoutes.post("/presignup", createAccountLimiter, preSignupController);
authRoutes.post("/verify-signup", verifySignupController);
authRoutes.post("/signup", createAccountLimiter, signupController);
authRoutes.post("/signin", createAccountLimiter, signinController); //test, delete it from login after
authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  signinWithGoogleController
);
authRoutes.post("/forgot-password", forgotPasswordController);
authRoutes.post("/verify-password", verifyPasswordController);

module.exports = authRoutes;
