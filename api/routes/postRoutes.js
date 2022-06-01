const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const {
  postPostController,
  getAllPostsController,
  getPetPostsController,
  getPostController,
} = require("../controllers/postControllers");

const postRoutes = express.Router();

postRoutes.post("/new/post", verifyToken, postPostController);
postRoutes.get("/post/:postID", verifyToken, getPostController);
postRoutes.get("/posts/:petID", verifyToken, getPetPostsController);
postRoutes.get("/posts", verifyToken, getAllPostsController);

module.exports = postRoutes;
