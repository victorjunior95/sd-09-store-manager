const { ObjectId } = require('mongodb');

const zero = 0;

const validateSingleQuantity = (quantity) => {
  if (
    quantity < 1 || quantity === zero || typeof quantity !== 'number'
  ) throw {
    err:
      {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
  };
};

const validateQuantity = (orders) => {
  const wrongOrder = orders.find(
    (order) =>
      order.quantity < 1 || order.quantity === zero || typeof order.quantity !== 'number'
  );
  if (wrongOrder) throw {
    err:
    {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    }
  };
};

const validateSale = (sale) => {
  if (!sale) throw {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  };
  return null;
};

const validateSaleId = (id) => {
  const isValid = ObjectId.isValid(id);
  if (!isValid) throw {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  };
  return null;
};

const validateDeleteId = (id) => {
  console.log(id);
  const isValid = ObjectId.isValid(id);
  if (!isValid) throw {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    }
  };
  return null;
};

module.exports = {
  validateSaleId,
  validateQuantity,
  validateSale,
  validateDeleteId,
  validateSingleQuantity,
};
