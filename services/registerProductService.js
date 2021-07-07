const { registerProductModel } = require('../models/registerProductModel');

const registerProductService = (name, quantity) => {
  if(!name || !quantity) return ('erro');

  const response = registerProductModel(name, quantity);
  return response;
};

module.exports = { registerProductService };
