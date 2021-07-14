const {
  productFormatValidator,
  registerProduct,
  allProductsService,
  findProduct,
} = require('../services/indexProducts');

const insertProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const formatIsValid = productFormatValidator(name, quantity);
  if (formatIsValid !== true) {
    const { code, message } = formatIsValid;
    return res.status(code).json(message);
  };

  const register = await registerProduct(name, quantity);

  const { code, message } = register;
  return res.status(code).json(message);
};

const allProducts = async (_req, res) => {
  const { code, message } = await allProductsService();

  res.status(code).json(message);
};

const findProductById = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await findProduct(id);

  res.status(code).json(message);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await updateProduct(id);

  return res.status(code).json(message);
};

module.exports = {
  insertProduct,
  allProducts,
  findProductById,
  updateProductById,
};