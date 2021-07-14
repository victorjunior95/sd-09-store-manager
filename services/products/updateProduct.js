const updateDBProduct = require('../../models/products/updateProduct');
const verifyProduct = require('./verifyProduct');
const { invalidId } = require('../utils/errorMessages');


const updateProduct = async (id, { name, quantity }) => {
  const response = await verifyProduct(name, quantity);
  
  if(response) return response;

  try {
    const product = await updateDBProduct(id, { name, quantity });
    return product;
  } catch (error) {
    return { code: 'invalid_data', message: invalidId };
  }
};

module.exports = updateProduct;