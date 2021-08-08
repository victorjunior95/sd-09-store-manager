const Joi = require('joi');
const stock = require('../models/Products');
const model = require('../models/Sales');

const UNAVAIALBLE_REQUISITION = 422;

const schema = Joi.array().items({

  productId: Joi.string().required,
  quantity: Joi.number().min(1).required

});

const create = async (item) => {
  const { error } = schema.validate(item);

  if(error) {
    throw {
      err: {
        code: 'invalid_data',
        error: {message: 'Wrong product ID or invalid quantity'}
      },
      status: 422
      
    };   
  }
  const { productId } = item[0];
  const { name, quantity } = await stock.findById(productId);
  const itemQuantity = quantity - item[0].quantity;
  const NO_STOCK = 0;

  if (itemQuantity < NO_STOCK) {
    return {
      status: NOT_FOUND,
      code: 'stock_problem',
      error: { message: 'Such amount is not permitted to sell' }
    };
  }

  await stock.updateProduct(productId, name, itemQuantity);
  const newSale = await model.create(item);


  return newSale;
};

module.exports = {
  create
};