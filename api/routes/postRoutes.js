const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  postPostController,
  getAllPostsController,
  getPetPostsController,
  getPostController,
  updatePost,
} = require("../controllers/postControllers");

const postRoutes = express.Router();

postRoutes.post("/new/post", verifyToken, postPostController);
postRoutes.get("/post/:postID", verifyToken, getPostController);
postRoutes.get("/posts/:petID", verifyToken, getPetPostsController);
postRoutes.get("/posts", verifyToken, getAllPostsController);
postRoutes.put("/update/:postID", verifyToken, updatePost);

module.exports = postRoutes;
