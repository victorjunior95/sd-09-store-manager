const validateQuantity = (productsSold) => {
  const lengthQuantity = 0;
  const theresError = productsSold.some(({ quantity }) => {
    return quantity <= lengthQuantity || typeof quantity !== 'number';
  });
  if (theresError) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
};

module.exports = {
  validateQuantity
};
