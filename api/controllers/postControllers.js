const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");
const User = require("../models/user");

const Pet = require("../models/pet");
const expressHandler = require("express-async-handler");
const {
  cloudinaryUploadPostImg,
  cloudinaryDeletePostImg,
} = require("../middlewares/cloudinary");
const fs = require("fs");
const { getOrSetCache } = require("../utils/redis");

// post a post controller ***
const postPostController = expressHandler(async (req, res) => {
  try {
    const petID = req.body.petID;

    const localPathRaw = `middlewares/photos/${req.file.filename}`;
    const localPath = `middlewares/photos/${req.file.filename}-cropped.jpg`;
    const imgUploaded = await cloudinaryUploadPostImg(localPath, petID);
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

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a single post controller ***
const getPostController = expressHandler(async (req, res) => {
  try {
    const postID = req.params.postID;

    const post = await getOrSetCache(`post:${postID}`, async () => {
      const post = await Post.find({ _id: postID })
        .populate({ path: "comment" })
        .populate({ path: "like" })
        .populate({ path: "petID" })
        .exec();

      return post;
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts of a pet controller ***
const getPetPostsController = expressHandler(async (req, res) => {
  try {
    const petID = req.params.petID;

    const petAllPost = await getOrSetCache(`petAllPost:${petID}`, async () => {
      const allPost = await Post.find({ petID: petID })
        .populate({ path: "comment" })
        .populate({ path: "like" })
        .populate({ path: "petID" })
        .exec();

      return allPost;
    });

    res.status(200).json(petAllPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts of all controller ***
const getAllPostsController = expressHandler(async (req, res) => {
  try {
    const allPost = await getOrSetCache("allPost", async () => {
      const allPost = await Post.find()
        .populate({ path: "comment" })
        .populate({ path: "like" })
        .populate({ path: "petID" })
        .exec();

      return allPost;
    });

    res.status(200).json(allPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts of followed pets controller ***
const getFollowedPostsController = expressHandler(async (req, res) => {
  try {
    const id = req.user.id;

    const followedPosts = await getOrSetCache(
      `followedPosts:${id}`,
      async () => {
        const user = await User.findById(id);

        const followedPosts = await Post.find({
          petID: { $in: user.followedPets },
        })
          .populate({ path: "comment" })
          .populate({ path: "like" })
          .populate({ path: "petID" })
          .exec();

        return followedPosts;
      }
    );

    res.status(200).json(followedPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update selected post's description controller ***
const updatePostController = expressHandler(async (req, res) => {
  const postID = req.params.postID;

  const { postDescription } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(postID, {
      postDescription: postDescription,
    })
      .populate({ path: "comment" })
      .populate({ path: "like" })
      .populate({ path: "petID" })
      .exec();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete selected post controller controller ***
const deletePostController = expressHandler(async (req, res) => {
  const id = req.params.postID;
  try {
    const foundPost = await Post.findById(id);
    console.log(foundPost);
    if (foundPost) {
      const postPicture = await Post.find({ _id: id }).select("picture -_id");

      let pictureURL = postPicture[0].picture;
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

      await cloudinaryDeletePostImg(pictureURL);

      res.status(200).json("Deleted");
    } else {
      res.status(200).json("Post already deleted.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// archieve and remove from archieve post controller ***
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
