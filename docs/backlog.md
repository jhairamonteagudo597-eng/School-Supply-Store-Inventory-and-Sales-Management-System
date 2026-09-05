# School Supply Store Inventory and Sales Management System

## Project Backlog

| ID | User Story | Priority | Acceptance Criteria |
|---|---|---|---|
| US-01 | As an administrator, I want to log in securely so that only authorized users can access the system. | High | 1. Valid credentials allow access.<br>2. Invalid credentials are rejected.<br>3. Unauthorized users cannot access protected functions. |
| US-02 | As an administrator, I want to add school supplies so that new products can be recorded. | High | 1. Required product fields are validated.<br>2. A valid product is saved.<br>3. The new product appears in the inventory list. |
| US-03 | As an administrator, I want to view school supplies so that I can monitor available products. | High | 1. Inventory returns a list of products.<br>2. Each product shows its key fields.<br>3. An individual product can be retrieved by ID. |
| US-04 | As an administrator, I want to update product information so that inventory records stay accurate. | High | 1. Editable fields are validated.<br>2. A valid update changes the stored record.<br>3. Unknown product IDs return an error instead of crashing. |
| US-05 | As an administrator, I want to delete products so that unavailable products can be removed. | Medium | 1. Only an authorized administrator/owner can delete.<br>2. Successful deletion removes the product.<br>3. Unknown IDs return 404. |
| US-06 | As a store staff member, I want to record sales so that transactions are properly documented. | High | 1. A sale records selected products and quantities.<br>2. Invalid sale data is rejected.<br>3. A successful sale receives a transaction ID. |
| US-07 | As a store staff member, I want the system to calculate the total amount automatically so that sales recording is easier. | High | 1. Line totals are calculated from quantity and price.<br>2. The transaction total equals the sum of line totals.<br>3. The total is returned in the transaction response. |
| US-08 | As a store staff member, I want inventory to update after every sale so that stock records remain accurate. | High | 1. Sold quantity is deducted from inventory.<br>2. A sale cannot exceed available stock.<br>3. Inventory reflects the completed transaction. |
| US-09 | As an administrator, I want to view low-stock products so that I know which supplies need restocking. | Medium | 1. Low-stock products can be listed.<br>2. The threshold can be applied consistently.<br>3. Products above the threshold are excluded. |
| US-10 | As an administrator, I want to generate inventory and sales reports so that I can monitor store performance. | Medium | 1. Inventory report can be generated.<br>2. Sales report can be generated.<br>3. Reports return structured data that can be displayed. |

## Wireframe-to-Story Mapping

| Story | Wireframe | Screen |
|---|---|---|
| US-01 | `docs/wireframes/US-01-login.png` | Login Page |
| US-03 | `docs/wireframes/US-03-dashboard.png` | Dashboard |
| US-02, US-04, US-05, US-09 | `docs/wireframes/US-02-inventory.png` | Inventory Page |
| US-06, US-07, US-08 | `docs/wireframes/US-06-sales.png` | Sales Page |
| US-10 | `docs/wireframes/US-10-reports.png` | Reports Page |

## Product Management

- Add, view, update, delete, search, and monitor products.

## Sales Management

- Record sales, calculate totals, save transactions, and update inventory.

## Reports

- Inventory report, sales report, low-stock report, and transaction history.
