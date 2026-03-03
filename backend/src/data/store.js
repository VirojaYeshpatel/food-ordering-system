/**
 * In-memory data store.
 * Firestore integration should replace this implementation.
 */

const restaurants = [];
const menus = [];
const carts = new Map();
const promoCodes = [
  { code: 'SAVE10', discountType: 'percent', discountValue: 10, isActive: true },
  { code: 'WELCOME15', discountType: 'percent', discountValue: 15, isActive: true },
  { code: 'FREEMEAL', discountType: 'fixed', discountValue: 12, isActive: false },
];
const orders = [];

module.exports = {
  restaurants,
  menus,
  carts,
  promoCodes,
  orders,
};
