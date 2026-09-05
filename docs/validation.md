# Validation Rules — School Supply Store Inventory System

All create and update requests are validated by middleware before reaching the controller. Validation failures return HTTP `422` using the standard response shape below.

## Validation Matrix

| Route | Field | Validation Rules |
|---|---|---|
| **POST /supplies** | name | Required, string, 2–100 characters |
| | category | Required, string, 2–50 characters |
| | quantity | Required, integer, 0–9999 |
| | unitPrice | Required, number, ≥ 0, up to 2 decimal places |
| | status | Required: `in-stock`, `low-stock`, or `out-of-stock` |
| **PUT /supplies/:id** | name | Optional, string, 2–100 characters |
| | category | Optional, string, 2–50 characters |
| | quantity | Optional, integer, 0–9999 |
| | unitPrice | Optional, number, ≥ 0, up to 2 decimal places |
| | status | Optional: `in-stock`, `low-stock`, or `out-of-stock` |

## Standard Error Response

```json
{
  "status": 422,
  "data": null,
  "error": "clear human-readable message",
  "field": "field-name"
}
```

## Authorization

Deleting a supply requires the request to identify an `admin` or `owner` role through the authenticated user context or `x-user-role` header. Unauthorized deletion requests receive HTTP `403`.
