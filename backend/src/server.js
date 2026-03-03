const express = require('express');
const protectedRoutes = require('./routes/protected');
const { initializeFirebaseAdmin } = require('./firebaseAdmin');

const app = express();

app.use(express.json());

initializeFirebaseAdmin();

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', protectedRoutes);

module.exports = app;
