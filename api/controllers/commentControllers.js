const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require("../models/like");
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
    const like = await Like.create({
      owner: comment._id,
    });

    await Comment.updateOne({ _id: comment._id }, { $set: { like: like._id } });

    const post = await Post.findById(id);
    post.comments.push(comment._id);
    await post.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  postCommentController,
};
