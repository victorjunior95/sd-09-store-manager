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

const getAllSales = async (_req, res) => {
  const allSales = await saleService.getAllSales();
  return res.status(status.OK).json(allSales);
};

const getSaleById = async (req, res) => {
  const {id} = req.params;

  const sale = await saleService.getSaleById(id);
  if (sale.err) {
    return res.status(status.NOT_FOUND).json(sale);
  }
  return res.status(status.OK).json(sale);
};

const updateSale = async (req, res) => {
  const {id} = req.params;
  const {productId, quantity} = req.body[0];

  const sale = await saleService.updateSale(id, productId, quantity);
  if (sale.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(sale);
  }
  return res.status(status.OK).json(sale);
};


module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
};
