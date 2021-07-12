const { InvalidArgumentError } = require('../errors');

const QUANT_MIN_AMOUNT = 1;

const validateQuantFormat = (quantity) => quantity && quantity >= QUANT_MIN_AMOUNT;

module.exports = (quantity) => {
  const quantityIsValid = validateQuantFormat(quantity);

  if (typeof quantity !== 'number') {
    throw new InvalidArgumentError('"quantity" must be a number');
  }
  if (!quantityIsValid) {
    throw new InvalidArgumentError('"quantity" must be larger than or equal to 1');
  }
};