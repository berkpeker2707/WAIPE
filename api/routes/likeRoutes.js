const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const {
  // createLikeController,
  getPostLikesController,
  getCommentLikesController,
  getUsersPostLikesController,
  getUsersCommentLikesController,
  updateLikeController,
  deleteLikeController,
} = require("../controllers/likeControllers");

const likeRoutes = express.Router();

// likeRoutes.post("/new", verifyToken, createLikeController);
likeRoutes.get("/likes/post/:id", verifyToken, getPostLikesController);
likeRoutes.get("/likes/comment/:id", verifyToken, getCommentLikesController);
likeRoutes.get(
  "/likes/post/user/:id",
  verifyToken,
  getUsersPostLikesController
);
likeRoutes.get(
  "/likes/comment/user/:id",
  verifyToken,
  getUsersCommentLikesController
);
likeRoutes.put("/update/:id", verifyToken, updateLikeController);
likeRoutes.delete("/delete/:id", verifyToken, deleteLikeController);

module.exports = likeRoutes;
