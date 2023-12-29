const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client")));

app.listen(PORT, () => {
  console.log(`server is running at port:${PORT}`);
});
