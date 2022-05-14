const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  getUserController,
  postUserController,
  updateUserController,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/", verifyToken, getUserController);
userRoutes.put("/update", verifyToken, updateUserController);
// userRoutes.post();

module.exports = userRoutes;
