const Sales = require('../model/salesModel');

const MIN_QUANTITY = 1;

const INVALID_QUANTITY_OR_ID = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  }
};

const PRODUCTS_NOT_FOUND = {
  status: 404,
  response: {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  }
};

const INVALID_SALE_ID = {
  status: 422,
  response: {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  }
};

const validateBody = (sales) => {
  const wrongQuantity = sales.find((sale) => (
    typeof sale.quantity !== 'number' || sale.quantity < MIN_QUANTITY
  ));

  if (wrongQuantity) return INVALID_QUANTITY_OR_ID;

  return null;
};

const register = async (sales) => {
  const bodyValidated = validateBody(sales);
  if (bodyValidated) return bodyValidated;

  const newSale = await Sales.register(sales);
  return { status: 200, response: newSale };
};

const list = async (id) => {
  const sales = await Sales.list(id);
  if (!sales) return PRODUCTS_NOT_FOUND;

  if (id) return { status: 200, response: sales };

  return { status: 200, response: { sales } };
};

const update = async (id, sales) => {
  const bodyValidated = validateBody(sales);
  if (bodyValidated) return bodyValidated;

  await Sales.update(id, sales);

  return { status: 200, response: { _id: id, itensSold: sales } };
};

const remove = async (id) => {
  const deleted = await Sales.remove(id);
  if (!deleted) return INVALID_SALE_ID;

  return { status: 200, response: { deleted }};
};

module.exports = {
  register,
  list,
  update,
  remove
};
