const User = require("../models/user");
const Pet = require("../models/pet");
const expressHandler = require("express-async-handler");

const getPetController = expressHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findById(id);
    res.json(pet);
  } catch (error) {
    res.json(error);
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

module.exports = {
  getPetController,
  postPetController,
};
