const productService = require('../services/productService');
const CREATED = 201;
const UNPROCESSABLE = 422;

const productCreate =  async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productService.createNewProduct(name, quantity);
  if (newProduct.err) {
    console.log(newProduct);
    return res.status(UNPROCESSABLE).json(newProduct);
  }
  return res.status(CREATED).json(newProduct);
};

module.exports = { productCreate };