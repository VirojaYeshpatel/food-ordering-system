const express = require('express');
const Menu = require('../models/menu.model');
const { menus, restaurants } = require('../data/store');
const { getFirestoreClient } = require('../services/firestore');

const router = express.Router();

// CREATE menu item
router.post('/', (req, res) => {
  const { restaurantId, name, description, price, imageUrl, category } = req.body;

  if (!restaurantId || !name || price === undefined) {
    return res
      .status(400)
      .json({ message: 'restaurantId, name and price are required' });
  }

  const restaurantExists = restaurants.some((item) => item.id === restaurantId);
  if (!restaurantExists) {
    return res.status(404).json({ message: 'Restaurant not found for menu item' });
  }

  const menu = new Menu({
    id: `menu_${Date.now()}`,
    restaurantId,
    name,
    description,
    price,
    imageUrl,
    category,
  });

  // Firestore placeholder: write menu document to firestore once configured.
  getFirestoreClient();
  menus.push(menu);

  return res.status(201).json(menu);
});

// READ all menu items
router.get('/', (_req, res) => {
  return res.json(menus);
});

// READ menu items by restaurant
router.get('/restaurant/:restaurantId', (req, res) => {
  const restaurantMenus = menus.filter(
    (item) => item.restaurantId === req.params.restaurantId,
  );

  return res.json(restaurantMenus);
});

// UPDATE menu item
router.put('/:id', (req, res) => {
  const index = menus.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  menus[index] = {
    ...menus[index],
    ...req.body,
  };

  // Firestore placeholder: update menu document.
  getFirestoreClient();

  return res.json(menus[index]);
});

// DELETE menu item
router.delete('/:id', (req, res) => {
  const index = menus.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  const [removed] = menus.splice(index, 1);

  // Firestore placeholder: delete menu document.
  getFirestoreClient();

  return res.json(removed);
});

module.exports = router;
