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
  .then((data) => console.log("DB connected"))
  .catch((e) => console.error(e));
