const express = require("express");
const Medicine = require("../models/medicineModel");

const router = express.Router();

function escapedSearchTerm(searchTerm) {
  return searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/companies", async (req, res) => {
  try {
    let { medOf } = req.query;
    if (medOf) {
      medOf = escapedSearchTerm(medOf);
      const meds = await Medicine.find({
        company: { $regex: new RegExp(`^${medOf}$`, "i") },
      });
      return res.render("medicines", { meds, medOf });
    }
    const companies = await Medicine.find({}).distinct("company");
    return res.render("companies", { companies });
  } catch {}
});

router.get("/medicines", async (req, res) => {
  try {
    let { type } = req.query;
    if (type) {
      type = escapedSearchTerm(type);
      const meds = await Medicine.find({
        type: { $regex: new RegExp(`^${type}$`, "i") },
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
