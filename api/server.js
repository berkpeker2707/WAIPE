const express = require("express");
const passport = require("passport");
const session = require("express-session");
const dbConnect = require("./config/db/dbConnect");
const cors = require("cors");
const formData = require("express-form-data");
require("dotenv").config();
require("./config/passport")(passport);

//import routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");
const petRoutes = require("./routes/petRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(
  cors({
    // origin: true,
    // credentials: true,
  })
);
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(formData.parse());

//database connection
dbConnect();
// app.use(
//   session({
//     secret: "dbApp",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(passport.initialize());
// app.use(passport.session());

//routes
// app.use("/api/overlord", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running at PORT ${PORT}`));
