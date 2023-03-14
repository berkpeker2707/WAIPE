const express = require("express");
const {
  postPostReportController,
  postUserReportController,
  postCommentReportController,
  postPetReportController,
} = require("../controllers/reportController");
const { verifyToken } = require("../middlewares/auth");

const reportRoutes = express.Router();

reportRoutes.post("/post/create", verifyToken, postPostReportController);
reportRoutes.post("/user/create", verifyToken, postUserReportController);
reportRoutes.post("/comment/create", verifyToken, postCommentReportController);
reportRoutes.post("/pet/create", verifyToken, postPetReportController);

module.exports = reportRoutes;
