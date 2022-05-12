const express = require("express");
const { verifyToken } = require("../middleware/auth");

const {
  postUserController,
  postPostController,
  postCommentController,
} = require("../controllers/postControllers");

const postRoutes = express.Router();

// postRoutes.post();
// postRoutes.get("/posts", verifyToken, postPostController);
postRoutes.post("/:id/new/comment", verifyToken, postCommentController);

module.exports = postRoutes;
