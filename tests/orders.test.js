const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");
const suppliesData = require("../data/suppliesData");

test.beforeEach(() => suppliesData.clearForTests());

test("GET /supplies returns the inventory", async () => {
  const response = await request(app).get("/supplies");
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.data));
});

test("POST /supplies rejects an invalid quantity with 422", async () => {
  const response = await request(app).post("/supplies").send({ name: "Pencils", category: "Writing", quantity: 1.5, unitPrice: 12, status: "in-stock" });
  assert.equal(response.status, 422);
  assert.equal(response.body.field, "quantity");
  assert.equal(response.body.status, 422);
});

test("POST /supplies creates a valid supply", async () => {
  const response = await request(app).post("/supplies").send({ name: "Bond Paper", category: "Paper", quantity: 50, unitPrice: 45.5, status: "in-stock" });
  assert.equal(response.status, 201);
  assert.equal(response.body.data.name, "Bond Paper");
});

test("PUT /supplies/:id updates a supply", async () => {
  const response = await request(app).put("/supplies/1").send({ quantity: 25 });
  assert.equal(response.status, 200);
  assert.equal(response.body.data.quantity, 25);
});

test("DELETE /supplies/:id rejects unauthorized requests with 403", async () => {
  const response = await request(app).delete("/supplies/1");
  assert.equal(response.status, 403);
  assert.equal(response.body.status, 403);
});

test("DELETE /supplies/:id allows an administrator", async () => {
  const response = await request(app).delete("/supplies/1").set("x-user-role", "admin");
  assert.equal(response.status, 200);
  assert.equal(response.body.data.message, "Supply item deleted successfully");
});
