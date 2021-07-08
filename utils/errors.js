const nameLengthErr = {
  'err': {
    'code': 'invalid_data',
    'message':'"name" length must be at least 5 characters long'
  }
};

const quantityErr = {
  'err': {
    'code': 'invalid_data',
    'message':'"quantity" must be larger than or equal to 1'
  }
};

const dataTypeErr = {
  'err': {
    'code': 'invalid_data',
    'message':'"quantity" must be a number'
  }
};

const productExistenceErr = {
  'err': {
    'code': 'invalid_data',
    'message':'Product already exists'
  }
};

const idFormatErr = {
  'err': {
    'code': 'invalid_data',
    'message': 'Wrong id format'
  }
};

const quantitySaleErr = {
  'err': {
    'code': 'invalid_data',
    'message':'Wrong product ID or invalid quantity'
  }
};

const saleNotFoundErr = {
  'err': {
    'code': 'not_found',
    'message':'Sale not found'
  }
};

const saleErr = {
  'err': {
    'code': 'invalid_data',
    'message':'Wrong sale ID format'
  }
};

const notStockErr = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

module.exports = {
  nameLengthErr,
  quantityErr,
  dataTypeErr,
  productExistenceErr,
  idFormatErr,
  quantitySaleErr,
  saleNotFoundErr,
  saleErr,
  notStockErr
};
