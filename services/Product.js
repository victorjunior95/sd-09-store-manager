const ProductModels = require('../models/Product');
const Validate = require('./Validation');

const create = async (name, quantity) => {
  
  const isValid = await Validate.validateReturn(name, quantity);

  if(isValid === 'aprove') {
    console.log(name);
    const existingProduct = await ProductModels.findByName(name);
    console.log(existingProduct);
    if (existingProduct) {
      return {
        error: {
          code: 'invalid_data',
          message: 'Product already exist',
        },
      };
    }
    
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