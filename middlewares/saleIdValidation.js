const { ObjectId } = require('mongodb');

const UNPROCESSABLE_ENTITY_STATUS = 422;

const saleIdValidation = (req, res, next) => {
  const { id } = req.params;

  if (ObjectId.isValid(id)) {
    req.params.id = ObjectId(id);
    return next();
  }

  return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  });

};

module.exports = saleIdValidation;
