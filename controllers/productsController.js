const { create, allProducts, getById,
  updateService } = require('../services/productsService');

const createProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const { status, result } = await create(name, quantity);
  return res.status(status).json(result);
};

const getAllProducts = async (_req, res, _next) => {
  const { status, result } = await allProducts();
  return res.status(status).json(result);
};

const getByIdProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { status, result } = await getById(id);
  return res.status(status).json(result);
};

const updateProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, result } = await updateService(id, name, quantity);
  return res.status(status).json(result);
};

module.exports = {
  createProduct,
  getAllProducts,
  getByIdProduct,
  updateProduct,
};
