const { createSales } = require('../services/salesService');

const STATUS_SUCCESS = 200;
const STATUS_ERROR = 422;
const STATUS_CREATED = 201;

const salesCreation = async (req, res, next) => {
  const salesData = req.body;
  const salesCreated = await createSales(salesData);
  return res.status(STATUS_SUCCESS).json(salesCreated);
};

module.exports = {
  salesCreation,
};