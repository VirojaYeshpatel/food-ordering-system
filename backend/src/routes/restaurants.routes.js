const express = require('express');
const Restaurant = require('../models/restaurant.model');
const { restaurants } = require('../data/store');
const { getFirestoreClient } = require('../services/firestore');

const router = express.Router();

// CREATE restaurant
router.post('/', (req, res) => {
  const { name, description, address, imageUrl } = req.body;

  if (!name || !address) {
    return res.status(400).json({ message: 'name and address are required' });
  }

  const restaurant = new Restaurant({
    id: `rest_${Date.now()}`,
    name,
    description,
    address,
    imageUrl,
  });

  // Firestore placeholder: write restaurant document to firestore once configured.
  getFirestoreClient();
  restaurants.push(restaurant);

  return res.status(201).json(restaurant);
});

// READ all restaurants
router.get('/', (_req, res) => {
  return res.json(restaurants);
});

// READ one restaurant
router.get('/:id', (req, res) => {
  const restaurant = restaurants.find((item) => item.id === req.params.id);

  if (!restaurant) {
    return res.status(404).json({ message: 'Restaurant not found' });
  }

  return res.json(restaurant);
});

// UPDATE restaurant
router.put('/:id', (req, res) => {
  const index = restaurants.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Restaurant not found' });
  }

  restaurants[index] = {
    ...restaurants[index],
    ...req.body,
  };

  // Firestore placeholder: update restaurant document.
  getFirestoreClient();

  return res.json(restaurants[index]);
});

// DELETE restaurant
router.delete('/:id', (req, res) => {
  const index = restaurants.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Restaurant not found' });
  }

  const [removed] = restaurants.splice(index, 1);

  // Firestore placeholder: delete restaurant document.
  getFirestoreClient();

  return res.json(removed);
});

module.exports = router;
