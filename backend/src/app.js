const express = require('express');
const restaurantsRouter = require('./routes/restaurants.routes');
const menusRouter = require('./routes/menus.routes');

const app = express();

app.use(express.json());
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/menus', menusRouter);

module.exports = app;
