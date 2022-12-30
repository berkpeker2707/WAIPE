const User = require("../models/user");
const Pet = require("../models/pet");
const Post = require("../models/post");
const expressHandler = require("express-async-handler");
const {
  cloudinaryUploadUserImg,
  cloudinaryDeleteUserImg,
} = require("../middlewares/cloudinary");
const fs = require("fs");

// get current user controller ***
const getCurrentUserController = expressHandler(async (req, res) => {
  const id = req.user.id;

  try {
    const user = await User.findById(id)
      .populate({ path: "pets", model: "Pet" })
      .populate({ path: "likedPosts", model: "Post" })
      .populate({ path: "likedComments", model: "Like" })
      .populate({ path: "postedComments", model: "Comment" })
      .exec();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// get selected user controller ***
const getUserController = expressHandler(async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id)
      .populate({ path: "pets", model: "Pet" })
      .populate({ path: "likedPosts", model: "Post" })
      .populate({ path: "likedComments", model: "Like" })
      .populate({ path: "postedComments", model: "Comment" })
      .exec();

    // Doga's code commented just in case
    // let pets = [];
    // for (let i = 0; i < user.pets.length; i++) {
    //   const pet = await Pet.findById(user.pets[i]);
    //   pets.push({ _id: pet._id, name: pet.name, picture: pet.picture });
    // }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update current user controller ***
const updateUserController = expressHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findByIdAndUpdate(_id, {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
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

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// block user & unblock user ***
const blockUserController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user.blockedUsers.includes(req.body.blockedUsers)) {
      await user.updateOne({ $push: { blockedUsers: req.body.blockedUsers } });
      res.status(200).json(user);
    } else {
      await user.updateOne({ $pull: { blockedUsers: req.body.blockedUsers } });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// follow & unfollow pet ***
const followPetController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user.followedPets.includes(req.body.followedPets)) {
      await user.updateOne({ $push: { followedPets: req.body.followedPets } });
      res.status(200).json(user);
    } else {
      await user.updateOne({ $pull: { followedPets: req.body.followedPets } });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// block & unblock pet ***
const blockPetController = expressHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user.blockedPets.includes(req.body.blockedPets)) {
      await user.updateOne({ $push: { blockedPets: req.body.blockedPets } });
      //if pet is already followed, remove id from followedPets as well
      await user.updateOne({ $pull: { followedPets: req.body.blockedPets } });
      res.status(200).json(user);
    } else {
      await user.updateOne({ $pull: { blockedPets: req.body.blockedPets } });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// profile photo upload controller ***
const pictureUploadController = expressHandler(async (req, res) => {
  try {
    const id = req.user._id;

    const localPath = `middlewares/photos/${req.files.image.originalFilename}`;

    const imgUploaded = await cloudinaryUploadUserImg(localPath, id);

    const foundUserPicture = await User.findById(id);

    //delete old profile picture if exists
    if (
      foundUserPicture.picture === "" ||
      foundUserPicture.picture.includes("https://res.cloudinary.com")
    ) {
      await cloudinaryDeleteUserImg(foundUserPicture.picture);

      const user = await User.findByIdAndUpdate(
        id,
        {
          picture: imgUploaded.secure_url,
        },
        { new: true }
      );

      fs.unlinkSync(localPath);

      res.status(200).json(user);
    } else {
      res.json("Profile photo already deleted.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// profile photo delete controller ***
const pictureDeleteController = expressHandler(async (req, res) => {
  const id = req.user._id;
  const image = req.body.picture;

  try {
    const foundUserPicture = await User.findById(id);

    //delete old profile picture if exists
    if (foundUserPicture.picture !== "") {
      const imgUploaded = await cloudinaryDeleteUserImg(image);

      await User.findByIdAndUpdate(
        id,
        {
          picture: "",
        },
        { new: true }
      );

      res.status(200).json(foundUserPicture);
    } else {
      res.json("Profile photo already deleted.");
    }
  } catch (error) {
    return error;
  }
});

// delete user controller ***
const userDeleteController = expressHandler(async (req, res) => {
  try {
    const _id = req.user._id;

    const user = await User.findByIdAndDelete(_id);

    const pets = user.pets;
    for (let i = 0; i < pets.length; i++) {
      const pet = await Pet.findByIdAndDelete(pets[i]);
      const posts = pet.petPost;
      for (let j = 0; j < posts.length; j++) {
        await Post.deleteOne({ _id: posts[j] });
      }
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  getCurrentUserController,
  getUserController,
  blockUserController,
  followPetController,
  blockPetController,
  updateUserController,
  pictureUploadController,
  pictureDeleteController,
  userDeleteController,
};
