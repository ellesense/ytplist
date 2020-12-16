const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Successfully connected to database");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectMongo;
