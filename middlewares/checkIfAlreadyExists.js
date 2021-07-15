const { checkProductByName } = require('../models/productsModel');
const { HTTP_INVALID_DATA } = require('../httpResponse');

const productAlreadyExistError = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  }
};

const checkifAlreadyExists = async (req, res, next) => {
  const { name } = req.body;
  const nameAlreadyExist = await checkProductByName({ name });

  if (nameAlreadyExist) {
    return res.status(HTTP_INVALID_DATA).json(productAlreadyExistError);
  }
  
  next();
};

module.exports = checkifAlreadyExists;