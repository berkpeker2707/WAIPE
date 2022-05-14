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

const updateUserController = expressHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findByIdAndUpdate(_id, {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      password: req?.body?.password,
      picture: req?.body?.picture, //
      biography: req?.body?.biography,
      locations: {
        country: req?.body?.locations?.country,
        city: req?.body?.locations?.city,
      },
      phone: req?.body?.phone,
      email: req?.body?.email,
      visibility: req?.body?.visibility,
      handOrientation: req?.body?.handOrientation,
    });

    res.status(200).send("Updated");
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  getUserController,
  updateUserController,
};
