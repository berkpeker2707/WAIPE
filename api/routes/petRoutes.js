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

const rateLimit = require("express-rate-limit");

//limitting per ip
const createPetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 create account requests per `window` (here, per hour)
  message: "Too many pets created, please try again after an hour",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const petRoutes = express.Router();

petRoutes.get("/:id", verifyToken, getPetController);
petRoutes.post("/new", [verifyToken, createPetLimiter], postPetController);
petRoutes.put("/update/:id", verifyToken, updatePetController);
petRoutes.post(
  "/upload/photo/:id",
  [verifyToken, photoResize],
  uploadPetPhotoController
);
petRoutes.delete("/delete/photo/:id", verifyToken, deletePetPhotoController);
petRoutes.delete("/delete/:id", verifyToken, deletePetController);

module.exports = petRoutes;
