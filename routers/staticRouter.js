const express = require("express");
const { ObjectId } = require("mongoose").Types;
const Medicine = require("../models/medicineModel");
const TmpUser = require("../models/_userModel");
const Order = require("../models/orderModel");

const router = express.Router();

function escapedSearchTerm(searchTerm) {
  return searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

router.get("/", (req, res) => {
  return res.render("home", { user: res.locals.user });
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
  } catch { }
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

router.get("/auth", (req, res) => {
  try {
    return res.render("auth");
  } catch {
    return res.send("Not found!");
  }
});

router.post("/auth/registration", async (req, res) => {
  try {
    const payload = req.body;
    await new TmpUser(payload).save().then(() => {
      return res.render("/");
    }).catch((err) => {
      return res.status(500).json({
        error: err.message.split(": ")[2].split(",")[0],
      });
    });
  } catch {
    return res.send("Not found!");
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await TmpUser.findOne({ email, password });
    if (user) {
      req.session.user = user;
      return res.redirect("/")
    }
    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    return res.send("Not found!");
  }
})

router.get('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect('/');
    }
  });
});

router.get("/payment/:medId", async (req, res) => {
  const user = res.locals.user;
  if (!user) {
    return res.redirect("/auth");
  }
  const { medId } = req.params;
  const { qnt } = req.query;
  try {
    const medicine = await Medicine.findById(medId);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    const total = parseInt(medicine.price) * parseInt(qnt);
    return res.render("payment", { medicine, total, qnt });
  } catch {
    return res.send("Not found!");
  }
})

router.post("/confirm-order", async (req, res) => {
  const user = res.locals.user;
  if (!user) {
    return res.redirect("/auth");
  }
  const { contact, address } = req.body;
  const { medid, qnt, uid } = req.query;
  try {
    const medicine = await Medicine.findById(medid);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    const newOrder = new Order({
      user: uid,
      medicine: medid,
      quantity: qnt,
      contact,
      address,
      total: parseInt(medicine.price) * parseInt(qnt),
    })
    console.log(newOrder);
    await newOrder.save();
    return res.redirect("/");
  } catch (error) {
    return res.send(error.message);
  }
})

module.exports = router;
