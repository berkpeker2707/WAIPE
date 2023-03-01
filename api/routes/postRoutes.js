const express = require("express");
const { verifyToken } = require("../middlewares/auth");
const { photoResize } = require("../middlewares/photoUpload");

const {
  postPostController,
  getPostController,
  getPetPostsController,
  getAllPostsController,
  getFollowedPostsController,
  updatePostController,
  deletePostController,
  getArchivedPostsController,
  archivePostController,
} = require("../controllers/postControllers");

const rateLimit = require("express-rate-limit");

//limitting per ip
const createPostLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 min
  max: 10, // Limit each IP to 10 create account requests per `window` (here, per half an hour)
  message: "Too many posts created, please try again after an hour",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const postRoutes = express.Router();

postRoutes.post(
  "/newPost/newPetPost",
  [verifyToken, photoResize, createPostLimiter],
  postPostController
);
postRoutes.get("/fetch/:postID", verifyToken, getPostController);
postRoutes.get("/fetch/pet/:petID", verifyToken, getPetPostsController);
postRoutes.get("/fetch", verifyToken, getAllPostsController);
postRoutes.get("/fetch/all/followed", verifyToken, getFollowedPostsController);
postRoutes.put("/update/:postID", verifyToken, updatePostController);
postRoutes.delete("/delete/:postID", verifyToken, deletePostController);
postRoutes.get("/fetch/all/archived", verifyToken, getArchivedPostsController);
postRoutes.put("/archive", verifyToken, archivePostController);

module.exports = postRoutes;
