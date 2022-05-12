const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  getUserController,
  postUserController,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/user", getUserController);
// userRoutes.post();

module.exports = userRoutes;
