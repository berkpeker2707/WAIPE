const expressHandler = require("express-async-handler");
const UserReport = require("../models/reports/userReport");
const PostReport = require("../models/reports/postReport");
const PetReport = require("../models/reports/petReport");
const CommentReport = require("../models/reports/commentReport");

const postPostReportController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    await PostReport.create({
      reportSubject: req?.body?.reportSubject,
      postID: req?.body?.postID,
      petID: req?.body?.petID,
      picture: req?.body?.picture,
      postDescription: req?.body?.postDescription,
      reporter: _id,
    });

    res.status(200).json("Created report for post.");
  } catch (error) {
    res.status(500).json(error);
  }
});

const postUserReportController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    await UserReport.create({
      reportSubject: req?.body?.reportSubject,
      userID: req?.body?.userID,
      reporter: _id,
    });

    res.status(200).json("Created report for user.");
  } catch (error) {
    res.status(500).json(error);
  }
});

const postCommentReportController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    await CommentReport.create({
      reportSubject: req?.body?.reportSubject,
      postID: req?.body?.postID,
      ownerID: req?.body?.ownerID,
      commentText: req?.body?.commentText,
      commentID: req?.body?.commentID,
      reporter: _id,
    });

    res.status(200).json("Created report for comment.");
  } catch (error) {
    res.status(500).json(error);
  }
});

const postPetReportController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    await PetReport.create({
      reportSubject: req?.body?.reportSubject,
      petID: req?.body?.postID,
      ownerID: req?.body?.ownerID,
      reporter: _id,
    });

    res.status(200).json("Created report for pet.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  postPostReportController,
  postUserReportController,
  postCommentReportController,
  postPetReportController,
};
