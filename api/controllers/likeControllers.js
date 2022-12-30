const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const expressHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

// like unline post controller ***
const updatePostLikeController = expressHandler(async (req, res) => {
  try {
    const likeID = req.params.id;
    const selectedLike = await Like.findById(likeID);
    const userID = req.user.id;
    const likeType = req.body.likeType;
    const user = await User.findById(userID);

    const like = await Like.findById(likeID)
      .populate({ path: "postID", model: "Post" })
      .populate({ path: "like.ownerID", model: "User", select: "-password" })
      .exec();

    if (
      like.like.find((element) => element.likeType === likeType) &&
      like.like.find((element) => element.ownerID._id.toString() === userID)
    ) {
      await like.updateOne(
        {
          $pull: { like: { ownerID: userID, likeType: likeType } },
        },
        { multi: true }
      );
      await user.updateOne({ $pull: { likedPosts: selectedLike.postID } });

      res.status(200).json(like);
    } else {
      await like.updateOne(
        {
          $push: { like: [{ ownerID: userID, likeType: likeType }] },
        },
        { upsert: true }
      );
      await user.updateOne({ $push: { likedPosts: selectedLike.postID } });

      res.status(200).json(like);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// like unlike comment controller xxx
const updateCommentLikeController = expressHandler(async (req, res) => {
  try {
    const childCommentID = req.params.id;
    const userID = req.user.id;
    const likeType = req.body.likeType;

    const comment = await Comment.find({
      "comment._id": childCommentID,
    })
      .populate({
        path: "comment.likedBy.ownerID",
        model: "User",
        select: "-password",
      })
      .exec();

    if (
      comment.find((element) =>
        element.comment.find((el) => el._id.toString() === childCommentID)
      ) &&
      comment.find((element) =>
        element.comment.find((el) =>
          el.likedBy.find((ell) => ell.likeType === likeType)
        )
      )
    ) {
      console.log("TEST1");
      await comment[0].updateOne(
        {
          $pull: { likedBy: { ownerID: userID, likeType: likeType } },
        },
        { multi: true }
      );

      res.status(200).json(comment);
    } else {
      console.log("TEST2");
      await comment[0].updateOne(
        {
          // $push: {
          comment: {
            $push: {
              likedBy: [{ ownerID: userID, likeType: likeType }],
            },
          },
        },
        // },
        { upsert: true }
      );

      res.status(200).json(comment);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = {
  updatePostLikeController,
  updateCommentLikeController,
};
