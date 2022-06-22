const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/pet");
const expressHandler = require("express-async-handler");
var mongoose = require("mongoose");

const updateLikeController = expressHandler(async (req, res) => {
  const { postID } = req.body;
  const { likeID } = req.params;
  const { likeDescription } = req.body;

  try {
    const like = await Like.findByIdAndUpdate(likeID, {
      likeDescription: likeDescription,
    });

    res.status(200).json(like);
  } catch (error) {
    res.status(500).json(error);
  }
});

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
  // createLikeController,
  getPostLikesController,
  getCommentLikesController,
  getUsersPostLikesController,
  getUsersCommentLikesController,
  updateLikeController,
  deleteLikeController,
};
