# School Supply Store Inventory and Sales Management System

A JavaScript/Node.js CRUD API for managing school supply inventory. The project separates routing, validation/authorization middleware, controllers, and a small data layer so the application is easy to test and maintain.

## Requirements

- Node.js 18+ recommended
- npm

## Install

```bash
npm install
```

## Run

```bash
npm start
```

The API starts on port 3000 by default.

## Test

```bash
npm test
```

The test suite uses Node's built-in test runner and Supertest. It covers controller behavior, CRUD routes, validation (`422`), and authorization (`403`).

## Main endpoints

- `GET /supplies`
- `GET /supplies/:id`
- `POST /supplies`
- `PUT /supplies/:id`
- `DELETE /supplies/:id` (admin/owner required)
- `GET /supplies/search?q=paper`
- `GET /supplies/low-stock`

The same router is available under `/products` for compatibility with the project's earlier routing documentation.

## Project structure

```text
controllers/      Business logic
routes/           Express route definitions
data/             Inventory data layer
middleware/       Validation and authorization
tests/             Automated tests
docs/              Backlog, routing, validation, AI notes, wireframes
```

## Response format

Successful responses use `{ status, data, error }`. Validation errors use HTTP 422 and include the invalid `field`; unauthorized requests use HTTP 403.
