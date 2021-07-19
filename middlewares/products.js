const code = require('../utils/httpCodes');

const validNumber = (value) => {
  const min_value = 0;
  if(value <= min_value){
    return false;
  }
  return true;
};

const validateQuantity = (quantity) => {
  if(typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };

  }

  if(!validNumber(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }  
};

const validateName = (name) => {
  const max_length = 5;
  
  if(name === undefined) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
  }

  if(name.length < max_length) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
  }  
};


const products = (req, res, next) => {
  const {name, quantity} = req.body;

  const nameChecker = validateName(name);
  const quantityChecker = validateQuantity(quantity);

  if(nameChecker) {
    return res.status(code.post_error).json(nameChecker);
  }

  if(quantityChecker) {
    return res.status(code.post_error).json(quantityChecker);
  }

  next();
};

module.exports = products;
