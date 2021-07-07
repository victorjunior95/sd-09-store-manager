const { INVALID_DATA } = require('./responseCodes');
const validateQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  const minQuantityLength = 1;
  if (quantity < minQuantityLength) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
    return res.status(INVALID_DATA).json(errorObj);
  }
  if (typeof quantity !== 'number') {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: '"quantity" must be a number'
      }
    };
    return res.status(INVALID_DATA).json(errorObj);
  }
  return next();
};

module.exports = validateQuantity;