const {
  addNewProduct,
  getProduct,
} = require('../models/Products');

const validateLength = async (name) => {
  const nameLength = 5;
  const product = await getProduct(name);
  if (product !== null) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  };
  if (name.name.length < nameLength) return {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  };
  return name.name;
};

const validateQuantity = (quantity) => {
  if (typeof quantity !== 'number') return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  };
  if (quantity < 1) return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  };
  return quantity;
};

const newProduct = async ({ name, quantity }) => {
  const productName = await validateLength({ name });
  const productQuantity = validateQuantity(quantity);
  if (productName.err) {
    return productName;
  }
  if (productQuantity.err) {
    return productQuantity;
  }
  const product = await addNewProduct(productName, productQuantity);
  return product;
};


module.exports = {
  newProduct,
};