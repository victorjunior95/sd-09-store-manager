const modelPoducts = require('../models/products');

const create = async (name, quantity) => {
  const findName = await modelPoducts.getByName(name);
  
  if (findName) {
    return false;
  }

  const product = await  modelPoducts.create(name, quantity);

  return product;
};

module.exports = {
  create,
};