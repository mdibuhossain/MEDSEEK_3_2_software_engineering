const mongoose = require("mongoose");
const dotenv = require("dotenv");
const TmpUser = require("../models/_userModel");

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
  .then(async (data) => {
    const state = mongoose.STATES[mongoose.connection.readyState];
    console.log("DB connection status: ", state);
    if (state === "connected") {
      const findUser = await TmpUser.findOne({ email: "admin@admin.com" });
      if (!findUser) {
        const newAdminUser = new TmpUser({
          name: "Admin",
          email: "admin@admin.com",
          password: "admin",
          contact: "1234567890",
          role: "admin",
        });
        await newAdminUser.save();
        console.log("Admin user created!");
      } else {
        console.log("Admin user already exists!");
      }
    }
  })
  .catch((e) => console.error(e));
