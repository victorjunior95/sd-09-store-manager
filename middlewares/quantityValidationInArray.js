const UNPROCESSABLE_ENTITY_STATUS = 422;
const MIN_QUANTITY = 0;

const quantityValidationInArray = (req, res, next) => {
  const sales = req.body;

  const invalidObjects = sales
    .find(({ quantity }) => typeof quantity !== 'number' || quantity <= MIN_QUANTITY);

  if (invalidObjects) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  return next();
};

module.exports = quantityValidationInArray;
