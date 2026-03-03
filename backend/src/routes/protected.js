const express = require('express');
const { verifyFirebaseToken } = require('../middleware/verifyFirebaseToken');

const router = express.Router();

// Protected route example.
router.get('/profile', verifyFirebaseToken, (req, res) => {
  res.json({
    message: 'Protected profile route accessed successfully.',
    user: req.user,
  });
});

module.exports = router;
