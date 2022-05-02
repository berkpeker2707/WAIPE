const express = require("express");
const dbConnect = require("./config/db/dbConnect");

//import routes
const userRoutes = require("./routes/userRoutes");

const app = express();

//database connection
dbConnect();

//user routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 1000;

app.listen(1000, console.log(`Server running at PORT ${PORT}`));
