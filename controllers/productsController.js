const {
  productFormatValidator,
  registerProduct,
} = require('../services/productFormatValidator');

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

module.exports = {
  insertProduct,
};