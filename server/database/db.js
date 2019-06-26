const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("Database connected...");
  } catch (err) {
    console.error("Error connecting to database");
    console.error(err.message);
  }
};

module.exports = connectDB;
