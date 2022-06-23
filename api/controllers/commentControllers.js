const Comment = require("../models/comment");
const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/like");
const expressHandler = require("express-async-handler");

// *
const updateCommentController = expressHandler(async (req, res) => {
  const commentID = req.params.id;
  const userID = req.user.id;
  const commentText = req.body.commentText;
  const user = await User.findById(userID);

  try {
    const comment = await Comment.findById(commentID);
    // console.log(user);

    await comment.updateOne(
      {
        $push: { comment: [{ ownerID: userID, commentText: commentText }] },
      },
      { upsert: true }
    );
    await user.updateOne({ $push: { commentedOn: commentID } });

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
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
  updateCommentController,
  getCommentController,
  getPostCommentsController,
  deleteCommentController,
};
