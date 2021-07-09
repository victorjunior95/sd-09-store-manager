const Products = require('../services/ProductsService');
const statusPostOk = 201;

const addNewProduct = async (req, res, next) => {
  const product = await Products.newProduct(req.body);

  if (product.err) return next(product);

  res.status(statusPostOk).json(product);
};

module.exports = {
  addNewProduct,
};