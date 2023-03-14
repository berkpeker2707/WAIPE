const express = require("express");
const passport = require("passport");
const session = require("express-session");

const path = require("path");

const dbConnect = require("./config/db/dbConnect");

const cors = require("cors");
const formData = require("express-form-data");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

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
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.set("trust proxy", 1);
// app.get("/ip", (request, response) => response.send(request.ip));

//protection imports of helmet
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(formData.parse());

//rate limitter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

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
app.use("/api/report", reportRoutes);

app.get("/privacy", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/privacy.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running at PORT ${PORT}`));
