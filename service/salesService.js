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

// const list = async (id) => {
//   const products = await Products.list(id);
//   if (!products) return PRODUCTS_NOT_FOUND;

//   if (id) return { status: 200, response: products };

//   return { status: 200, response: { products } };
// };

// const update = async (id, name, quantity) => {
//   const bodyValidated = validateBody(name, quantity);
//   if (bodyValidated) return bodyValidated;

//   await Products.update(id, name, quantity);

//   return { status: 200, response: { _id: id, name, quantity } };
// };

// const remove = async (id) => {
//   const deleted = await Products.remove(id);
//   if (!deleted) return PRODUCTS_NOT_FOUND;

//   return { status: 200, response: { deleted }};
// };

module.exports = {
  register,
  // list,
  // update,
  // remove
};
