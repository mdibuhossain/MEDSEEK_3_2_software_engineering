const Medicine = require("../models/medicineModel");

module.exports.getAll = async (req, res) => {
  try {
    res.status(200).json(await Medicine.find({}));
  } catch {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
module.exports.getBySearch = async (req, res) => {
  try {
    const { slug } = req.params;
    let key = slug.trim();
    if (key.length > 0) {
      const result = await Medicine.find({
        $or: [
          { name: { $regex: new RegExp(key, "i") } },
          { generic: { $regex: new RegExp(key, "i") } },
          { company: { $regex: new RegExp(key, "i") } },
        ],
      }).exec();
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Search keyword not valid!" });
    }
  } catch {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
