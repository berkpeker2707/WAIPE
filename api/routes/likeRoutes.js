const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const {
  updatePostLikeController,
  updateCommentLikeController,
} = require("../controllers/likeControllers");

const likeRoutes = express.Router();

likeRoutes.put("/update/post/:id", verifyToken, updatePostLikeController);
likeRoutes.put("/update/comment/:id", verifyToken, updateCommentLikeController);

module.exports = likeRoutes;
