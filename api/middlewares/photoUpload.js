const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

//file type checking
const multerFilter = (req, file, cb) => {
  console.log("TEST HERE FILTER");
  //check file type
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    console.log("TEST");
    //rejected file
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

//storage
const multerStorage = multer.memoryStorage();

const photoUpload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
  // limits: { fileSize: 1000000 },
});

//Image Resizing
const photoResize = async (req, res, next) => {
  console.log("req.file");
  console.log(req.file);
  console.log("req.file");
  console.log("req.files");
  console.log(req.files);
  console.log("req.files");
  //check if there is no file
  if (!req.files) return next();
  await sharp(req.files.image.path)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(
      path.resolve(`./middlewares/photos/${req.files.image.originalFilename}`)
    );
  next();
};
module.exports = { photoUpload, photoResize };
