const rescue = require('express-rescue');
const {
  createSalesService,
  getSalesService,
  getSaleByIdService,
  updateProductByIdService,
} = require('../services/salesService');

const { checkError } = require('../services/tools');


const OK = 200;
const NOT_FOUND = 404;
const INVALID_DATA = 422;

const createSales = rescue(async (req, res) => {
  const sales = req.body;

  const result = await createSalesService(sales);

  res.status(OK).json(result);
});

const getSales = async (_req, res) => {
  const result = await getSalesService();

  res.status(OK).json(result);
};

const getSaleById = rescue(async (req, res) => {
  const saleId = req.params.id;

  const result = await getSaleByIdService(saleId);

  if (result.err) {
    return res.status(NOT_FOUND).Json(result);
  }

  res.status(OK).Json(result);
});

const updateSalesById = rescue(async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await updateProductByIdService(id, data);

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
};

const errorSalesResponse = (err, _req, res, _next) => {
  res.status(`${err.status}`)
    .json({ err: { code: err.code, message: err.message }});
};

module.exports = {
  createSales,
  createErrorSales,
  errorSalesResponse,
  getSales,
  getSaleById,
  updateSalesById,
};