const productService = require('../services/productService');

const createNewProduct = async (req, res, _next) =>{
  const { name, quantity } = req.body;
  const newProduct = await productService.createProduct(name, quantity);
  const created = 201;

  // if(!newProduct) {
  //   const nA = 405;
  //   return res.status(nA).json({message: ' teste mude essa frase no service - nao foi'});
  // };

  return res.status(created).json(newProduct);
};

module.exports = {
  createNewProduct,
};
