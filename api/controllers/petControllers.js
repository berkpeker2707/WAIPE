const User = require("../models/user");
const Pet = require("../models/pet");
const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");
const expressHandler = require("express-async-handler");
const fs = require("fs");
const {
  cloudinaryUploadPetImg,
  cloudinaryDeletePetImg,
} = require("../middlewares/cloudinary");

// *
const getPetController = expressHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const pet = await Pet.findById(id);
    res.json(pet);
  } catch (error) {
    res.status(500).json(error);
  }
});

// *
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
      ownerID: _id,
      petPost: req?.body?.petPost,
    });

    const user = await User.findById(_id);
    user.pets.push(pet._id);
    await user.save();

    res.json(pet);
  } catch (error) {
    res.status(500).json(error);
  }
});

// *
const updatePetController = expressHandler(async (req, res) => {
  const id = req.params.id;

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

// *
const uploadPetPhotoController = expressHandler(async (req, res) => {
  const id = req.params.id;
  const localPath = `photos/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadPetImg(localPath);

  const foundUser = await Pet.findByIdAndUpdate(
    id,
    {
      picture: imgUploaded?.data?.secure_url,
    },
    { new: true }
  );
  fs.unlinkSync(localPath);

  res.json(imgUploaded);
});

// *
const deletePetPhotoController = expressHandler(async (req, res) => {
  const id = req.params.id;
  const { selectedPhoto } = req?.body;

  const imgUploaded = await cloudinaryDeletePetImg(selectedPhoto);

  await Pet.findByIdAndUpdate(
    id,
    {
      picture: null,
    },
    { new: true }
  );

  res.json(imgUploaded);
});

// *
const deletePetController = expressHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const pet = await Pet.findByIdAndDelete(id);

    const postIDs = pet.petPost;
    for (let i = 0; i < postIDs.length; i++) {
      await Post.deleteOne({ _id: postIDs[i] });
    }

    const userId = pet.ownerID;
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
  uploadPetPhotoController,
  deletePetPhotoController,
  deletePetController,
};
