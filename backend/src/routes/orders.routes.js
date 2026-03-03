const express = require('express');
const { orders } = require('../data/store');

const router = express.Router();

router.get('/', (_req, res) => res.json(orders));

router.get('/:id', (req, res) => {
  const order = orders.find((entry) => entry.id === req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  return res.json(order);
});

module.exports = router;
