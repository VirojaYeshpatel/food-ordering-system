const getIndex = (req, res) => {
  res.status(200).json({
    message: 'Food Ordering Backend API is running',
    status: 'ok'
  });
};

module.exports = { getIndex };
