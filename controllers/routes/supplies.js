const express = require("express");
const router = express.Router();
const suppliesController = require("../suppliesController");
const { validateCreateSupply, validateUpdateSupply } = require("../../middleware/validation");
const { validateAdminOrOwner } = require("../../middleware/auth");

router.get("/search", suppliesController.searchSupplies);
router.get("/low-stock", suppliesController.getLowStock);
router.get("/", suppliesController.getAllSupplies);
router.get("/:id", suppliesController.getSupplyById);
router.post("/", validateCreateSupply, suppliesController.createSupply);
router.put("/:id", validateUpdateSupply, suppliesController.updateSupply);
router.delete("/:id", validateAdminOrOwner, suppliesController.deleteSupply);

module.exports = router;
