const {
  createService,
} = require('../services/productsService');

// response status code
const CREATED = 201;
const UNPROCESSABLE = 422;
/*
const getAll = async (req, res) => {
  const products = await getAllProducts();

  res.status(200).json(products);
};
*/
const create = async (req, res) => {
  const { _id, name, quantity } = req.body;

  const product = await createService(name, quantity);

  if (product.isError) return res.status(product.status).json(product.err);

  res.status(CREATED).json({ message: 'Produto criado com sucesso' });
};

module.exports = {
  //getAll,
  create,
};