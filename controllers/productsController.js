//aqui ficam os middlewares (funções que recebem parametros req, res, next, err)
const productsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const product = req.body;
  const { status, createdProduct }= await productsService.createProduct(product);
  res.status(status).json(createdProduct);
};

module.exports = {
  createProduct,
};
