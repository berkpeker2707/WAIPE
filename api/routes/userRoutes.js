const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  getUserController,
  blockUserController,
  followPetController,
  blockPetController,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/user", verifyToken, getUserController);
userRoutes.put("/block/user", verifyToken, blockUserController);
userRoutes.put("/follow/pet", verifyToken, followPetController);
userRoutes.put("/block/pet", verifyToken, blockPetController);

module.exports = userRoutes;
