const createProduct = require('../models/productsModel');

const OK_STATUS = 200;

const newProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await createProduct.dbProduct(name, quantity);

  return res.status(OK_STATUS).json(result);

};

module.exports = newProduct;
