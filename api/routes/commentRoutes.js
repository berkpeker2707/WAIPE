const express = require("express");
const { verifyToken } = require("../middleware/auth");

const { postCommentController } = require("../controllers/commentControllers");

const commentRoutes = express.Router();

commentRoutes.post("/:id/new/comment", verifyToken, postCommentController);

module.exports = commentRoutes;
