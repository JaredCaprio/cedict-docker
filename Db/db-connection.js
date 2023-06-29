const mongoose = require("mongoose");

module.exports = dbConnect = () => {
  console.log("db connection started");
  mongoose
    .connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected To Mongodb");
    })
    .catch((error) => {
      console.log("Unable to connect to Database");
      console.error(error);
    });
};
