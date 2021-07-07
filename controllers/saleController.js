const saleService = require('../services/saleService');
const status = require('./status');

const createSale = async (req, res) => {
  const products = req.body;
  const sale = await saleService.createSale(products);
  if (sale.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(sale);
  }

  return res.status(status.OK).json(sale);
};

module.exports = {
  createSale,
};
