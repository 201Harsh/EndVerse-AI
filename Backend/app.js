const express = require("express");
const ConnectDB = require("./config/database");
ConnectDB();
const UserRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
));
app.use("/users", UserRouter);

module.exports = app;
