const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  type: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "TYPE IS REQUIRED"],
  },
  generic: {
    type: String,
    required: [true, "GENERIC IS REQUIRED"],
  },
  strength: {
    type: String,
  },
  company: {
    type: String,
    required: [true, "COMPANY IS REQUIRED"],
  },

  indications: {
    type: String,
  },
  pharmacology: {
    type: String,
  },
  dosage: {
    type: {},
  },
  sideEffects: {
    type: String,
  },
  pregnancy_lactation: {
    type: String,
  },
  storageConditions: {
    type: String,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
