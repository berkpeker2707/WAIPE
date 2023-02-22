const express = require("express");
const { verifyToken } = require("../middlewares/auth");

const {
  updateCommentController,
  getCommentController,
  deleteCommentController,
} = require("../controllers/commentControllers");

const commentRoutes = express.Router();

commentRoutes.put("/update/:id", verifyToken, updateCommentController);
commentRoutes.get("/fetch/:id", verifyToken, getCommentController);
commentRoutes.put("/delete", verifyToken, deleteCommentController);

module.exports = commentRoutes;
