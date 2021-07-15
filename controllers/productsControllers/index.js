const productsServices = require('../../services/productsServices');
const unprocessableEntity = 422;
const okay = 200;
const created = 201;

const insertProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsServices.insertProduct(name, quantity);
  if (product.err) {
    return res.status(unprocessableEntity).json(product);
  }
  return res.status(created).json(product);
};

const getAll = async (_req, res) => {
  const allProducts = await productsServices.getAll();
  return res.status(okay).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const productById = await productsServices.getById(id);
  if (productById.err) {
    return res.status(unprocessableEntity).json(productById);
  }
  return res.status(okay).json(productById);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const productById = await productsServices.updateProductById(id, name, quantity);
  if (productById.err) {
    return res.status(unprocessableEntity).json(productById);
  }
  return res.status(okay).json(productById);
};

const deleteOneProduct = async (req, res) => {
  const { id } = req.params;
  const productById = await productsServices.deleteOneProduct(id);
  console.log(productById, 'CONTROLLERSSSSS');
  if (productById.err) {
    return res.status(unprocessableEntity).json(productById);
  }
  return res.status(okay).json(productById);
};

module.exports = {
  insertProduct,
  getAll,
  getById,
  updateProductById,
  deleteOneProduct
};
