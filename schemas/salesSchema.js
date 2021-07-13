const define = { 
  ID_LENGHT: 24,
  QUANTITY_NOT_ALLOWED: 0,
};

const isNumber = (param) => typeof param === 'number';
const isNotEmpty = (param) => param > define.QUANTITY_NOT_ALLOWED;
const idLen = (param) => param.length === define.ID_LENGHT;
const isString = (param) => typeof param === 'string';

const validate = (quantity) => {
  switch (true) {
  case !isNumber(quantity):
  case !isNotEmpty(quantity): 
    return { message: 'Wrong product ID or invalid quantity' };
  default: return {};
  };
};

const validateId = (id) => {
  switch (true) {
  case !idLen(id):
  case !isString(id):
    return { message: 'Wrong sale ID format' };
  default: return {};
  };
};

module.exports = { validate, validateId };
