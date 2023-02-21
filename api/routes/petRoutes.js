const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { photoUpload, photoResize } = require("../middlewares/photoUpload");

const {
  getPetController,
  postPetController,
  updatePetController,
  uploadPetPhotoController,
  deletePetPhotoController,
  deletePetController,
} = require("../controllers/petControllers");

const petRoutes = express.Router();

petRoutes.get("/:id", verifyToken, getPetController);
petRoutes.post("/new", verifyToken, postPetController);
petRoutes.put("/update/:id", verifyToken, updatePetController);
petRoutes.post(
  "/upload/photo/:id",
  [verifyToken, photoResize],
  uploadPetPhotoController
);
petRoutes.delete("/delete/photo/:id", verifyToken, deletePetPhotoController);
petRoutes.delete("/delete/:id", verifyToken, deletePetController);

module.exports = petRoutes;
