const MIN_CHARACTERS = 5;
const VALUE_LIMIT = 0;

const validateProduct = (product) => {
  const { name, quantity } = product;

  if (name.length < MIN_CHARACTERS) {
    throw(Error('"name" length must be at least 5 characters long'));
  }

  if (quantity < VALUE_LIMIT || quantity === VALUE_LIMIT) {
    throw(Error('"quantity" must be larger than or equal to 1'));
  }

  if( typeof quantity !== 'number') throw(Error('"quantity" must be a number'));

  return null;
};

module.exports = {
  validateProduct,
};
