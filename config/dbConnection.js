const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(
    process.env.NODE_ENV === "DEVELOPMENT"
      ? "mongodb://127.0.0.1:27017"
      : "mongodb+srv://medAdmin:med123123@cluster0.5p7yt.mongodb.net",
    {
      dbName: "medseek",
    }
  )
  .then((data) => console.log("DB connected"))
  .catch((e) => console.error(e));
