const servicesSales = require('../services/sales');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;
const UNPROCESSEBLEENTRY_STATUS = 422;


const saleQuantityIsValid = (res, itensSold) => {
  const minNumber = 0;

  itensSold.forEach((sale) => {
    if (sale.quantity <= minNumber || isNaN(sale.quantity)) {
      return res.status(UNPROCESSEBLEENTRY_STATUS)
        .json({
          err: {
            code: 'invalid_data',
            message: 'Wrong product ID or invalid quantity',
          }
        });
    }
  });
};

const create = async (req, res, _next) => {
  const [...itensSold] = req.body;

  saleQuantityIsValid (res, itensSold);

  const sale = await servicesSales.create(itensSold);

  return res.status(OK_STATUS).json(sale);
  
};

const edit = async (req, res, _next) => {
  const { id } = req.params;
  const [...itensSold] = req.body;

  saleQuantityIsValid (res, itensSold);

  const sale = await servicesSales.edit(id, itensSold);

  return res.status(OK_STATUS).json(sale);
  
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const sale = await servicesSales.getById(id);

  if (!sale) {
    return res.status(NOT_FOUND_STATUS)
      .json({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        }
      });
  }

  return res.status(OK_STATUS).json(sale);
};

const getAll = async (_req, res, _next) => {
  const allSales = await servicesSales.getAll();

  return res.status(OK_STATUS).json({ sales: allSales});
};

const remove = async (req, res, _next) => {
  const { id } = req.params;
  const sale = await servicesSales.remove(id);

  if (!sale) {
    return res.status(UNPROCESSEBLEENTRY_STATUS)
      .json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        }
      });
  }

  return res.status(OK_STATUS).json(sale);
};

module.exports = {
  create,
  edit,
  getById,
  getAll,
  remove,
};

// {
//   "name": "product_name",
//   "quantity": "product_quantity"
// }

// [
//   {
//   "productId": "product_id",
//   "quantity": "product_quantity",
//   },

// ]
// 60ec757ab0c0342f37df571b

// [
//   {
//   "productId": "60ec755cb0c0342f37df5718",
//   "quantity": "2"
//   },
//   {
//   "productId": "60ec757ab0c0342f37df571b",
//   "quantity": "1"
//   }
// ]