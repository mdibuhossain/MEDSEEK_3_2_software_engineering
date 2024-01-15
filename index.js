const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const authRouter = require("./routers/authRouter");
const medRouter = require("./routers/medecineRouter");
require("./config/dbConnection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "client")));

app.use("/auth", authRouter);
app.use("/api/medicine", medRouter);

app.listen(PORT, () => {
  console.log(`server is running at port:${PORT}`);
});
