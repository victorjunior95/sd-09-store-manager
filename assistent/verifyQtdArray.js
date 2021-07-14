const verifyQtdArray = (array) => {
  if (array.every((item) => typeof item.quantity !== 'number' || item.quantity < 1 )) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  };
};

module.exports = verifyQtdArray;
