const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const medRouter = require("./routers/medecineRouter");
const staticRouter = require("./routers/staticRouter");
require("./config/dbConnection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, "client")));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/auth", authRouter);
app.use("/api/medicine", medRouter);
app.use("", staticRouter);

app.listen(PORT, () => {
  console.log(`server is running at port:${PORT}`);
});
