const { registerProductService } = require('../services/registerProductService');

const registerProductController = (req, res) => {
  const { name, quantity } = req.body;

  const response = registerProductService(name, quantity);
  res.status(200).json(response);
};

module.exports = { registerProductController };
