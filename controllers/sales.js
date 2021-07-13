const servicesSales = require('../services/sales');
const { messageError } = require('../middlewares/errors');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND_STATUS = 404;
const UNPROCESSEBLEENTRY_STATUS = 422;

const saleQuantityIsValid = (itensSold) => {
  const minNumber = 0;

  itensSold.forEach((sale) => {
    if (sale.quantity <= minNumber || isNaN(sale.quantity)) {
      throw messageError (UNPROCESSEBLEENTRY_STATUS, 'invalid_data',
        'Wrong product ID or invalid quantity');
    }
  });
};

const create = async (req, res, next) => {
  try {
    const [...itensSold] = req.body;

    saleQuantityIsValid (itensSold);
  
    const sale = await servicesSales.create(itensSold);
  
    return res.status(OK_STATUS).json(sale);
  }

  catch(err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [...itensSold] = req.body;
  
    saleQuantityIsValid (itensSold);
  
    const sale = await servicesSales.edit(id, itensSold);
  
    return res.status(OK_STATUS).json(sale);
  }
  
  catch(err) {
    next(err);
  }
  
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await servicesSales.getById(id);

    if (!sale) {
      throw messageError (NOT_FOUND_STATUS, 'not_found', 'Sale not found');
    }

    return res.status(OK_STATUS).json(sale);
  }

  catch(err) {
    next(err);
  }
  
};

const getAll = async (_req, res, _next) => {
  const allSales = await servicesSales.getAll();

  return res.status(OK_STATUS).json({ sales: allSales});
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await servicesSales.remove(id);
  
    if (!sale) {
      throw messageError (UNPROCESSEBLEENTRY_STATUS, 'invalid_data',
        'Wrong sale ID format');
    }
  
    return res.status(OK_STATUS).json(sale);
  }

  catch(err) {
    next(err);
  }

};

module.exports = {
  create,
  edit,
  getById,
  getAll,
  remove,
};
