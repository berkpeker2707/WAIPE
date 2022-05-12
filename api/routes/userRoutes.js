const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  getProfile,
  getPetProfile,
  postPetProfile,
  postComment,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/profile", getProfile);
userRoutes.get("/pet/:id", getPetProfile);
userRoutes.post("/new/pet", verifyToken, postPetProfile);
userRoutes.post("/:id/new/comment", verifyToken, postComment);

module.exports = userRoutes;
