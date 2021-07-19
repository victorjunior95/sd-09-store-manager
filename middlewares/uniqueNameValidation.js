const { hasAnotherProductWithName } = require('../services/productService');

const UNPROCESSABLE_ENTITY_STATUS = 422;

const uniqueNameValidation = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (await hasAnotherProductWithName(name, id)) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  return next();
};

module.exports = uniqueNameValidation;
