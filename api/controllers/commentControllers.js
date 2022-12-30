const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/like");
const expressHandler = require("express-async-handler");

// update comment controller ***
const updateCommentController = expressHandler(async (req, res) => {
  try {
    const parentCommentID = req.params.id;
    const userID = req.user.id;
    const commentText = req.body.commentText;
    const user = await User.findById(userID);

    const comment = await Comment.findOneAndUpdate(
      { _id: parentCommentID },
      {
        $push: { comment: [{ ownerID: userID, commentText: commentText }] },
      },
      { new: true }
    );

    const childCommentID = comment.comment[comment.comment.length - 1];

    if (user.postedComments.includes(childCommentID)) {
      res.status(200).json(comment);
    } else {
      await user.updateOne({
        $push: { postedComments: childCommentID },
      });
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// fetch comment controller ***
const getCommentController = expressHandler(async (req, res) => {
  try {
    const comment = await Comment.find({ _id: req.params.id })
      .populate({ path: "comment.ownerID", model: "User", select: "-password" })
      .exec();
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete comment controller ***
const deleteCommentController = expressHandler(async (req, res) => {
  try {
    const parentCommentID = req.body.parentCommentID;
    const childCommentID = req.body.childCommentID;
    const userID = req.user.id;

    await Comment.findById(parentCommentID);
    const childCommentExists = await Comment.find({
      "comment._id": childCommentID,
    });

    if (childCommentExists.length > 0) {
      //remove child comment object from comment array
      await Comment.updateOne(
        { _id: parentCommentID },
        {
          $pull: {
            comment: { _id: childCommentID },
          },
        },
        { multi: true }
      );

      //remove postedComments from User collection
      await User.findOneAndUpdate(
        {
          _id: userID,
        },
        {
          $pull: {
            postedComments: childCommentID,
          },
        },
        { multi: true }
      );

      res.status(200).json("Comment deleted.");
    } else {
      res.status(200).json("Comment already deleted.");
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
