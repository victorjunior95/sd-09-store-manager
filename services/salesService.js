const salesModel = require('../models/salesModel');
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_NOTPROCESS_STATUS = 422;
const HTTP_OK_STATUS = 200;
const productMinQuantity = 0;

const validateCreate =  (itensSold) => {
  return itensSold.reduce((accumulator, item) => {
    return (accumulator ?
      accumulator :
      typeof item.quantity !== 'number' ||
      item.quantity < productMinQuantity ||
      item.quantity === productMinQuantity
    );
  }, false);
};

const create = async (itensSold) => {
  if (validateCreate(itensSold))
    return {
      status: HTTP_NOTPROCESS_STATUS,
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };

  const soldsCreate = await salesModel.create(itensSold);
  return {
    status: HTTP_OK_STATUS,
    soldsCreate,
  };
};

const listAll = async () => {
  const sales = await salesModel.listAll();
  return {
    status : HTTP_OK_STATUS,
    sales,
  };
};

listById = async (id) => {
  const sale = await salesModel.listSaleById(id);
  if (!sale) {
    return {
      status: HTTP_NOTFOUND_STATUS,
      err: {code: 'not_found', message: 'Sale not found' }
    };
  };
  return {
    status: HTTP_OK_STATUS,
    sale,
  };
};

module.exports = {
  create,
  listAll,
  listById,
};