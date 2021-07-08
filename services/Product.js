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

module.exports = {
  create,
};