const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadUserImg = async (fileToUpload) => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "waipe/user/photos",
      tags: "userPhotos",
    });

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryUploadPostImg = async (fileToUpload) => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "waipe/post/photos",
      tags: "postPhotos",
    });

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryUploadPetImg = async (fileToUpload) => {
  try {
    const data = await cloudinary.v2.uploader.upload(fileToUpload, {
      resource_type: "auto",
      folder: "waipe/pet/photos",
      tags: "petPhotos",
    });

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryDeleteUserImg = async (public_id) => {
  try {
    const getPublicId = public_id.split("/").pop().split(".")[0];
    var imagePath = "waipe/user/photos/" + getPublicId;

    const data = await cloudinary.v2.uploader.destroy(
      imagePath,
      (error, result) => {
        console.log(result);
      }
    );

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryDeletePostImg = async (public_id) => {
  try {
    const getPublicId = public_id.split("/").pop().split(".")[0];
    var imagePath = "waipe/post/photos/" + getPublicId;

    const data = await cloudinary.v2.uploader.destroy(
      imagePath,
      (error, result) => {
        console.log(result);
      }
    );

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

const cloudinaryDeletePetImg = async (public_id) => {
  try {
    const getPublicId = public_id.split("/").pop().split(".")[0];
    var imagePath = "waipe/pet/photos/" + getPublicId;

    const data = await cloudinary.v2.uploader.destroy(
      imagePath,
      (error, result) => {
        console.log(result);
      }
    );

    return {
      data,
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  cloudinaryUploadUserImg,
  cloudinaryUploadPostImg,
  cloudinaryUploadPetImg,
  cloudinaryDeleteUserImg,
  cloudinaryDeletePostImg,
  cloudinaryDeletePetImg,
};
