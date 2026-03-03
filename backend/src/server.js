const express = require('express');
const { port } = require('../config/env');
const indexRoutes = require('../routes');

const app = express();

app.use(express.json());
app.use('/api', indexRoutes);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
