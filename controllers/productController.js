const productService = require('../services/productService');

const createNewProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.createProduct(name, quantity);
  const created = 201;
  const fail = 422;

  if(newProduct.err) {
    return res.status(fail).json(newProduct);
  };

  return res.status(created).json(newProduct);
};

module.exports = {
  createNewProduct,
};
