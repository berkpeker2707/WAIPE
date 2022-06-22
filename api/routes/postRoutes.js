const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const {
  postPostController,
  getPostController,
  getPetPostsController,
  getAllPostsController,
  updatePostController,
  deletePostController,
} = require("../controllers/postControllers");

const postRoutes = express.Router();

postRoutes.post("/new/:id", verifyToken, postPostController);
postRoutes.get("/fetch/:postID", verifyToken, getPostController);
postRoutes.get("/fetch/pet/:petID", verifyToken, getPetPostsController);
postRoutes.get("/fetch", verifyToken, getAllPostsController);
postRoutes.put("/update/:postID", verifyToken, updatePostController);
postRoutes.delete("/delete/:postID", verifyToken, deletePostController);

module.exports = postRoutes;
