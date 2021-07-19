const MIN_LENGTH = 5;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const nameValidation = (req, res, next) => {
  const { name } = req.body;

  if (!(typeof name === 'string' && name.length >= MIN_LENGTH)) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }

  return next();
};

module.exports = nameValidation;
