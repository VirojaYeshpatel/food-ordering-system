const express = require('express');
const { promoCodes } = require('../data/store');

const router = express.Router();

router.get('/', (_req, res) => {
  return res.json(promoCodes);
});

router.post('/validate', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ message: 'Promo code is required' });
  }

  const promo = promoCodes.find((item) => item.code.toUpperCase() === String(code).toUpperCase());
  if (!promo || !promo.isActive) {
    return res.status(404).json({ message: 'Promo code is invalid or inactive' });
  }

  return res.json(promo);
});

module.exports = router;
