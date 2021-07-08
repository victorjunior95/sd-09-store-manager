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
const getProducts = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    const result = await productsServices.getAllProducts();

    return res.status(httpCodes.ok).json(result);
  };

  const result = await productsServices.getProductById(id);

  if (result.err) return next(result.err);

  res.status(httpCodes.ok).json(result);
};

// 3 - Crie um endpoint para atualizar um produto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await productsServices.updateProduct({id, name, quantity});

  if(result === 1) return res.status(httpCodes.ok).json({ id, name, quantity });

  res.status(httpCodes.bad_request).json({
    err: {
      code: 'bad_request',
      message: 'Não foi possivel atualizar'
    }
  });
};

// 4 - Crie um endpoint para deletar um produto
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const result = await productsServices.deleteProduct(id);

  if(result.err) return next(result.err);

  res.status(httpCodes.ok).json(result);
};

module.exports = {
  postNewProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
