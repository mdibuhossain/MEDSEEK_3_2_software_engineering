const express = require("express");
const Medicine = require("../models/medicineModel");

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/companies", async (req, res) => {
  try {
    const companies = await Medicine.find({}).distinct("company");
    return res.render("companies", { companies });
  } catch {}
});

router.get("/medicines", async (req, res) => {
  try {
    const medForms = await Medicine.find({}).distinct("type");
    return res.render("medicineCategories", { medForms });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/medicine/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const medicine = await Medicine.findById(slug);
    return res.render("medicine", { medicine });
  } catch {
    return res.send("Not found!");
  }
});

module.exports = router;
