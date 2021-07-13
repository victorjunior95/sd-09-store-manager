const define = { 
  NAME_MINIMUM_LENGHT: 5,
  ID_LENGHT: 24,
  QUANTITY_NOT_ALLOWED: 0,
};

const isString = (param) => typeof param === 'string';
const len = (param) => param.length > define.NAME_MINIMUM_LENGHT;
const isNumber = (param) => typeof param === 'number';
const isNotEmpty = (param) => param > define.QUANTITY_NOT_ALLOWED;
const idLen = (param) => param.length === define.ID_LENGHT;

const validate = (name, quantity) => {
  switch (true) {
  case !isString(name): return { message: '"name" must be a string' };
  case !len(name): return { message: '"name" length must be at least 5 characters long' };
  case !isNumber(quantity): return { message: '"quantity" must be a number' };
  case !isNotEmpty(quantity): return { 
    message: '"quantity" must be larger than or equal to 1' 
  };
  default: return {};
  };
};

const validateId = (id) => {
  switch (true) {
  case !idLen(id):
  case !isString(id):
    return { message: 'Wrong id format' };
  default: return {};
  };
};

module.exports = { validate, validateId };
