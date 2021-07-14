const { checkProductByName } = require('../models/productsModel');
const { HTTP_INVALID_DATA } = require('../httpResponse');


const errors = {
  nameLengthError: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    }
  },
  nameAlreadyExistError: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  },
  quantityError: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',  
    }
  },
  quantityStringError: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  }
};

const checkNewProductInfo = async (req, res, next) => {
  const { name, quantity } = req.body;
  const minNameLength = 5;
  const minQuantity = 1;

  const nameAlreadyExist = await checkProductByName({ name });

  if (name.length < minNameLength) {
    return res.status(HTTP_INVALID_DATA).json(errors.nameLengthError);
  }

  if (nameAlreadyExist !== null) {
    return res.status(HTTP_INVALID_DATA).json(errors.nameAlreadyExistError);
  }

  if (quantity < minQuantity) {
    return res.status(HTTP_INVALID_DATA).json(errors.quantityError);
  }

  if (isNaN(quantity)) {
    return res.status(HTTP_INVALID_DATA).json(errors.quantityStringError);
  }

  return next();
};

module.exports = checkNewProductInfo;