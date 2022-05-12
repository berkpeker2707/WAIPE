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

module.exports = {
  postCommentController,
};
