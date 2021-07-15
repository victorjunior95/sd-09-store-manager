const verifySaleQtd = (quantity) => {
  const zero = 0;
  if (quantity <= zero || typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  };
};

module.exports = verifySaleQtd;
