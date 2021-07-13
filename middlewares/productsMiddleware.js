const productsSchema = require('../schemas/productsSchema');
const error = require('../schemas/errorsSchema');

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;
  const { message } = productsSchema.validate(name, quantity);

  if (message) return res.status(error.UNPROCESSABLE_ENTITY).json({
    err: { 
      code: 'invalid_data',
      message
    }
  });

  next();
};

const validateProductId = (req, res, next) => {
  const { id } = req.params;
  const { message } = productsSchema.validateId(id);

  if (message) return res.status(error.UNPROCESSABLE_ENTITY).json({
    err: { 
      code: 'invalid_data',
      message
    }
  });

  next();
};

module.exports = { validateProduct, validateProductId };
