const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
//storage
const multerStorage = multer.memoryStorage();

//file type checking
const multerFilter = (req, file, cb) => {
  //check file type
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    //rejected files
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

  if (!req.files) return next();
  req.files.filename = `photo-${Date.now()}-${
    req.files.picture.originalFilename
  }`;

  await sharp(req.files.picture.path)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`./photos/${req.files.filename}`));
  next();
};

module.exports = { photoUpload, photoResize };
