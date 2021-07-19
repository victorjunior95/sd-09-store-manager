const UNPROCESSABLE_ENTITY_STATUS = 422;

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;

  if (typeof quantity !== 'number') {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  if (quantity < 1) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  return next();
};

module.exports = quantityValidation;
