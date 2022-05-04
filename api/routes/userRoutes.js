const express = require("express");

const {
  getProfile,
  getPetProfile,
  postPetProfile,
  postComment,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

module.exports = userRoutes;

userRoutes.get("/profile", getProfile);
userRoutes.get("/pet/:id", getPetProfile);
userRoutes.post("/new/pet", postPetProfile);
userRoutes.post("/new/comment", postComment);
