const { ObjectId } = require('mongodb');
const productModel = require('../../models/products');

const MINIMUM_LENGTH = 5;
const MINIMUM_QUANTITY = 1;
const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;
const HTTP_STATUS_NOT_FOUND = 404;

const validateName = async (name) => {
  if (name.length < MINIMUM_LENGTH)
    return {
      status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };

  return { isValid: true };
};

const validateQuantityforProducts = (quantity) => {
  if (quantity < MINIMUM_QUANTITY)
    return {
      status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };

  if (typeof quantity === 'string')
    return {
      status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };

  return { isValid: true };
};

const validateQuantityforSales = async (sales) => {
  let result = {};
  sales.forEach((sale) => {
    if (sale.quantity < MINIMUM_QUANTITY || typeof sale.quantity === 'string')
      return (result = {
        status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
  });

  const { products } = await productModel.getAllProductsDB();
  sales.forEach((sale) => {
    products.forEach((product) => {
      if (sale.productId == product._id && sale.quantity > product.quantity) {
        return (result = {
          status: HTTP_STATUS_NOT_FOUND,
          err: {
            code: 'stock_problem',
            message: 'Such amount is not permitted to sell',
          },
        });
      }
    });
  });

  return result.err ? result : { isValid: true };
};

const validateIDs = async (sales) => {
  let result = {};
  let { products } = await productModel.getAllProductsDB();
  products = products.map((product) => product._id.toString());

  sales.forEach((sale) => {
    if (!ObjectId.isValid(sale.productId)) return (result = null);
    const isValid = products.some((id) => id === sale.productId);
    if (!isValid) {
      return (result = {
        status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  });

  return result.err ? result : { isValid: true };
};

module.exports = {
  validateName,
  validateQuantityforProducts,
  validateQuantityforSales,
  validateIDs,
};
