const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  getUserController,
  followPetController,
  blockPetController,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/user", verifyToken, getUserController);
userRoutes.put("/follow", verifyToken, followPetController);
userRoutes.put("/block", verifyToken, blockPetController);

module.exports = userRoutes;
