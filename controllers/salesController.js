const {
  createSalesService,
} = require('../services/salesService');


const OK = 200;
const CREATE = 201;
const INVALID_DATA = 422;

const createSalesController = async (req, res) => {
  const sales = req.body;

  const result = await createSalesService(sales);

  if (result.err) return res.status(INVALID_DATA).json(result);

  res.status(OK).json(result);
};

module.exports = {
  createSalesController,
};
