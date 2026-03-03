const express = require('express');
const { menus, orders, promoCodes } = require('../data/store');

const router = express.Router();

const applyPromo = (subtotal, promoCode) => {
  const promo = promoCodes.find(
    (entry) => entry.code.toUpperCase() === String(promoCode || '').toUpperCase() && entry.isActive,
  );

  if (!promo) {
    return { discount: 0, promoCode: null };
  }

  const discount = promo.discountType === 'percent'
    ? subtotal * (promo.discountValue / 100)
    : promo.discountValue;

  return { discount: Number(discount.toFixed(2)), promoCode: promo.code };
};

router.post('/', (req, res) => {
  const { userId, items, promoCode, paymentMethod = 'mobile_wallet' } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'userId and non-empty items are required' });
  }

  const normalizedItems = [];
  for (const item of items) {
    const menuItem = menus.find((menu) => menu.id === item.menuItemId);
    const quantity = Number(item.quantity);

    if (!menuItem || !Number.isFinite(quantity) || quantity < 1) {
      return res.status(400).json({ message: 'Each item needs valid menuItemId and quantity' });
    }

    normalizedItems.push({
      menuItemId: menuItem.id,
      name: menuItem.name,
      quantity,
      unitPrice: menuItem.price,
    });
  }

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const promo = applyPromo(subtotal, promoCode);
  const deliveryFee = 1.99;
  const total = Math.max(0, subtotal - promo.discount + deliveryFee);

  const order = {
    id: `order_${Date.now()}`,
    userId,
    source: 'mobile',
    items: normalizedItems,
    subtotal: Number(subtotal.toFixed(2)),
    discount: promo.discount,
    deliveryFee,
    total: Number(total.toFixed(2)),
    promoCode: promo.promoCode,
    paymentMethod,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  return res.status(201).json(order);
});

module.exports = router;
