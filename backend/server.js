const express = require('express');
const { cartRouter } = require('./routes/cart');
const { ordersRouter } = require('./routes/orders');

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

if (require.main === module) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Food ordering backend running on ${port}`);
  });
}

module.exports = { app };
