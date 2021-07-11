const product = require('../models/productModel');

module.exports = {
  isValidName: (name) => {
    // name deve ser uma string com mais de 5 caracteres e deve ser único;
    const five = 5;
    if (name.length < five) return false;
    return true;
  },

  isUnique: async (name) => {
    const list = await product.getAll();
    const checkName = list.find((products) => products.name === name);

    if (checkName) return false;
    return true;
  },

  isInteger: (quantity) => {
    // quantity deve ser um número inteiro maior que 0;
    const zero = 0;
    if (!Number.isInteger(quantity) || quantity <= zero) return false;
    return true;
  },

  isNumber: (quantity) => {
    if (typeof quantity === 'string') return false;

    return true;
  }
};

