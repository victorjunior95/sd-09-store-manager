const salesModel = require('../models/salesModel');
const { ObjectId } = require('mongodb');

const HTTP_NOTFOUND_STATUS = 404;
const HTTP_NOTPROCESS_STATUS = 422;
const HTTP_OK_STATUS = 200;
const productMinQuantity = 0;

const validateCreateUpdate =  (itensSold) => {
  const isError = itensSold.reduce((accumulator, item) => {
    return (accumulator ?
      accumulator :
      (!Number.isInteger(item.quantity)) ||
      typeof item.quantity !== 'number' ||
      item.quantity < productMinQuantity ||
      item.quantity === productMinQuantity
    );
  }, false);
  if (isError) {
    return {
      status: HTTP_NOTPROCESS_STATUS,
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
};

const create = async (itensSold) => {
  const isError = await validateCreateUpdate(itensSold);
  if (isError){
    return isError;
  }
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

const update = async (id, itensSold) => {
  const isError = await validateCreateUpdate(itensSold);
  if (isError) {
    return isError;
  }
  const soldUpdate = await salesModel.update(id, itensSold);
  return {
    status: HTTP_OK_STATUS,
    soldUpdate,
  };
};

const exclude = async (id) => {

  if (!ObjectId.isValid(id)) {
    return { status: HTTP_NOTPROCESS_STATUS,
      err: { code: 'invalid_data', message: 'Wrong sale ID format'}
    };}

  const saleExists = await salesModel.listSaleById(id);
  if (!saleExists) {
    return {
      status: HTTP_NOTFOUND_STATUS,
      err: { code: 'invalid_data', message: 'Wrong sale ID format'}
    };
  }
  const sale = await salesModel.exclude(id);
  return {
    status: HTTP_OK_STATUS,
    sale
  };

};

module.exports = {
  create,
  listAll,
  listById,
  update,
  exclude,
};