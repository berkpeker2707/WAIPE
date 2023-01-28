const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { photoUpload, photoResize } = require("../middlewares/photoUpload");

const {
  postPostController,
  getPostController,
  getPetPostsController,
  getAllPostsController,
  getFollowedPostsController,
  updatePostController,
  deletePostController,
  archivePostController,
} = require("../controllers/postControllers");

const postRoutes = express.Router();

postRoutes.post(
  "/newPost/newPetPost",
  verifyToken,
  photoUpload.single("image"),
  photoResize,
  postPostController
);
postRoutes.get("/fetch/:postID", verifyToken, getPostController);
postRoutes.get("/fetch/pet/:petID", verifyToken, getPetPostsController);
postRoutes.get("/fetch", verifyToken, getAllPostsController);
postRoutes.get("/fetch/all/followed", verifyToken, getFollowedPostsController);
postRoutes.put("/update/:postID", verifyToken, updatePostController);
postRoutes.delete("/delete/:postID", verifyToken, deletePostController);
postRoutes.put("/archive", verifyToken, archivePostController);

module.exports = postRoutes;
