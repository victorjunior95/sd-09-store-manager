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
        message: 'Wrong product ID or invalid quantity'
      }
    };

  }

  if(!validNumber(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }  
};

const sales = (req, res, next) => {
  const values = req.body;

  values.forEach(({name, quantity}) => {
    const quantityChecker = validateQuantity(quantity);
    if(quantityChecker) {
      return res.status(code.post_error).json(quantityChecker);
    }      
  });

  next();
};

module.exports = sales;
