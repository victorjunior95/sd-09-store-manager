const productService = require('../services/productService');
const UNPROCESSABLE = 422;
const CREATED = 201;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.addProduct(name, quantity);

  if(newProduct.err){
    return res.status(UNPROCESSABLE).json(newProduct);
  }
  //console.log( newProduct.id, name, quantity );
  return res.status(CREATED)
    .json( newProduct);
};

module.exports = {
  createProduct,
};
