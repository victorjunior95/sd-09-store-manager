const findDBProduct = require('../../models/products/findProduct');
const { invalidId } = require('../utils/errorMessages');

const findProduct = async (id) => {
  try {
    const product = await findDBProduct(id);
    return product;
  } catch (error) {
    return { code: 'invalid_data', message: invalidId };
  }
};

module.exports = findProduct;