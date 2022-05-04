const express = require("express");
const dbConnect = require("./config/db/dbConnect");
const cors = require("cors");

//import routes
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//database connection
dbConnect();

//user routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 1000;

app.listen(1000, console.log(`Server running at PORT ${PORT}`));
