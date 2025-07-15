const mongoose = require("mongoose");

const ConnectDB = async () => {
   await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = ConnectDB;
