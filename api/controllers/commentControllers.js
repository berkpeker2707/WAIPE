const Comment = require("../models/comment");
const Post = require("../models/post");
const expressHandler = require("express-async-handler");

const postCommentController = expressHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const comment = await Comment.create({
      commentText: req?.body?.commentText,
      post: id,
      sender: user._id,
    });

    const post = await Post.findById(id);
    post.comments.push(comment._id);
    await post.save();

    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

const getCommentController = expressHandler(async (req, res) => {
  try {
    const comment = await Comment.find({ _id: req.params.id });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getPostCommentsController = expressHandler(async (req, res) => {
  try {
    const posts = await Post.find({ _id: req.params.id }).select("comments");
    const numOfComments = posts[0].comments;
    for (var i = 0; i < numOfComments.length; i++) {
      const comments = await Comment.find({ i });
      res.status(200).json(comments);
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
//
const deleteCommentController = expressHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const post = await findById(id);
    post.comments.pop(id);
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  postCommentController,
  getCommentController,
  getPostCommentsController,
  deleteCommentController,
};
