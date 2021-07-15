const {
  getProductById,
  updateQuantityProductById,
} = require('../models/products');

const MIN_CHARACTERS = 5;
const VALUE_LIMIT = 1;

const validateProduct = (product) => {
  const { name, quantity } = product;

  if (name.length < MIN_CHARACTERS) {
    throw(Error('"name" length must be at least 5 characters long'));
  }

  if (quantity < VALUE_LIMIT || quantity === VALUE_LIMIT) {
    throw(Error('"quantity" must be larger than or equal to 1'));
  }

  if( typeof quantity !== 'number') {
    throw(Error('"quantity" must be a number'));
  };

  if( typeof quantity !== 'number') {
    throw(Error('"quantity" must be a number'));
  };

  return null;
};

const ERROR_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  }
};

const validSales = async (sales) => {
  sales.forEach((sale) => {
    if (sale.quantity < VALUE_LIMIT || typeof sale.quantity === 'string') {
      throw(Error('Wrong product ID or invalid quantity'));
    }
  });
};

const validateStock = async (sales) => {
  const products = await Promise
    .all(sales.map((sale) => getProductById(sale.productId)));

  products.forEach((product, index) => {
    if (!product || sales[index].quantity > product.quantity) {
      throw(Error('stock_problem'));
    }
  });
};

const updateStock = async (sales, type) => {
  await Promise
    .all(sales
      .map((sale) => updateQuantityProductById(
        sale.productId,
        `${type === 'DEC' ? -sale.quantity : sale.quantity}`)));
};

const checkError = (codeErr, statusErr, msgErr) => {
  const newError = new Error();

  newError.code = codeErr;
  newError.status = statusErr;
  newError.message = msgErr;

  return newError;
};

module.exports = {
  validateProduct,
  validSales,
  checkError,
  validateStock,
  updateStock,
};
