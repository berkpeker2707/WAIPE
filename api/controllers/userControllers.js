const User = require("../models/user");
const Pet = require("../models/pet");
const Post = require("../models/post");
const expressHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

require("dotenv").config();

//Mailing System
// const mailgun = require("mailgun-js");
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_PASS,
//   domain: process.env.MAILGUN_USER,
// });

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const {
  cloudinaryUploadUserImg,
  cloudinaryDeleteUserImg,
} = require("../middlewares/cloudinary");

const fs = require("fs");
const { findById } = require("../models/user");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_PASS,
  // url: "https://api.eu.mailgun.net",
  url: process.env.MAILGUN_HOST,
});

// *
const getCurrentUserController = expressHandler(async (req, res) => {
  const id = req.user.id;

  try {
    const user = await User.findById(id);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// *
const getUserController = expressHandler(async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    let pets = [];
    for (let i = 0; i < user.pets.length; i++) {
      const pet = await Pet.findById(user.pets[i]);
      pets.push({ _id: pet._id, name: pet.name, picture: pet.picture });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// //forgot password & reset password
// const testresetPasswordController = expressHandler(async (req, res) => {
//   try {
//     // let testAccount = await nodemailer.createTestAccount();

//     let transporter = nodemailer.createTransport({
//       host: process.env.MAILGUN_HOST,
//       port: process.env.MAILGUN_PORT,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.MAILGUN_USER,
//         pass: process.env.MAILGUN_PASS,
//       },
//     });

//     console.log(process.env.MAILGUN_HOST);

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Harold Flower 👻" <support@testmail.com>', // sender address
//       to: "berkolatto@gmail.com", // list of receivers
//       subject: "Support Test Mail ✔", // Subject line
//       text: "Hello world? Does this actually work?", // plain text body
//       html: "<b>Anybody out there... out there... out there... I'm so cold... cold... cold...</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     res.json(200);
//   } catch (error) {
//     res.json(error);
//   }
// });

// *
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

    res.status(200).send("Updated");
  } catch (error) {
    res.status(500).json(error);
  }
});

// *
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
  } catch (error) {
    res.status(500).json(error);
  }
});

// *
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
  } catch (error) {
    res.status(500).json(error);
  }
});

// *
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
  } catch (error) {
    res.status(500).json(error);
  }
});

// *
//profile photo upload controller
const pictureUploadController = expressHandler(async (req, res) => {
  const { _id } = req.user;
  const localPath = `photos/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadUserImg(localPath);

  const foundUser = await User.findById(_id);
  if (foundUser.picture) {
    await cloudinaryDeleteUserImg(foundUser.picture);
  }

  console.log(foundUser);

  await User.findByIdAndUpdate(
    _id,
    {
      picture: imgUploaded?.data?.secure_url,
      $push: { pictures: imgUploaded?.data?.secure_url },
    },
    { new: true }
  );
  fs.unlinkSync(localPath);

  res.json(imgUploaded);
});

// *
//profile photo delete controller
const pictureDeleteController = expressHandler(async (req, res) => {
  const { _id } = req?.user;
  const { picture } = req?.body;
  const imgUploaded = await cloudinaryDeleteUserImg(picture);

  await User.findByIdAndUpdate(
    _id,
    {
      picture: "",
    },
    { new: true }
  );

  res.json(imgUploaded);
});

const userDeleteController = expressHandler(async (req, res) => {
  const { _id } = req?.user;
  try {
    const user = await User.findByIdAndDelete(_id);
    console.log(user);

    const pets = user.pets;
    for (let i = 0; i < pets.length; i++) {
      const pet = await Pet.findByIdAndDelete(pets[i]);
      console.log(pet);
      const posts = pet.petPost;
      for (let j = 0; j < posts.length; j++) {
        await Post.deleteOne({ _id: posts[j] });
      }
    }
    res.status(200).json("USER DELETED");
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
