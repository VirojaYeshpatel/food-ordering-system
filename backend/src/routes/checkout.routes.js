const express = require('express');
const { carts, promoCodes, orders } = require('../data/store');

const router = express.Router();

const calculateTotals = (items, promoCode) => {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const promo = promoCodes.find(
    (entry) => entry.code.toUpperCase() === String(promoCode || '').toUpperCase() && entry.isActive,
  );

  let discount = 0;
  if (promo) {
    discount = promo.discountType === 'percent'
      ? subtotal * (promo.discountValue / 100)
      : promo.discountValue;
  }

  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    deliveryFee,
    total: Number(total.toFixed(2)),
    promoCode: promo ? promo.code : null,
  };
};

router.post('/', (req, res) => {
  const { userId, promoCode, paymentMethod = 'card' } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  const cart = carts.get(userId);
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const totals = calculateTotals(cart.items, promoCode);

  const order = {
    id: `order_${Date.now()}`,
    userId,
    items: cart.items,
    paymentMethod,
    ...totals,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);
  carts.set(userId, { ...cart, items: [], updatedAt: new Date().toISOString() });

  return res.status(201).json(order);
});

module.exports = router;
