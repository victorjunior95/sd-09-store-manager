const { INVALID_DATA } = require('./responseCodes');
const { getAllProducts } = require('../models/productsModel');
const validateName = async (req, res, next) => {
  const { name } = req.body;
  const dbProducts = await getAllProducts();
  const minNameLength = 5;
  if (name.length < minNameLength) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
    return res.status(INVALID_DATA).json(errorObj);
  }
  if (dbProducts.some((product) => product.name === name)) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: 'Product already exists'
      }
    };
    return res.status(INVALID_DATA).json(errorObj);
  }
  return next();
};

module.exports = validateName;