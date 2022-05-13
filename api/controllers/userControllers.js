const User = require("../models/user");
const Pet = require("../models/pet");
const expressHandler = require("express-async-handler");

const getUserController = expressHandler(async (req, res) => {
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

//block user & unblock user
const blockUserController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user.blockedUsers.includes(req.body.blockedUsers)) {
      await user.updateOne({ $push: { blockedUsers: req.body.blockedUsers } });
      res.status(200).json("User has been blocked");
    } else {
      await user.updateOne({ $pull: { blockedUsers: req.body.blockedUsers } });
      res.status(200).json("User has been unblocked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow & unfollow pet
const followPetController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user.followedPets.includes(req.body.followedPets)) {
      await user.updateOne({ $push: { followedPets: req.body.followedPets } });
      res.status(200).json("Pet has been followed");
    } else {
      await user.updateOne({ $pull: { followedPets: req.body.followedPets } });
      res.status(200).json("Pet has been unfollowed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//block & unblock pet
const blockPetController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user.blockedPets.includes(req.body.blockedPets)) {
      await user.updateOne({ $push: { blockedPets: req.body.blockedPets } });
      //if pet is already followed, remove id from followedPets as well
      await user.updateOne({ $pull: { followedPets: req.body.blockedPets } });
      res.status(200).json("Pet has been blocked");
    } else {
      await user.updateOne({ $pull: { blockedPets: req.body.blockedPets } });
      res.status(200).json("Pet has been unblocked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  getUserController,
  blockUserController,
  followPetController,
  blockPetController,
};
