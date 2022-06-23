const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const {
  getPostLikesController,
  getCommentLikesController,
  getUsersPostLikesController,
  getUsersCommentLikesController,
  updatePostLikeController,
  deleteLikeController,
} = require("../controllers/likeControllers");

const likeRoutes = express.Router();

// likeRoutes.post("/new", verifyToken, createLikeController);
likeRoutes.get("/fetch/post/:id", verifyToken, getPostLikesController);
likeRoutes.get("/fetch/comment/:id", verifyToken, getCommentLikesController);
likeRoutes.get(
  "/fetch/post/user/:id",
  verifyToken,
  getUsersPostLikesController
);
likeRoutes.get(
  "/fetch/comment/user/:id",
  verifyToken,
  getUsersCommentLikesController
);
likeRoutes.put("/update/post/:id", verifyToken, updatePostLikeController);
likeRoutes.delete("/delete/:id", verifyToken, deleteLikeController);

module.exports = likeRoutes;
