const Post = require("../models/post");
const Like = require("../models/like");
const Pet = require("../models/pet");
const expressHandler = require("express-async-handler");

const postPostController = expressHandler(async (req, res) => {
  try {
    const post = await Post.create({
      postImage: req?.body?.postImage,
      postDescription: req?.body?.postDescription,
      owner: req?.body?.owner,
    });

    const like = await Like.create({
      owner: post._id,
    });

    await Post.updateOne({ _id: post._id }, { $set: { like: like._id } });

    const pet = await Pet.findById(post.owner);
    pet.petPost.push(post._id);
    await pet.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getPostController = expressHandler(async (req, res) => {
  try {
    const posts = await Post.find({ _id: req.params.postID });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getPetPostsController = expressHandler(async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.params.petID });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getAllPostsController = expressHandler(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  postPostController,
  getPostController,
  getPetPostsController,
  getAllPostsController,
};
