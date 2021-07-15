const productServices = require('../services/productsServices');

const HTML_OK = 200;

const registerNewProduct = async (req, res) => {
  const {name, quantity} = req.body;
  const newProduct = {name, quantity};
  const result = await productServices.registerNewProduct(newProduct);
  return res.status(result.status).json(result.message);
};

module.exports = { registerNewProduct };