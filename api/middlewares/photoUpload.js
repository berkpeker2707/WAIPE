const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
//storage
const multerStorage = multer.diskStorage({
  destination: path.resolve("./middlewares/photos"),
  filename: function (req, file, callback) {
    callback(null, `photo-${Date.now()}-${file.originalname}`);
  },
});
//file type checking
const multerFilter = (req, file, cb) => {
  //check file type
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    //rejected file
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};
const photoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

//Image Resizing
const photoResize = async (req, res, next) => {
  //check if there is no file
  if (!req.file) return next();
  await sharp(req.file.path)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.resolve(`${req.file.path}-cropped.jpg`));
  next();
};
module.exports = { photoUpload, photoResize };
