const User = require("../models/user");
const Pet = require("../models/pet");
const Comment = require("../models/comment");
const Post = require("../models/post");
const expressHandler = require("express-async-handler");

const postPetController = expressHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const pet = await Pet.create({
      name: req?.body?.name,
      age: req?.body?.age,
      biography: req?.body?.biography,
      species: req?.body?.species,
      breed: req?.body?.breed,
      interestedIn: req?.body?.interestedIn,
      owner: _id,
      petPost: req?.body?.petPost,
    });

    const user = await User.findById(_id);
    user.pets.push(pet._id);
    await user.save();

    res.json(pet);
  } catch (error) {
    res.json(error);
  }
});

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
  postPetController,
  postCommentController,
};
