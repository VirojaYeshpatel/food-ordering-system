const express = require('express');
const { carts, menus } = require('../data/store');

const router = express.Router();

const getOrCreateCart = (userId) => {
  if (!carts.has(userId)) {
    carts.set(userId, {
      userId,
      items: [],
      updatedAt: new Date().toISOString(),
    });
  }

  return carts.get(userId);
};

router.get('/:userId', (req, res) => {
  const cart = getOrCreateCart(req.params.userId);
  return res.json(cart);
});

router.post('/:userId/items', (req, res) => {
  const { menuItemId, quantity = 1 } = req.body;
  if (!menuItemId || quantity < 1) {
    return res.status(400).json({ message: 'menuItemId and positive quantity are required' });
  }

  const menuItem = menus.find((item) => item.id === menuItemId);
  if (!menuItem) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  const cart = getOrCreateCart(req.params.userId);
  const existingItem = cart.items.find((item) => item.menuItemId === menuItemId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      menuItemId,
      quantity,
      unitPrice: menuItem.price,
      name: menuItem.name,
    });
  }

  cart.updatedAt = new Date().toISOString();
  return res.status(201).json(cart);
});

router.patch('/:userId/items/:menuItemId', (req, res) => {
  const quantity = Number(req.body.quantity);
  if (!Number.isFinite(quantity) || quantity < 1) {
    return res.status(400).json({ message: 'quantity must be a positive number' });
  }

  const cart = getOrCreateCart(req.params.userId);
  const item = cart.items.find((entry) => entry.menuItemId === req.params.menuItemId);

  if (!item) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  item.quantity = quantity;
  cart.updatedAt = new Date().toISOString();

  return res.json(cart);
});

router.delete('/:userId/items/:menuItemId', (req, res) => {
  const cart = getOrCreateCart(req.params.userId);
  const nextItems = cart.items.filter((entry) => entry.menuItemId !== req.params.menuItemId);

  if (nextItems.length === cart.items.length) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  cart.items = nextItems;
  cart.updatedAt = new Date().toISOString();

  return res.json(cart);
});

module.exports = router;
