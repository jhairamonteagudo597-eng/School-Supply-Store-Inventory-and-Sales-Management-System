const test = require("node:test");
const assert = require("node:assert/strict");
const { validateCreateSupply, validateUpdateSupply } = require("../middleware/validation");
const { validateAdminOrOwner } = require("../middleware/auth");

function mockRes() {
  return { statusCode: 200, body: null, status(code) { this.statusCode = code; return this; }, json(payload) { this.body = payload; return this; } };
}

test("create validation accepts a complete valid supply", () => {
  const req = { body: { name: "Bond Paper", category: "Paper", quantity: 50, unitPrice: 45.5, status: "in-stock" } };
  const res = mockRes(); let called = false;
  validateCreateSupply(req, res, () => { called = true; });
  assert.equal(called, true); assert.equal(res.statusCode, 200); assert.equal(req.validatedBody.quantity, 50);
});

test("create validation rejects missing required fields with 422", () => {
  const req = { body: { name: "Paper" } }; const res = mockRes();
  validateCreateSupply(req, res, () => {});
  assert.equal(res.statusCode, 422); assert.equal(res.body.field, "category");
});

test("create validation rejects non-integer quantity with 422", () => {
  const req = { body: { name: "Paper", category: "Office", quantity: 1.5, unitPrice: 10, status: "in-stock" } }; const res = mockRes();
  validateCreateSupply(req, res, () => {});
  assert.equal(res.statusCode, 422); assert.equal(res.body.field, "quantity");
});

test("create validation rejects invalid status with 422", () => {
  const req = { body: { name: "Paper", category: "Office", quantity: 1, unitPrice: 10, status: "available" } }; const res = mockRes();
  validateCreateSupply(req, res, () => {});
  assert.equal(res.statusCode, 422); assert.equal(res.body.field, "status");
});

test("update validation allows partial updates", () => {
  const req = { body: { unitPrice: 12.25 } }; const res = mockRes(); let called = false;
  validateUpdateSupply(req, res, () => { called = true; });
  assert.equal(called, true); assert.equal(req.validatedBody.unitPrice, 12.25);
});

test("update validation rejects an empty update with 422", () => {
  const req = { body: {} }; const res = mockRes();
  validateUpdateSupply(req, res, () => {});
  assert.equal(res.statusCode, 422); assert.equal(res.body.field, "body");
});

test("authorization rejects missing role with 403", () => {
  const req = { headers: {} }; const res = mockRes();
  validateAdminOrOwner(req, res, () => {});
  assert.equal(res.statusCode, 403); assert.equal(res.body.field, "role");
});

test("authorization allows admin role", () => {
  const req = { headers: { "x-user-role": "admin" } }; const res = mockRes(); let called = false;
  validateAdminOrOwner(req, res, () => { called = true; });
  assert.equal(called, true); assert.equal(res.statusCode, 200);
});
