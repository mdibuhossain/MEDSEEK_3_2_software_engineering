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
    const { type } = req.query;
    console.log(type);
    if (type) {
      const meds = await Medicine.find({
        $or: [{ type: { $regex: new RegExp("^" + type + "$", "i") } }],
      });
      return res.render("medicines", { meds });
    }
    const pipeline = [
      {
        $group: {
          _id: { type: "$type", iconId: "$iconId" }, // Replace with the field you want to group by
          count: { $sum: 1 }, // Count occurrences of each unique value
        },
      },
      { $sort: { "_id.type": 1 } },
      { $project: { "_id.iconId": 1, "_id.type": 1, count: 1 } },
    ];
    const medForms = await Medicine.aggregate(pipeline);
    console.log(medForms);
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
