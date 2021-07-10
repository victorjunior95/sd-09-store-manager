const validateQuantity = (quantity) => {
  const lengthQuantity = 0;
  if (quantity <= lengthQuantity) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }
  if (typeof quantity === 'string') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }
};

module.exports = validateQuantity;
