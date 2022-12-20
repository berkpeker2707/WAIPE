const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");

const Pet = require("../models/pet");
const expressHandler = require("express-async-handler");
const { cloudinaryUploadPostImg } = require("../middlewares/cloudinary");
const fs = require("fs");

// post a post controller ***
const postPostController = expressHandler(async (req, res) => {
  try {
    const petID = req.body.petID;

    const localPathRaw = `middlewares/photos/${req.file.filename}`;
    const localPath = `middlewares/photos/${req.file.filename}-cropped.jpg`;
    const imgUploaded = await cloudinaryUploadPostImg(localPath);
    if (imgUploaded === "Wrong type") return res.json("Wrong type");

    const post = await Post.create({
      petID: petID,
      picture: imgUploaded?.secure_url,
      postDescription: req?.body?.postDescription,
    });

    const like = await Like.create({
      postID: post._id,
    });
    const comment = await Comment.create({
      postID: post._id,
    });

    post.updateOne({ like: like._id, comment: comment._id }).exec();

    const pet = await Pet.findById(petID);
    pet
      .updateOne(
        { $push: { petPost: [post._id] } },
        { new: true, upsert: true }
      )
      .exec();

    fs.unlinkSync(localPathRaw);
    fs.unlinkSync(localPath);

    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a single post controller ***
const getPostController = expressHandler(async (req, res) => {
  try {
    const posts = await Post.find({ _id: req.params.postID })
      .populate({ path: "comment" })
      .populate({ path: "like" })
      .populate({ path: "petID" })
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts of a pet ***
const getPetPostsController = expressHandler(async (req, res) => {
  try {
    const posts = await Post.find({ petID: req.params.petID })
      .populate({ path: "comment" })
      .populate({ path: "like" })
      .populate({ path: "petID" })
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts of all ***
const getAllPostsController = expressHandler(async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "comment" })
      .populate({ path: "like" })
      .populate({ path: "petID" })
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts of followed pets ***
const getFollowedPostsController = expressHandler(async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);

    const posts = await Post.find({
      petID: { $in: user.followedPets },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// *
const updatePostController = expressHandler(async (req, res) => {
  const postID = req.params.postID;

  const { postDescription } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(postID, {
      postDescription: postDescription,
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// *
const deletePostController = expressHandler(async (req, res) => {
  const id = req.params.postID;
  try {
    const post = await Post.findOneAndDelete({ _id: id });

    const pet = await Pet.findOne({
      petPost: { $in: [post._id] },
    });

    if (pet.petPost.includes(post._id)) {
      await pet.updateOne({
        $pull: { petPost: post._id },
      });
    }

    await Comment.findOneAndDelete({
      postID: id,
    });

    await Like.findOneAndDelete({ postID: id });

    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//
const archivePostController = expressHandler(async (req, res) => {
  const { id } = req?.user;
  const { postID } = req?.body;

  try {
    const user = await User.findById(id);
    if (!user.archivedPosts.includes(postID)) {
      await user.updateOne({
        $push: {
          archivedPosts: [{ _id: postID }],
        },
      });
      res.status(200).json("Post has been archived");
    } else {
      await user.updateOne({ $pull: { archivedPosts: postID } });
      // await user.updateOne({ $pull: { blockedUsers: req.body.blockedUsers } });

      res.status(200).json("Post has been removed from archived");
    }

    // await User.updateOne(
    //   { _id: _id },
    //   {
    //     $push: {
    //       archivedPosts: [{ _id: postID }],
    //     },
    //   }
    // );
    // res.status(200).json("Archived");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  postPostController,
  getPostController,
  getPetPostsController,
  getAllPostsController,
  getFollowedPostsController,
  updatePostController,
  deletePostController,
  archivePostController,
};
