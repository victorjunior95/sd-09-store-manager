const salesService = require('../services/salesServices');
const status = require('../assistent/status');

const salesController = async (req, res) => {
  const productList = req.body;
  const sale = await salesService.generateSaleService(productList);
  if (sale.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(sale);
  }
  return res.status(status.OK).json(sale);
};

module.exports = { salesController };