const httpCodes = require('../auxiliarFunctions/httpCodes');
const productsServices = require('../services/productsServices');

// 1 - Crie um endpoint para o cadastro de produtos
const postNewProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await productsServices.postNewProduct({ name, quantity });

  if(result.err) return next(result.err);

  res.status(httpCodes.created).json(result);
};

// 2 - Crie um endpoint para listar os produtos
const getProducts = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    const result = await productsServices.getAllProducts();

    return res.status(httpCodes.ok).json(result);
  };

  const result = await productsServices.getProductById(id);

  res.status(httpCodes.ok).json(result);
};

module.exports = {
  postNewProduct,
  getProducts,
};
