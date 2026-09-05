# School Supply Store Inventory and Sales Management System — Routes

## Routing and Controller Map

| Method | Path | Middleware | Controller | Story |
|---|---|---|---|---|
| GET | `/supplies` | — | `getAllSupplies` | US-03 |
| GET | `/supplies/:id` | — | `getSupplyById` | US-03 |
| POST | `/supplies` | `validateCreateSupply` | `createSupply` | US-02 |
| PUT | `/supplies/:id` | `validateUpdateSupply` | `updateSupply` | US-04 |
| DELETE | `/supplies/:id` | `validateAdminOrOwner` | `deleteSupply` | US-05 |
| GET | `/supplies/search?q=` | — | `searchSupplies` | Product search |
| GET | `/supplies/low-stock` | — | `getLowStock` | US-09 |

The same supplies router is mounted under `/products` for compatibility with the earlier Week 3 route naming.

## Flow

`HTTP Request → Express Router → Validation/Authorization Middleware → Controller → Data Layer → Standard Response`

Controllers do not perform routing or request validation. Validation failures return `422`; authorization failures return `403`; missing records return `404`.

## Standard Success Response

```json
{
  "status": 200,
  "data": {},
  "error": null
}
```
