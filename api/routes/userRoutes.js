const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { photoUpload, photoResize } = require("../middlewares/photoUpload");

const {
  getCurrentUserController,
  getUserController,
  getAllUserController,
  blockUserController,
  followPetController,
  blockPetController,
  updateUserController,
  pictureUploadController,
  pictureDeleteController,
  userDeleteController,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/me", verifyToken, getCurrentUserController);
userRoutes.get("/:id", verifyToken, getUserController);
userRoutes.get("/fetch/all", verifyToken, getAllUserController);
userRoutes.put("/update", verifyToken, updateUserController);
userRoutes.put("/block/user", verifyToken, blockUserController);
userRoutes.put("/follow/pet", verifyToken, followPetController);
userRoutes.put("/block/pet", verifyToken, blockPetController);
userRoutes.post(
  "/upload/profile/image",
  [verifyToken, photoResize],
  pictureUploadController
);
userRoutes.delete(
  "/delete/profile/image",
  verifyToken,
  pictureDeleteController
);
userRoutes.delete("/delete", verifyToken, userDeleteController);

module.exports = userRoutes;
