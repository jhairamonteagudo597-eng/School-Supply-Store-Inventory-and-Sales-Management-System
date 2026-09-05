const express = require("express");
const suppliesRouter = require("./controllers/routes/supplies");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ status: 200, data: { name: "School Supply Store Inventory and Sales Management System" }, error: null }));
app.use("/supplies", suppliesRouter);
app.use("/products", suppliesRouter);

app.use((req, res) => res.status(404).json({ status: 404, data: null, error: "Route not found", field: null }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) return res.status(422).json({ status: 422, data: null, error: "Invalid JSON request body", field: "body" });
  return res.status(500).json({ status: 500, data: null, error: "Internal server error", field: null });
});

module.exports = app;
