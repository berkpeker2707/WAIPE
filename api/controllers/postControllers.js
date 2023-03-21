const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");

const Pet = require("../models/pet");
const expressHandler = require("express-async-handler");
const {
  cloudinaryUploadPostImg,
  cloudinaryDeletePostImg,
} = require("../middlewares/cloudinary");
const fs = require("fs");

// post a post controller ***
const postPostController = expressHandler(async (req, res) => {
  try {
    const petID = req?.body?.petID;
    const localPath =
      await `middlewares/photos/${req?.files?.image?.originalFilename}`;
    if (localPath) {
      if (
        req.files.image.type === "video/quicktime" ||
        req.files.image.type === "video/mp4"
      ) {
        const imgUploaded = await cloudinaryUploadPostImg(
          req.files.image.path,
          petID
        );
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

        const pet = await Pet.findByIdAndUpdate(
          petID,
          { $push: { petPost: [post._id] } },
          { new: true, upsert: true }
        ).exec();

        res.status(200).json(post);
      } else {
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

        const pet = await Pet.findByIdAndUpdate(
          petID,
          { $push: { petPost: [post._id] } },
          { new: true, upsert: true }
        ).exec();

        fs.unlinkSync(localPath);
        res.status(200).json(post);
      }
    } else {
      res.status(500).json("Something went wrong.");
    }
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

// get all posts of a pet controller ***
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

// get all posts of all controller ***
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

// get all posts of followed pets controller ***
const getFollowedPostsController = expressHandler(async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);

    const posts = await Post.find({
      petID: { $in: user.followedPets },
    })
      .populate({ path: "comment" })
      .populate({ path: "like" })
      .populate({ path: "petID" })
      .exec();

    res.status(200).json(posts);
  } catch (err) {
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
    res.status(500).json(error);
  }
});

// get all archived posts ***
const getArchivedPostsController = expressHandler(async (req, res) => {
  try {
    const { id } = req?.user;

    const user = await User.findById(id);

    const posts = await Post.find({
      _id: { $in: user.archivedPosts },
    })
      .populate({ path: "comment" })
      .populate({ path: "like" })
      .populate({ path: "petID" })
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// archive and remove from archive post controller ***
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
  getArchivedPostsController,
  archivePostController,
};
