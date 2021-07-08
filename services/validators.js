const createValidator = async (allProducts, name, quantity) => {
  const minLength = 5;
  const minQuantity = 1;

  if (allProducts.find((product) => product.name === name)) {
    return { err: {
      'code': 'invalid_data',
      'message': 'Product already exists',
    }};
  }
  if (name.length < minLength) {
    return { err: {
      'code': 'invalid_data',
      'message': '"name" length must be at least 5 characters long',
    }};
  }
  if (quantity < minQuantity) {
    return { err: {
      'code': 'invalid_data',
      'message': '"quantity" must be larger than or equal to 1',
    }};
  }
  if (typeof quantity !== 'number') {
    return { err: {
      'code': 'invalid_data',
      'message': '"quantity" must be a number',
    }};
  }
};

// const getByIdValidator = () => {

// }

module.exports = {
  createValidator,
  // getByIdValidator,
};
