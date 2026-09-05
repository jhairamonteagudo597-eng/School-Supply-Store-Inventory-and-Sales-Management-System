const suppliesData = require("../data/suppliesData");

function success(res, status, data) {
  return res.status(status).json({ status, data, error: null });
}

function createSupply(req, res) {
  try {
    return success(res, 201, suppliesData.save(req.validatedBody));
  } catch (err) {
    return res.status(500).json({ status: 500, data: null, error: "Failed to add supply item", field: null });
  }
}

function getAllSupplies(req, res) {
  return success(res, 200, suppliesData.findAll());
}

function getSupplyById(req, res) {
  const supply = suppliesData.findById(req.params.id);
  if (!supply) return res.status(404).json({ status: 404, data: null, error: "Supply item not found", field: "id" });
  return success(res, 200, supply);
}

function updateSupply(req, res) {
  const updated = suppliesData.updateById(req.params.id, req.validatedBody);
  if (!updated) return res.status(404).json({ status: 404, data: null, error: "Supply item not found", field: "id" });
  return success(res, 200, updated);
}

function deleteSupply(req, res) {
  const deleted = suppliesData.deleteById(req.params.id);
  if (!deleted) return res.status(404).json({ status: 404, data: null, error: "Supply item not found", field: "id" });
  return success(res, 200, { message: "Supply item deleted successfully" });
}

function searchSupplies(req, res) {
  return success(res, 200, suppliesData.search(req.query.q));
}

function getLowStock(req, res) {
  const threshold = req.query.threshold === undefined ? 20 : Number(req.query.threshold);
  if (!Number.isInteger(threshold) || threshold < 0) return res.status(422).json({ status: 422, data: null, error: "Threshold must be a non-negative integer", field: "threshold" });
  return success(res, 200, suppliesData.lowStock(threshold));
}

module.exports = { createSupply, getAllSupplies, getSupplyById, updateSupply, deleteSupply, searchSupplies, getLowStock };
