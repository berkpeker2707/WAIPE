const User = require("../models/user");
const Pet = require("../models/pet");
const Comment = require("../models/comment");
const Post = require("../models/post");
const expressHandler = require("express-async-handler");

const postPostController = expressHandler(async (req, res) => {
  try {
    const post = await Post.create({
      postImage: req?.body?.postImage,
      postDescription: req?.body?.postDescription,
      owner: req?.body?.owner,
    });
    res.json(post);
  } catch (error) {
    res.json(error);
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

const updatePost = expressHandler(async (req, res) => {
  const { postID } = req.params;
  const { postDescription } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(postID, {
      postDescription: postDescription,
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  postPostController,
  getPostController,
  getPetPostsController,
  getAllPostsController,
  updatePost,
};
