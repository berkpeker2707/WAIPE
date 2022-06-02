const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const {
  photoUpload,
  profilePhotoResize,
} = require("../middlewares/photoUpload");

const {
  getUserController,
  forgetPasswordController,
  resetPasswordController,
  blockUserController,
  followPetController,
  blockPetController,
  updateUserController,
  pictureUploadController,
  pictureDeleteController,
  photoUploadController,
  photoDeleteController,
  archivedPostController,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/", verifyToken, getUserController);
userRoutes.put("/update", verifyToken, updateUserController);
userRoutes.post("/forgot-password", forgetPasswordController);
userRoutes.post("/reset-password", resetPasswordController);
userRoutes.put("/block/user", verifyToken, blockUserController);
userRoutes.put("/follow/pet", verifyToken, followPetController);
userRoutes.put("/block/pet", verifyToken, blockPetController);
userRoutes.post(
  "/image/profile/upload",
  verifyToken,
  photoUpload.single("image"),
  profilePhotoResize,
  pictureUploadController
);
userRoutes.delete(
  "/image/profile/delete",
  verifyToken,
  pictureDeleteController
);
userRoutes.post(
  "/image/upload",
  verifyToken,
  photoUpload.single("image"),
  profilePhotoResize,
  photoUploadController
);
userRoutes.delete("/image/delete", verifyToken, photoDeleteController);
userRoutes.put("/arcive/post", verifyToken, archivedPostController);

module.exports = userRoutes;
