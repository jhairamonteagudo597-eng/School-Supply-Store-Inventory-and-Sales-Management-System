const STATUSES = new Set(["in-stock", "low-stock", "out-of-stock"]);

function fail(res, field, error) {
  return res.status(422).json({ status: 422, data: null, error, field });
}

function validateName(value) {
  return typeof value === "string" && value.trim().length >= 2 && value.trim().length <= 100;
}
function validateCategory(value) {
  return typeof value === "string" && value.trim().length >= 2 && value.trim().length <= 50;
}
function validateQuantity(value) {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 9999;
}
function validateUnitPrice(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && Number.isInteger(value * 100);
}

function validateFields(req, res, next, required) {
  const body = req.body || {};
  const allowed = ["name", "category", "quantity", "unitPrice", "status"];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return fail(res, "body", "Request body must be a JSON object");
  }

  for (const key of Object.keys(body)) {
    if (!allowed.includes(key)) return fail(res, key, `Unknown field: ${key}`);
  }

  if (required.length === 0 && Object.keys(body).length === 0) return fail(res, "body", "At least one field is required for an update");

  for (const field of required) {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      return fail(res, field, `${field} is required`);
    }
  }

  if (body.name !== undefined && !validateName(body.name)) return fail(res, "name", "Name must be a string from 2 to 100 characters");
  if (body.category !== undefined && !validateCategory(body.category)) return fail(res, "category", "Category must be a string from 2 to 50 characters");
  if (body.quantity !== undefined && !validateQuantity(body.quantity)) return fail(res, "quantity", "Quantity must be an integer from 0 to 9999");
  if (body.unitPrice !== undefined && !validateUnitPrice(body.unitPrice)) return fail(res, "unitPrice", "Unit price must be a non-negative number with up to 2 decimal places");
  if (body.status !== undefined && !STATUSES.has(body.status)) return fail(res, "status", "Status must be in-stock, low-stock, or out-of-stock");

  req.validatedBody = { ...body };
  return next();
}

function validateCreateSupply(req, res, next) {
  return validateFields(req, res, next, ["name", "category", "quantity", "unitPrice", "status"]);
}

function validateUpdateSupply(req, res, next) {
  return validateFields(req, res, next, []);
}

module.exports = { validateCreateSupply, validateUpdateSupply };
