const {
  createSaleService,
  readSaleByIdService,
  readAllSalesService,
  updateSaleService
} = require('../services/salesService');
const { httpStatusCode: { ok } } = require('../utils');

const createSaleController = async (req, res, next) => {
  try {
    const sales = req.body;
    const teste = await createSaleService(sales);
    return res.status(ok).json(teste);
  } catch(error) {
    return next(error);
  }
};

const readSaleByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allSales = await readSaleByIdService(id);
    return res.status(ok).json(allSales);
  } catch (error) {
    return next(error);
  }
};

const readAllSalesController = async (req, res, next) => {
  try {
    const allSales = await readAllSalesService();
    return res.status(ok).json(allSales);
  } catch (error) {
    return next(error);
  }
};

const updateSaleController = async (req, res, next) => {
  try {
    const { productId, quantity} = req.body[0];
    console.log(quantity);
    const { id } = req.params;
    const saleUpdated = await updateSaleService(id, productId, quantity);
    return res.status(ok).json(saleUpdated);
  } catch (error) {
    return next(error);
  }
};

module.exports = { 
  createSaleController,
  readSaleByIdController,
  readAllSalesController,
  updateSaleController
};
