const express = require('express');
const { Cart } = require('../models/Cart');
const { getPromoByCode } = require('../models/PromoCode');
const { calculateCartTotals } = require('../services/pricing');

const router = express.Router();
const cartsByUser = new Map();

function getOrCreateCart(userId) {
  if (!cartsByUser.has(userId)) {
    cartsByUser.set(userId, new Cart({ id: `cart-${userId}`, userId, items: [] }));
  }
  return cartsByUser.get(userId);
}

router.get('/:userId', (req, res) => {
  const cart = getOrCreateCart(req.params.userId);
  const promo = getPromoByCode(cart.promoCode);
  const totals = calculateCartTotals({ items: cart.items, promo });
  return res.json({ cart, totals });
});

router.post('/:userId/items', (req, res) => {
  const cart = getOrCreateCart(req.params.userId);
  cart.addItem(req.body);
  const promo = getPromoByCode(cart.promoCode);
  const totals = calculateCartTotals({ items: cart.items, promo });
  return res.status(201).json({ cart, totals });
});

router.patch('/:userId/items/:menuItemId', (req, res) => {
  const cart = getOrCreateCart(req.params.userId);
  cart.updateQuantity(req.params.menuItemId, Number(req.body.quantity));
  const promo = getPromoByCode(cart.promoCode);
  const totals = calculateCartTotals({ items: cart.items, promo });
  return res.json({ cart, totals });
});

router.post('/:userId/promo', (req, res) => {
  const cart = getOrCreateCart(req.params.userId);
  const { code } = req.body;
  const promo = getPromoByCode(code);

  if (!promo) {
    return res.status(400).json({ message: 'Invalid promo code' });
  }

  cart.applyPromoCode(promo.code);
  const totals = calculateCartTotals({ items: cart.items, promo });
  return res.json({ cart, totals, promo });
});

module.exports = { cartRouter: router, cartsByUser };
