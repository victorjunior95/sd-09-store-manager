const productServices = require('../services/productServices');
const created = 201;

const postProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const request = await productServices.postServices(name, quantity);

  res.status(request.status).json(request.response);

};

const getAllProducts = async (req, res) => {
  const request = await productServices.getAllProducts();

  res.status(request.status).json(request.response);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const request = await productServices.getOneProduct(id);

  res.status(request.status).json(request.response);
};

const editProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const request = await productServices.editProduct(name, quantity, id);

  res.status(request.status).json(request.response);
};

module.exports = {
  postProduct,
  getAllProducts,
  getProduct,
  editProduct
};
