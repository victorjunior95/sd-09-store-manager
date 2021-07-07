const httpCodes = require('../auxiliarFunctions/httpCodes');
const productsServices = require('../services/productsServices');

// 1 - Crie um endpoint para o cadastro de produtos
const postNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await productsServices.postNewProduct({ name, quantity });

  if(result.err) return next(result.err);

  res.status(httpCodes.created).json(result);
};

// dummy
const getAllProducts = async (req, res) => {
  res.status(httpCodes.ok).json({
    message: 'getAll on products'
  });
};

// dummy
const getProductById = (req, res) => {
  res.status(httpCodes.ok).json({
    message: 'getById on products'
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  postNewProduct,
};
