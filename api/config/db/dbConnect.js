const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://berkolatto:09SzCYX0kD5lVpQq@cluster0.jactx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("Database connected");
  } catch (error) {
    console.log(`Database error: ${error.message}`);
  }
};

module.exports = dbConnect;
