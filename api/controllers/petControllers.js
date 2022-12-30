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

// fetch a pet controller ***
const getPetController = expressHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const pet = await Pet.findById(id)
      .populate({ path: "ownerID", model: "User", select: "-password" })
      .populate({ path: "petPost", model: "Post" })
      .exec();

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json(error);
  }
});

// post new pet controller ***
const postPetController = expressHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const pet = await Pet.create({
      name: req?.body?.name,
      picture: "",
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

    res.status(200).json("Created new pet.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// update pet controller ***
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

// upload pet profile photo controller ***
const uploadPetPhotoController = expressHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const localPath = `middlewares/photos/${req.files.image.originalFilename}`;
    const imgUploaded = await cloudinaryUploadPetImg(localPath, id);

    const foundPetProfilePicture = await Pet.findById(id);
    console.log("foundPetProfilePicture");
    console.log(foundPetProfilePicture);
    console.log("foundPetProfilePicture");
    //delete old profile picture if exists
    if (
      foundPetProfilePicture.picture === "" ||
      foundPetProfilePicture.picture.includes("https://res.cloudinary.com")
    ) {
      await cloudinaryDeletePetImg(foundPetProfilePicture.picture);

      const foundUser = await Pet.findByIdAndUpdate(
        id,
        {
          picture: imgUploaded?.secure_url,
        },
        { new: true }
      );

      fs.unlinkSync(localPath);

      res.status(200).json("Pet profile photo updated.");
    } else {
      res.json("Profile photo already deleted.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// delete pet profile photo controller ***
const deletePetPhotoController = expressHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const selectedPhoto = req.body.selectedPhoto;

    const foundPetPicture = await Pet.findById(id);
    //delete old profile picture if exists
    if (foundPetPicture.picture !== "") {
      const imgUploaded = await cloudinaryDeletePetImg(selectedPhoto);

      await Pet.findByIdAndUpdate(
        id,
        {
          picture: "",
        },
        { new: true }
      );

      res.status(200).json("Pet profile photo deleted");
    } else {
      res.json("Pet profile photo already deleted.");
    }
  } catch (error) {
    return error;
  }
});

// delete pet controller ***
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

    res.status(200).json("Pet deleted.");
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
