const Products = require('../models/Products');
const Sales = require('../models/Sales');

const create = async (array) => {
  return Sales.create(array);
};

module.exports = {
  create,
};
