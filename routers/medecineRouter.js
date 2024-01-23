const express = require("express");
const medController = require("../controllers/medicineController");

const medRouter = express.Router();

medRouter.get("/getall", medController.getAll);
medRouter.get("/:id", medController.getSingleMedicine);
medRouter.get("/search/:slug", medController.getBySearch);

module.exports = medRouter;
