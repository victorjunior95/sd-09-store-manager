const ProductModels = require('../models/Product');
const Validate = require('./Validation');

const create = async (name, quantity) => {
  
  const isValid = await Validate.validateReturn(name, quantity);
  const existingProduct = await ProductModels.findByName(name);
  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  if(isValid === 'aprove') {
    
    const { insertedId } = await ProductModels.create(name, quantity);
    
    return {
      _id: insertedId,
      name,
      quantity,
    };
  }
  return {
  
    isValid
    
  };

};

const update = async (id, name, quantity) => {
  const isValid = await Validate.validateReturn(name, quantity);
  if(isValid === 'aprove') {
        
    const { insertedId } = await ProductModels.update(id, name, quantity);
    return {
      _id: insertedId,
      name,
      quantity,
    };
  }
  return {
    
    isValid
    
  };
  
};

const remove = async (id) => ProductModels.remove(id);

const getAll = async () => {
  const products = await ProductModels.getAll();
  return products;
};

const findByIdServices = async (id) => {
  const products = await ProductModels.findById(id);
  return products;
};

module.exports = {
  create,
  findByIdServices,
  getAll,
  update,
  remove,
};