const {
  addProductToDB,
  getAll,
  findProductById,
  updateProduct,
  deleteProduct,
} = require('../services/productsService');

const { created, ok } = require('../services/httpStatusCode');

async function postProductToDB(req, res, _next) {
  const { name, quantity } = req.body;
  const result = await addProductToDB(name, quantity);
  res.status(created).json(result);
}

async function getAllProducts(_req, res, _next) {
  const result = await getAll();
  res.status(ok).json({ products: result });
}

async function getProductById(req, res, _next) {
  const { id } = req.params;
  const result = await findProductById(id);
  res.status(ok).json(result);
}

async function updateProductById(req, res, _next) {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await updateProduct(id, name, quantity);
  res.status(ok).json(result);
}

async function deleteProductById(req, res, _next) {
  const { id } = req.params;
  const result = await deleteProduct(id);
  res.status(ok).json(result);
}

module.exports = {
  postProductToDB,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
