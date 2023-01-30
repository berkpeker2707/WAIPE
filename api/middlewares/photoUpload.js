const sharp = require("sharp");
const path = require("path");

//Image Resizing
const photoResize = async (req, res, next) => {
  console.log("req.files");
  console.log(req.files);
  console.log("req.files");
  //check if there is no file
  if (!req.files) {
    return next();
  } else {
    //allow 10mb file max
    if (req.files.image.size < 1000000) {
      console.log("dsfasfgsdbsfgmrj");
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
    } else {
      console.log("File size cannot be larger than 10mb.");
      next();
    }
  }
};
module.exports = {
  // photoUpload,
  photoResize,
};
