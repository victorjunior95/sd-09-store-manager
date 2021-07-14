const {
  productFormatValidator,
  // registerProduct,
} = require('../services/indexProducts');
const {
  allSalesService,
  findSale,
} = require('../services/indexSales');

const insertSales = async (req, res) => {
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

const allSales = async (_req, res) => {
  const { code, message } = await allSalesService();

  res.status(code).json(message);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await findSale(id);

  res.status(code).json(message);
};

module.exports = {
  insertSales,
  allSales,
};