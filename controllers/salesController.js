const salesService = require('../services/salesServices');
const status = require('../status/status');

const salesController = async (req, res) => {
  const productList = req.body;
  const sale = salesService.generateSaleService(productList);
  if (sale.error) {
    res.status(status.UNPROCESSABLE_ENTITY).json(sale);
  }
  res.status(status.OK).json(sale);
};

module.exports = { salesController };