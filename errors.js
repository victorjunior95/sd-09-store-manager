// Invalid Format
const INVALID_PRODUCT_LENGTH = {
  code: 422,
  message: {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',  
    }
  },
};

const DUPLICATE_REGISTRATION = {
  code: 422,
  message: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  }
};

const INVALID_QUANTITY_NUMBER = {
  code: 422,
  message: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  },
};

const INVALID_QUANTITY_TYPE = {
  code: 422,
  message: {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  },
};

const INVALID_ID = {
  code: 422,
  message: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
};

const INVALID_ID_OR_QUANTITY = {
  code: 422,
  message: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  },
};

const NOT_FOUND_SALE = {
  code: 404,
  message: {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  },
};

const INVALID_SALE_ID = {
  code: 422,
  message: {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  },
};

module.exports = {
  INVALID_PRODUCT_LENGTH,
  DUPLICATE_REGISTRATION,
  INVALID_QUANTITY_NUMBER,
  INVALID_QUANTITY_TYPE,
  INVALID_ID,
  INVALID_ID_OR_QUANTITY,
  NOT_FOUND_SALE,
  INVALID_SALE_ID,
};