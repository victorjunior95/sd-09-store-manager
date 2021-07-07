const {
  registerProductService,
} = require('../services/productsService');

const registerProductController = async (req, res) => {
  const { body } = req;
  const registeredProduct = await registerProductService(body);
  const { code, response } = registeredProduct;
  res.status(code).json(response);
};

module.exports = {
  registerProductController,
};
