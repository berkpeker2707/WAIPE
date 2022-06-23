const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const {
  updateCommentController,
  getCommentController,
  getPostCommentsController,
  deleteCommentController,
} = require("../controllers/commentControllers");

const commentRoutes = express.Router();

commentRoutes.put("/update/:id", verifyToken, updateCommentController);

commentRoutes.get("/:id", verifyToken, getCommentController);
commentRoutes.get("/post/:id", verifyToken, getPostCommentsController);
commentRoutes.delete("/delete/:id", verifyToken, deleteCommentController);

module.exports = commentRoutes;
