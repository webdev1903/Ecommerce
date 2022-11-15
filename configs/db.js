const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  return mongoose.connect(
    process.env.MONGO_URL
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // },
    // () => {
    //   console.log("mongdb is connected");
    // }
  );
};
