const express = require("express");
const {
  signupController,
  signinController,
} = require("../controllers/authControllers");

const authRoutes = express.Router();

authRoutes.post("/signup", signupController);
authRoutes.get("/signin", signinController);

module.exports = authRoutes;
