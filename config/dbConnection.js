const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: "medseek",
  })
  .then((data) => console.log("DB connected"))
  .catch((e) => console.error(e));
