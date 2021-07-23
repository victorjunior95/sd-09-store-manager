const productsModel = require('../models/Products');

const create = (name, quantity) => productsModel.create(name, quantity);

module.exports = { create };