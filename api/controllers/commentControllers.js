const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/like");
const expressHandler = require("express-async-handler");

// *
const updateCommentController = expressHandler(async (req, res) => {
  const parentCommentID = req.params.id;
  const userID = req.user.id;
  const commentText = req.body.commentText;
  const user = await User.findById(userID);

  try {
    // const comment = await Comment.findById(parentCommentID);

    // await comment.updateOne(
    //   {
    //     $push: { comment: [{ ownerID: userID, commentText: commentText }] },
    //   },
    //   { upsert: true }
    // );

    const comment = await Comment.findOneAndUpdate(
      { _id: parentCommentID },
      {
        $push: { comment: [{ ownerID: userID, commentText: commentText }] },
      },
      // { upsert: true },
      { new: true }
    );

    const childCommentID = comment.comment[comment.comment.length - 1];

    // console.log(comment.comment[comment.comment.length - 1]);

    if (user.commentedOn.includes(childCommentID)) {
      res.status(200).json(comment);
    } else {
      await user.updateOne({
        $push: { commentedOn: childCommentID },
      });
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// *
const getCommentController = expressHandler(async (req, res) => {
  try {
    const comment = await Comment.find({ _id: req.params.id });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
const deleteCommentController = expressHandler(async (req, res) => {
  const parentCommentID = req.body.parentCommentID;
  const childCommentID = req.body.childCommentID;
  const userID = req.user.id;

  try {
    const allComment = await Comment.findById(parentCommentID);

    const updatedComment = await Comment.updateOne(
      { _id: parentCommentID },
      {
        $pull: {
          comment: { _id: childCommentID },
        },
      },
      { multi: true }
    );

    const comment = await Comment.find({
      "comment._id": childCommentID,
    });

    if (allComment.comment.length > 1) {
      res.json(allComment);
    } else {
      console.log("PULL FROM USER AS WELL");

      const user = await User.findById(userID);

      await user.updateOne({ $pull: { commentedOn: parentCommentID } });

      res.json(allComment);
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  updateCommentController,
  getCommentController,
  deleteCommentController,
};
