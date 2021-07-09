const minimalQuantity = 0,
  minimalChars = 5,
  STATUS_422 = 422;

const validationName = (req, res, next) => {
  const name = req.body.name;
  if (name.length < minimalChars) {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    });
  }
  return next();
};

const validationQuantity = (req, res, next) => {
  const quantity = req.body.quantity;
  if (typeof (quantity) !== 'number') {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity <= minimalQuantity|| quantity % 1 !== minimalQuantity) {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  return next();
};


module.exports = {
  validationName,
  validationQuantity
};
