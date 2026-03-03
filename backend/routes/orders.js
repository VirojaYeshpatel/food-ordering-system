const express = require('express');
const { Order } = require('../models/Order');
const { getPromoByCode } = require('../models/PromoCode');
const { calculateCartTotals } = require('../services/pricing');
const { cartsByUser } = require('./cart');

const router = express.Router();
const ordersByUser = new Map();

function getUserOrders(userId) {
  if (!ordersByUser.has(userId)) {
    ordersByUser.set(userId, []);
  }
  return ordersByUser.get(userId);
}

router.post('/:userId/checkout', (req, res) => {
  const { userId } = req.params;
  const cart = cartsByUser.get(userId);

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const promo = getPromoByCode(cart.promoCode);
  const totals = calculateCartTotals({ items: cart.items, promo });

  const order = new Order({
    id: `ord_${Date.now()}`,
    userId,
    items: cart.items,
    promoCode: cart.promoCode,
    ...totals,
    paymentProvider: 'stripe-test',
  });

  const orders = getUserOrders(userId);
  orders.unshift(order);

  cart.items = [];
  cart.promoCode = null;

  return res.status(201).json({ order, paymentIntent: createStripeTestPaymentIntent(order.total) });
});

router.get('/:userId', (req, res) => {
  const orders = getUserOrders(req.params.userId);
  return res.json({ orders });
});

function createStripeTestPaymentIntent(amount) {
  // TODO: Add test payment key here
  return {
    provider: 'stripe-test',
    clientSecret: `pi_test_${Math.round(amount * 100)}_secret_placeholder`,
  };
}

module.exports = { ordersRouter: router, ordersByUser };
