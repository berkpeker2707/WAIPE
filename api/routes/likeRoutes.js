const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const {
  getPostLikeController,
  updatePostLikeController,
  updateCommentLikeController,
} = require("../controllers/likeControllers");

const likeRoutes = express.Router();

likeRoutes.get("/fetch/post/:postID", verifyToken, getPostLikeController);
likeRoutes.put("/update/post/:id", verifyToken, updatePostLikeController);
likeRoutes.put("/update/comment/:id", verifyToken, updateCommentLikeController);

module.exports = likeRoutes;
