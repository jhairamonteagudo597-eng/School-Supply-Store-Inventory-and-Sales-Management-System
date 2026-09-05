let nextId = 4;

const supplies = [
  { id: 1, name: "Ballpen", category: "Writing", quantity: 120, unitPrice: 15.00, status: "in-stock" },
  { id: 2, name: "Notebook", category: "Paper", quantity: 80, unitPrice: 35.00, status: "in-stock" },
  { id: 3, name: "Pencil", category: "Writing", quantity: 12, unitPrice: 8.00, status: "low-stock" }
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function findAll() {
  return clone(supplies);
}

function findById(id) {
  const numericId = Number(id);
  return clone(supplies.find(item => item.id === numericId) || null);
}

function save(data) {
  const supply = { id: nextId++, ...clone(data) };
  supplies.push(supply);
  return clone(supply);
}

function updateById(id, data) {
  const numericId = Number(id);
  const index = supplies.findIndex(item => item.id === numericId);
  if (index === -1) return null;
  supplies[index] = { ...supplies[index], ...clone(data), id: numericId };
  return clone(supplies[index]);
}

function deleteById(id) {
  const numericId = Number(id);
  const index = supplies.findIndex(item => item.id === numericId);
  if (index === -1) return false;
  supplies.splice(index, 1);
  return true;
}

function search(term) {
  const query = String(term || "").trim().toLowerCase();
  return findAll().filter(item =>
    item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
  );
}

function lowStock(threshold = 20) {
  return findAll().filter(item => item.quantity <= threshold);
}

function clearForTests() {
  supplies.splice(0, supplies.length,
    { id: 1, name: "Ballpen", category: "Writing", quantity: 120, unitPrice: 15.00, status: "in-stock" },
    { id: 2, name: "Notebook", category: "Paper", quantity: 80, unitPrice: 35.00, status: "in-stock" },
    { id: 3, name: "Pencil", category: "Writing", quantity: 12, unitPrice: 8.00, status: "low-stock" }
  );
  nextId = 4;
}

module.exports = { findAll, findById, save, updateById, deleteById, search, lowStock, clearForTests };
