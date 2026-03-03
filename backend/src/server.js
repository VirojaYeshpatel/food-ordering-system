const { port } = require('../config/env');
const app = require('./app');

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
