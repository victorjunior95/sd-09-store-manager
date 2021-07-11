const Products = require('../models/Products');
const Sales = require('../models/Sales');

const ZERO = 0;
const ONE = 1;

const CODE_NOT_FOUND = 404;
const CODE_UNPROCESSABLE = 422;

const create = async (array) => {
  changeProduct(array, 'sub');
  return Sales.create(array);
};

const getAll = async () => await Sales.getAll();

const findById = async (id) => {
  const sales = await Sales.findById(id);

  if (!sales) {
    return err('not_found', 'Sale not found', CODE_NOT_FOUND);
  }

  return sales;
};

const change = async (id, array) => {
  const sales = await Sales.change(id, array);

  if (!sales) {
    return err('invalid_data', 'Data is the same.', CODE_UNPROCESSABLE);
  }

  return sales;
};

const exclude = async (id) => {
  const sales = await Sales.findById(id);

  if (sales) {
    changeProduct(sales.itensSold, 'add');
    const excludeSale = await Sales.exclude(id);

    if (!excludeSale) {
      return err('invalid_data', 'Wrong sale ID format', CODE_UNPROCESSABLE);
    }

    return sales;
  }

  return err('invalid_data', 'Wrong sale ID format', CODE_UNPROCESSABLE);
};

const err = (code, message, codeNumber) => {
  return {
    err: {
      code,
      message,
    },
    code: codeNumber,
  };
};

const changeProduct = async (array, type) => {
  for (let i = ZERO; i < array.length; i += ONE) {
    const { productId, quantity } = array[i];

    const products = await Products.findById(productId);
    let qtd = ZERO;

    if (type === 'sub') {
      qtd = products.quantity - quantity;
    } else {
      qtd = products.quantity + quantity;
    }

    await Products.change(productId, products.name, qtd);
  }
};

module.exports = {
  create,
  getAll,
  findById,
  change,
  exclude,
};