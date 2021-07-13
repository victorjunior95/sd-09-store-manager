const salesServices = require('../services/salesServices');
const salesModel = require('../models/salesModel');

const DEFAULT_SUCCESS_STATUS = 200;
const NOT_FOUND_STATUS = 404;
const ERROR_STATUS = 422;

const createSale = async (req, res, next) => {
  const soldItems = req.body;
  const newSale = await salesServices.createSale(soldItems);
  if (newSale.err) return res.status(ERROR_STATUS).json(newSale);
  return res.status(DEFAULT_SUCCESS_STATUS).json(newSale);
};

const getSales = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const sales = await salesModel.getAllSales();
    return res.status(DEFAULT_SUCCESS_STATUS).json({ sales });
  }
  const sale = await salesModel.getSaleById(id);
  if (!sale) {
    return res.status(NOT_FOUND_STATUS).json({ err: {
      code: 'not_found',
      message: 'Sale not found'
    } });
  }
  return res.status(DEFAULT_SUCCESS_STATUS).json(sale);
};

const updateSale = async (req, res, next) => {
  const { id } = req.params;
  const soldItems = req.body;
  const updatedSale = await salesServices.updateSale(id, soldItems);
  if (updatedSale.err) return res.status(ERROR_STATUS).json(updatedSale);
  return res.status(DEFAULT_SUCCESS_STATUS).json(updatedSale);
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  const deletedSale = await salesModel.deleteSale(id);
  if (!deletedSale) {
    return res.status(ERROR_STATUS).json({ err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    } });
  }
  return res.status(DEFAULT_SUCCESS_STATUS).json(deletedSale);
};

module.exports = {
  createSale,
  getSales,
  updateSale,
  deleteSale,
};
