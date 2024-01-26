const express = require("express");
const Medicine = require("../models/medicineModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/companies", async (req, res) => {
  try {
    const companies = await Medicine.find({}).distinct("company");
    res.render("companies", { companies });
  } catch {}
});

router.get("/medicine", (req, res) => {
  res.render("medicine");
});

router.get("/medicine/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const medicine = await Medicine.findById(slug);
    res.render("medicine", { medicine });
  } catch {
    res.send("Not found!");
  }
});

module.exports = router;
