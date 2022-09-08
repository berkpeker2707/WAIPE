const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const expressHandler = require("express-async-handler");
const { findOne, updateOne } = require("../models/pet");

// const getPostLikesController = expressHandler(async (req, res) => {
//   try {
//     const likes = await Like.find({ _id: req.params.likeID });
//     res.status(200).json(likes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// const getCommentLikesController = expressHandler(async (req, res) => {
//   try {
//     const likes = await Like.find({ ownerID: req.params.petID });
//     res.status(200).json(likes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// const getUsersPostLikesController = expressHandler(async (req, res) => {
//   try {
//     const likes = await Like.find({});
//     res.status(200).json(likes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// const getUsersCommentLikesController = expressHandler(async (req, res) => {
//   try {
//     const likes = await Like.find({});
//     res.status(200).json(likes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// *
const updatePostLikeController = expressHandler(async (req, res) => {
  const likeID = req.params.id;
  const selectedLike = await Like.findById(likeID);
  const userID = req.user.id;
  const likeType = req.body.likeType;
  const user = await User.findById(userID);

  try {
    const like = await Like.findById(likeID);
    if (
      like.like.find((element) => element.likeType === likeType) &&
      like.like.find((element) => element.ownerID.toString() === userID)
    ) {
      await like.updateOne(
        {
          $pull: { like: { ownerID: userID, likeType: likeType } },
        },
        { multi: true }
      );
      await user.updateOne({ $pull: { likedPosts: selectedLike.postID } });
    } else {
      await like.updateOne(
        {
          $push: { like: [{ ownerID: userID, likeType: likeType }] },
        },
        { upsert: true }
      );
      await user.updateOne({ $push: { likedPosts: selectedLike.postID } });
    }

    res.status(200).json(like);
  } catch (error) {
    res.status(500).json(error);
  }
});

// const deleteLikeController = expressHandler(async (req, res) => {
//   try {
//     const like = await Like.create({
//       likeImage: req?.body?.likeImage,
//       likeDescription: req?.body?.likeDescription,
//       ownerID: req?.body?.ownerID,
//     });

//     await Like.updateOne({ _id: like._id }, { $set: { like: like._id } });

//     const pet = await Pet.findById(like.ownerID);
//     pet.petLike.push(like._id);
//     await pet.save();

//     res.status(200).json(like);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//
const likeCommentController = expressHandler(async (req, res) => {
  try {
    // const parentCommentID = req.body.parentCommentID;
    // const childCommentID = req.body.childCommentID;

    // const comment = await Comment.findOneAndUpdate(
    //   { _id: parentCommentID },
    //   {
    //     $push: { comment: [{ ownerID: userID, commentText: commentText }] },
    //   },
    //   { new: true }
    // );

    // const childCommentID = comment.comment[comment.comment.length - 1];

    // if (user.postedComments.includes(childCommentID)) {
    //   res.status(200).json(comment);
    // } else {
    //   await user.updateOne({
    //     $push: { postedComments: childCommentID },
    //   });
    //   res.status(200).json(comment);
    // }

    // const comment = await Comment.findOneAndUpdate(
    //   { _id: parentCommentID },
    //   {
    //     $push: { comment: [{ ownerID: userID, commentText: commentText }] },
    //   },
    //   { new: true }
    // );

    // const childCommentID = comment.comment[comment.comment.length - 1];

    // if (user.postedComments.includes(childCommentID)) {
    //   res.status(200).json(comment);
    // } else {
    //   await user.updateOne({
    //     $push: { postedComments: childCommentID },
    //   });
    //   res.status(200).json(comment);
    // }

    // const s = Comment.find({ comment: { $in: [childCommentID] } });
    // console.log(s);

    // console.log(comment[0].comment[0].likes);

    // if (comment.includes(childCommentID)) {
    //   console.log("I HAVE");
    // } else {
    //   console.log("I DONT");
    // }
    // await User.findOneAndUpdate(
    //   {
    //     _id: userID,
    //   },
    //   {
    //     $pull: {
    //       postedComments: childCommentID,
    //     },
    //   },
    //   { multi: true }
    // );

    // await User.findOneAndUpdate(
    //   {
    //     _id: userID,
    //   },
    //   {
    //     $pull: {
    //       postedComments: childCommentID,
    //     },
    //   },
    //   { multi: true }
    // );
    // const like = await Like.create({
    //   likeImage: req?.body?.likeImage,
    //   likeDescription: req?.body?.likeDescription,
    //   ownerID: req?.body?.ownerID,
    // });

    // await Like.updateOne({ _id: like._id }, { $set: { like: like._id } });

    // const pet = await Pet.findById(like.ownerID);
    // pet.petLike.push(like._id);
    // await pet.save();

    res.status(200).json("comment");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  // getPostLikesController,
  // getCommentLikesController,
  // getUsersPostLikesController,
  // getUsersCommentLikesController,
  updatePostLikeController,
  // deleteLikeController,
  likeCommentController,
};