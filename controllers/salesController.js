const { create } = require('../services/salesService');

const createSales = async (req, res, _next) => {
  const newSales = req.body;
  const { status, result } = await create(newSales);
  return res.status(status).json(result);
};

module.exports = {
  createSales,
};
