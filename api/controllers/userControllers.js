const User = require("../models/user");
const Pet = require("../models/pet");
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
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_PASS,
  // url: "https://api.eu.mailgun.net",
  url: process.env.MAILGUN_HOST,
});

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
    res.status(500).json(error);
  }
});

///////////////////// BELOW HERE //////////////////////

const forgetPasswordController = expressHandler(async (req, res) => {
  //find the user by email
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User Not Found");

  try {
    //Create token
    const token = await user.createPasswordResetToken();
    console.log(token);
    await user.save();

    mg.messages
      .create(process.env.MAILGUN_USER, {
        from: "Excited User <mailgun@sandbox-123.mailgun.org>",
        to: email,
        subject: "Hello",
        text: "Testing some Mailgun awesomness!",
        html: "<h1>Testing some Mailgun awesomness!</h1>",
      })
      .then((msg) => console.log(msg)) // logs response data
      .catch((err) => console.log(err)); // logs any error

    res.json(200);

    // //build your message
    // const resetURL = `If you have requested to reset your password, reset now within 10 minutes, otherwise ignore this message <a href="http://localhost:3000/reset-password/${token}">Click to Reset</a>`;
    // const msg = {
    //   from: '"Harold Flower 👻" <support@testmail.com>', // sender address
    //   to: email,
    //   // from: "twentekghana@gmail.com",
    //   subject: "Support Test Mail ✔", // Subject line
    //   html: resetURL,
    // };

    // await mg.send(msg);
    // res.json({
    //   msg: `A verification message is successfully sent to ${user?.email}. Reset now within 10 minutes, ${resetURL}`,
    // });
  } catch (error) {
    console.log(error);

    res.json(error);
  }
});

const resetPasswordController = expressHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //find this user by token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token Expired, try again later");

  //Update/change the password
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});
///////////////////// ABOVE HERE //////////////////

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

//profile photo upload controller
const pictureUploadController = expressHandler(async (req, res) => {
  const { _id } = req.user;
  const localPath = `public/images/profile/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadImg(localPath);

  const foundUser = await User.findByIdAndUpdate(
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

//prpfile photo delete controller
const pictureDeleteController = expressHandler(async (req, res) => {
  const { _id } = req?.user;
  const { picture } = req?.body;

  const imgUploaded = await cloudinaryDeleteImg(picture);

  const foundUser = await User.findById(_id);

  var foundPictureLink = foundUser?.pictures;

  var indexOfSelectedImage = foundPictureLink.findIndex((element) =>
    element.includes(picture)
  );

  await User.findByIdAndUpdate(
    _id,
    {
      picture: foundUser?.pictures[indexOfSelectedImage - 1]
        ? foundUser?.pictures[indexOfSelectedImage - 1]
        : null,
      $pull: { pictures: foundPictureLink[indexOfSelectedImage] },
    },
    { new: true }
  );

  res.json(imgUploaded);
});

//photo upload controller
const photoUploadController = expressHandler(async (req, res) => {
  const { _id } = req.user;
  const localPath = `public/images/profile/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadImg(localPath);

  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      $push: { pictures: imgUploaded?.data?.secure_url },
    },
    { new: true }
  );
  fs.unlinkSync(localPath);

  res.json(imgUploaded);
});

//photo delete controller
const photoDeleteController = expressHandler(async (req, res) => {
  const { _id } = req?.user;
  const { selectedPhoto } = req?.body;

  const imgUploaded = await cloudinaryDeleteImg(selectedPhoto);

  const foundUser = await User.findById(_id);

  var foundPictureLink = foundUser?.pictures;

  var indexOfSelectedImage = foundPictureLink.findIndex((element) =>
    element.includes(selectedPhoto)
  );

  await User.findByIdAndUpdate(
    _id,
    {
      $pull: { pictures: foundPictureLink[indexOfSelectedImage] },
    },
    { new: true }
  );

  res.json(imgUploaded);
});

const archivedPostController = expressHandler(async (req, res) => {
  const { _id } = req?.user;
  const { postId } = req?.body;

  try {
    await User.updateOne(
      { _id: _id },
      {
        $push: {
          archivedPost: [{ _id: postId }],
        },
      }
    );
    res.status(200).json("Archived");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  getUserController,
  forgetPasswordController,
  resetPasswordController,
  blockUserController,
  followPetController,
  blockPetController,
  updateUserController,
  pictureUploadController,
  pictureDeleteController,
  photoUploadController,
  photoDeleteController,
  archivedPostController,
};
