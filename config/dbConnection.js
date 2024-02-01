const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(
    process.env.NODE_ENV === "DEVELOPMENT"
      ? process.env.MONGO_URI_LOCAL
      : process.env.MONGO_URI,
    {
      dbName: "medseek",
    }
  )
  .then((data) => {
    const state = mongoose.STATES[mongoose.connection.readyState];
    console.log("DB connection status: ", state);
  })
  .catch((e) => console.error(e));
