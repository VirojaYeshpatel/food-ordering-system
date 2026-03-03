const express = require('express');
const restaurantsRouter = require('./routes/restaurants.routes');
const menusRouter = require('./routes/menus.routes');
const cartsRouter = require('./routes/carts.routes');
const promosRouter = require('./routes/promos.routes');
const checkoutRouter = require('./routes/checkout.routes');
const ordersRouter = require('./routes/orders.routes');
const mobileOrdersRouter = require('./routes/mobile-orders.routes');

const app = express();

app.use(express.json());
app.get('/api', (_req, res) => {
  res.status(200).json({ message: 'Food Ordering Backend API is running', status: 'ok' });
});
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/menus', menusRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/promos', promosRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/mobile/orders', mobileOrdersRouter);

module.exports = app;
