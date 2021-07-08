const {
  registerProductService,
  getAllProductsService,
  getByIdService,
  updateProductByIdService,
  deleteProductByIdService,
} = require('../services/productsService');

const registerProductController = async (req, res) => {
  const { body } = req;
  const result = await registerProductService(body);
  const { code, response } = result;
  return res.status(code).json(response);
};

const getAllProductsController = async (_req, res) => {
  const result = await getAllProductsService();
  const { code, response } = result;
  return res.status(code).json({ products: [...response] });
};

const getByIdController = async (req, res) => {
  const { params: { id } } = req;
  const product = await getByIdService(id);
  const { code, response } = product;
  return res.status(code).json(response);
};

const updateProductByIdController = async (req, res) => {
  const { params: { id } } = req;
  const { body } = req;
  const result = await updateProductByIdService(id, body);
  const { code, response } = result;
  return res.status(code).json(response);
};

const deleteProductByIdController = async (req, res) => {
  const { params: { id } } = req;
  const result = await deleteProductByIdService(id);
  const { code, response } = result;
  return res.status(code).json(response);
};

module.exports = {
  registerProductController,
  getAllProductsController,
  getByIdController,
  updateProductByIdController,
  deleteProductByIdController,
};
