const rescue = require('express-rescue');

const {
  createSalesService,
  getSalesAllService,
  getSaleByIdService,
  updateSaleByIdService,
  deleteSaleByIdService,
} = require('../services/salesService');

const OK = 200;
const INVALID_DATA = 422;
const NOT_FOUND = 404;

const createSalesController = rescue(async (req, res) => {
  const sales = req.body;
  const result = await createSalesService(sales);

  res.status(OK).json(result);
});

const getSalesAllController = async (_req, res) => {
  const result = await getSalesAllService();

  res.status(OK).json(result);
};

const getSaleByIdController = rescue(async (req, res) => {
  const saleId = req.params.id;
  const result = await getSaleByIdService(saleId);

  res.status(OK).json(result);
});

const updateSaleByIdController = rescue(async (req, res) => {
  const saleId = req.params.id;
  const data = req.body;
  const result = await updateSaleByIdService(saleId, data);

  res.status(OK).json(result);
});

const deleteSaleByIdController = rescue(async (req, res) => {
  const saleId = req.params.id;
  const result = await deleteSaleByIdService(saleId);

  res.status(OK).json(result);
});

const createErrorSales = (err, _req, _res, next) => {
  
  if (err.message === 'not_found_sale') {
    const newError = new Error();
    newError.code = 'not_found';
    newError.status = NOT_FOUND;
    newError.message = 'Sale not found';
    return next(newError);
  }
  
  if (err.message === 'stock_problem') {
    const newError = new Error();
    newError.code = err.message;
    newError.status = NOT_FOUND;
    newError.message = 'Such amount is not permitted to sell';
    return next(newError);
  }
  
  const newError = new Error();
  newError.code = 'invalid_data';
  newError.status = INVALID_DATA;
  newError.message = err.message;
  return next(newError);
  
  next(newError);
};

const errorSales = (err, _req, res, _next) => {
  res.status(`${err.status}`).json({ err: { code: err.code, message: err.message }});
};

module.exports = {
  createSalesController,
  getSalesAllController,
  getSaleByIdController,
  updateSaleByIdController,
  deleteSaleByIdController,
  createErrorSales,
  errorSales,
};
