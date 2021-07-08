const quantity = (quantity) => {
  const minQuantity = 0;
  if (quantity < minQuantity
      || quantity === minQuantity
      || typeof quantity === 'string') {
    throw {
      status: 422,
      err: { 
        code: 'invalid_data', 
        message: 'Wrong product ID or invalid quantity',
      }
    };
  }
};

module.exports = {
  quantity,
};