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

  res.status(OK_STATUS).json(sale);
  
};

const edit = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity} = req.body;

  productNameIsValid(res, name);
  productQuantityIsValid(res, quantity);

  const product = await servicesProducts.edit(id, name, quantity);

  res.status(OK_STATUS).json(product);
  
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

  res.status(OK_STATUS).json(sale);
};

const getAll = async (_req, res, _next) => {
  const allSales = await servicesSales.getAll();

  res.status(OK_STATUS).json({ sales: allSales});
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

  res.status(OK_STATUS).json(sale);
};

module.exports = {
  create,
  edit,
  getById,
  getAll,
  remove,
};

// "_id": "60ea06cb97b6571b2da9aa8f",
//             "name": "LX-200 GPS 400mm",
//             "quantity": 6

//             {
//                 "name": "LX-200 GPS 500mm",
//                 "quantity": 6
//               }