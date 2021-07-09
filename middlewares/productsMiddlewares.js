const { validate } = require('../schemas/productsSchema');

const validateProducts = async (req, res, next) => {
  const { name, quantity } = req.body;

  const validations = validate(name, quantity);

  if (validations.message) {
    const { status, code, message } = validations;
    return res.status(status).json({
      err: {
        code: code,
        message: message,
      },
    });
  }

  next();
};

module.exports = {
  validateProducts,
};
