const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  getPetController,
  postPetController,
} = require("../controllers/petControllers");

const petRoutes = express.Router();

petRoutes.get("/pet/:id", verifyToken, getPetController);
petRoutes.post("/new/pet", verifyToken, postPetController);

module.exports = petRoutes;
