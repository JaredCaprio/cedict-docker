const mongoose = require("mongoose");

module.exports = dbConnect = () => {
  mongoose
    .connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected To Mongodb");
    })
    .catch((error) => {
      console.error(error);
    });
};
