const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
require("./config/dbConnection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client")));

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server is running at port:${PORT}`);
});
