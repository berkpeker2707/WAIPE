const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  getUserController,
  forgetPasswordController,
  resetPasswordController,
  blockUserController,
  followPetController,
  blockPetController,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/user", verifyToken, getUserController);
userRoutes.post("/forgot-password", verifyToken, forgetPasswordController);
userRoutes.post("/reset-password", verifyToken, resetPasswordController);
userRoutes.put("/block/user", verifyToken, blockUserController);
userRoutes.put("/follow/pet", verifyToken, followPetController);
userRoutes.put("/block/pet", verifyToken, blockPetController);

module.exports = userRoutes;
