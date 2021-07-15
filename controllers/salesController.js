const {
  createSalesService,
} = require('../services/salesService');

const { checkError } = require('../services/tools');


const OK = 200;
const NOT_FOUND = 404;
const INVALID_DATA = 422;

const createSales = async (req, res) => {
  const sales = req.body;

  const result = await createSalesService(sales);

  if (result.err) {
    return res.status(INVALID_DATA).json(result);
  };

  res.status(OK).json(result);
};

const createErrorSales = (err, _req, _res, next) => {

  if (err.message === 'not_found_sale') {
    const erro = checkError('not_found', NOT_FOUND, 'Sale not found');

    return next(erro);
  }

  if (err.message === 'stock_problem') {
    const newError = new Error();
    const e = checkError(err.message, NOT_FOUND, 'Such amount is not permitted to sell');

    return next(e);
  }

  const erro = checkError('invalid_data', INVALID_DATA, err.message);

  return next(erro);
};

const errorSalesResponse = (err, _req, res, _next) => {
  res.status(`${err.status}`)
    .json({ err: { code: err.code, message: err.message }});
};

module.exports = {
  createSales,
  createErrorSales,
  errorSalesResponse,
};