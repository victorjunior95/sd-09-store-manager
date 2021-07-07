const { registerProductService } = require('../services/registerProductService');
const { httpStatusCode: { ok }} = require('../utils');

const registerProductController = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const response = await registerProductService(name, quantity);
    return res.status(ok).json(response);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = { registerProductController };
