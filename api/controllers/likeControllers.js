const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/pet");
const expressHandler = require("express-async-handler");
const { findOne } = require("../models/pet");

const getPostLikesController = expressHandler(async (req, res) => {
  try {
    const likes = await Like.find({ _id: req.params.likeID });
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getCommentLikesController = expressHandler(async (req, res) => {
  try {
    const likes = await Like.find({ ownerID: req.params.petID });
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getUsersPostLikesController = expressHandler(async (req, res) => {
  try {
    const likes = await Like.find({});
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getUsersCommentLikesController = expressHandler(async (req, res) => {
  try {
    const likes = await Like.find({});
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json(err);
  }
});

const updatePostLikeController = expressHandler(async (req, res) => {
  const likeID = req.params.id;
  const userID = req.user.id;
  const likeType = req.body.likeType;

  try {
    const like = await Like.findById(likeID);
    if (
      like.like.find((element) => element.likeType === likeType) &&
      like.like.find((element) => element.ownerID.toString() === userID)
    ) {
      console.log("OwnerID and likeType are equal // PULL");
      await like.updateOne(
        {
          $pull: { like: { ownerID: userID, likeType: likeType } },
        },
        { multi: true } // set this to true if you want to remove multiple elements.
      );
    } else {
      console.log("OwnerID and likeType are not equal // PUSH");
      await like.updateOne(
        {
          $push: { like: [{ ownerID: userID, likeType: likeType }] },
        },
        { upsert: true }
      );
    }
    // }

    res.status(200).json(like);
  } catch (error) {
    res.status(500).json(error);
  }
});

const deleteLikeController = expressHandler(async (req, res) => {
  try {
    const like = await Like.create({
      likeImage: req?.body?.likeImage,
      likeDescription: req?.body?.likeDescription,
      ownerID: req?.body?.ownerID,
    });

    await Like.updateOne({ _id: like._id }, { $set: { like: like._id } });

    const pet = await Pet.findById(like.ownerID);
    pet.petLike.push(like._id);
    await pet.save();

    res.status(200).json(like);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  getPostLikesController,
  getCommentLikesController,
  getUsersPostLikesController,
  getUsersCommentLikesController,
  updatePostLikeController,
  deleteLikeController,
};
