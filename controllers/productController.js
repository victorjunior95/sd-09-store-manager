const productServices = require('../services/productServices');
const add = 201;
const getStatus = 200;

const addProduct = async (req, res, next) => {
  const { body } = req;
  const response = await productServices.addProduct(body);
  
  if (response.err) return next(response);

  res.status(add).json(response);
};

const getAllProducts = async (req, res) => {
  const response = await productServices.getAllProducts();

  if (response.err) return next(response);

  res.status(getStatus).json({ products: response });
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const response = await productServices.getProductById(id);
  
  if (response.err) return next(response);

  res.status(getStatus).json(response);
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
};
