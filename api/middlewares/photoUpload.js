const sharp = require("sharp");
const path = require("path");

//Image Resizing
const photoResize = async (req, res, next) => {
  //check if there is no file
  if (!req.files) {
    return next();
  } else {
    //allow 10mb file max
    if (
      req.files.image.size / 1024 / 1024 < 10 &&
      req.files.image.type !== "video/quicktime" &&
      req.files.image.type !== "video/mp4"
    ) {
      // if (req.files.image)
      await sharp(req.files.image.path)
        .resize(1080, 1080)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(
          path.resolve(
            `./middlewares/photos/${req.files.image.originalFilename}`
          )
        );
      next();
    } else if (
      req.files.image.size / 1024 / 1024 < 10 &&
      (req.files.image.type === "video/quicktime" ||
        req.files.image.type === "video/mp4")
    ) {
      next();
    } else {
      res.status(500).json("File size cannot be larger than 10mb.");
    }
  }
};
module.exports = {
  photoResize,
};
