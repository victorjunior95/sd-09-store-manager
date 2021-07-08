const products = require('../models/productsModule');
const validate = require('./validateProducts');


const create = async (product) => {
  await validate.name(product.name);
  validate.quantity(product.quantity);
  
  const result = await products.create(product);
  return result;
};

const findAll = async () => {
  const result = await products.findAll(); 
  return result;
};

const findById = async (id) => {
  const result = await products.findById(id);
  if (result === null) {
    throw ({
      status: 422,
      err: { 
        code: 'invalid_data', 
        message: 'Wrong id format',
      }
    });
  }
  return result;
};

const update = async (product) => {
  validate.quantity(product.quantity);
  await validate.name(product.name);

  const result = await products.update(product); 
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};