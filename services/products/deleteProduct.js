const deleteDBProduct = require('../../models/products/deleteProduct');
const { invalidId } = require('../utils/errorMessages');

const deleteProduct = async (id) => {
  try {
    const product = await deleteDBProduct(id);
    return product;
  } catch (error) {
    return { code: 'invalid_data', message: invalidId };
  }
};

module.exports = deleteProduct;