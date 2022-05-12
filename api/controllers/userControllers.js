const User = require("../models/user");
const Pet = require("../models/pet");
const Comment = require("../models/comment");
const Post = require("../models/post");
const expressHandler = require("express-async-handler");

const getProfile = expressHandler(async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);

    let pets = [];
    for (let i = 0; i < user.pets.length; i++) {
      const pet = await Pet.findById(user.pets[i]);
      pets.push({ _id: pet._id, name: pet.name, picture: pet.picture });
    }

    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      picture: user.picture,
      biography: user.biography,
      locations: { country: user.locations.country, city: user.locations.city },
      phone: user.phone,
      email: user.email,
      pets: pets,
      handOrientation: user.handOrientation,
      visibility: user.visibility,
    });
  } catch (error) {
    res.json(error);
  }
});

const getPetProfile = expressHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findById(id);
    res.json(pet);
  } catch (error) {
    res.json(error);
  }
});

const postPetProfile = expressHandler(async (req, res) => {
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

const postComment = expressHandler(async (req, res) => {
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
  getProfile,
  getPetProfile,
  postPetProfile,
  postComment,
};
