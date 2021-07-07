const validateQuant = (quantity) => {
  if (typeof quantity === 'string') {
    return {err: {
      message: '\"quantity\" must be a number',
      code: 'invalid_data',
    }};
  }

  const min = 0;
  if (quantity <= min || !Number.isInteger(quantity)) {
    return {err: {
      message: '\"quantity\" must be larger than or equal to 1',
      code: 'invalid_data',
    }};
  }
  return {};
};

module.exports = validateQuant;