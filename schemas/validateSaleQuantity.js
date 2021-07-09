const validateSaleQuantity = (body) => {
  const result = body.find(({ quantity }) => {
    if (typeof quantity === 'string') {
      return {err: {
        message: 'Wrong product id or invalid quantity',
        code: 'invalid_data',
      }};
    }

    const min = 0;
    if (quantity <= min || !Number.isInteger(quantity)) {
      return {err: {
        message: 'Wrong product id or invalid quantity',
        code: 'invalid_data',
      }};
    }
    return null;
  });

  if (result) return {err: {
    message: 'Wrong product ID or invalid quantity',
    code: 'invalid_data',
  }};

  return {};
};

module.exports = validateSaleQuantity;