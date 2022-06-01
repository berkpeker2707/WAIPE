const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const {
  getPetController,
  postPetController,
  updatePetController,
} = require("../controllers/petControllers");

const petRoutes = express.Router();

petRoutes.get("/:id", verifyToken, getPetController);
petRoutes.post("/new", verifyToken, postPetController);
petRoutes.put("/:id/update", verifyToken, updatePetController);

module.exports = petRoutes;
