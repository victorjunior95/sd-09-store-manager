const productService = require('../service/products');

const addProduct = async(req, res) => {
  const { name, quantity} = req.body;
  const { status, product } = await productService.addProduct(name, quantity);
  return res.status(status).json(product);
};

// const getProduct = async(req, res) => {
//  const { status, products} = await productService.getProduct();
//  return res.status(status).json(products);
// };

// const productId = async(req, res) => {
//  const { _id} = req.params;
//  const { status, findId } = await productService.productId(_id);
//  return res.status(status).findId;
//};

module.exports = { addProduct };
