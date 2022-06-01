const User = require("../models/user");
const Pet = require("../models/pet");
const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");
const expressHandler = require("express-async-handler");

const getPetController = expressHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findById(id);
    res.json(pet);
  } catch (error) {
    res.status(500).json(error);
  }
});

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
      owner: _id, //
      petPost: req?.body?.petPost, //
    });

    const user = await User.findById(_id);
    user.pets.push(pet._id);
    await user.save();

    res.json(pet);
  } catch (error) {
    res.status(500).json(error);
  }
});

const updatePetController = expressHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findByIdAndUpdate(id, {
      name: req?.body?.name,
      picture: req?.body?.picture,
      age: req?.body?.age,
      biography: req?.body?.biography,
      species: req?.body?.species,
      breed: req?.body?.breed,
      interestedIn: req?.body?.interestedIn,
    });

    res.json(pet);
  } catch (error) {
    res.status(500).json(error);
  }
});

const deleteLike = async (owner, field) => {
  const like = await Like.findByIdAndDelete(owner.like);

  const likeBy = like.likeBy;
  for (let i = 0; i < likeBy.length; i++) {
    if (field === "post") {
      await User.updateOne(
        { _id: likeBy[i][0] },
        {
          $pullAll: {
            likedPosts: [{ _id: like.owner._id }],
          },
        }
      );
    } else if (field === "comment") {
      await User.updateOne(
        { _id: likeBy[i][0] },
        {
          $pullAll: {
            likedComments: [{ _id: like.owner._id }],
          },
        }
      );
    }
  }
};

const deletePetController = expressHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findByIdAndDelete(id);

    const posts = pet.petPost;
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findByIdAndDelete(posts[i]);
      await deleteLike(post, "post");

      const comments = post.comments;
      for (let j = 0; j < comments.length; j++) {
        const comment = await Comment.findByIdAndDelete(comments[j]);
        await deleteLike(comment, "comment");
      }
    }

    const userId = pet.owner;
    await User.updateOne(
      { _id: userId },
      {
        $pullAll: {
          pets: [{ _id: id }],
        },
      }
    );

    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  getPetController,
  postPetController,
  updatePetController,
  deletePetController,
};
