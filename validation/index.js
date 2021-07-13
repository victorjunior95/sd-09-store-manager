const product = require('../models/productModel');

module.exports = {
  isValidName: (name) => {
    // name deve ser uma string com mais de 5 caracteres e deve ser único;
    const five = 5;
    if (name.length < five) return false;
    return true;
  },

  isUniqueName: async (name) => {
    const list = await product.getAll();
    const checkName = list.find((products) => products.name === name);

    if (checkName) return false;
    return true;
  },

  isInteger: (quantity) => {
    // quantity deve ser um número inteiro maior que 0;
    if (!Number.isInteger(quantity)) return false;
    return true;
  },

  isNumber: (quantity) => {
    if (typeof quantity !== 'number') return false;
    return true;
  },

  isMustBeZero: (quantity) => {
    const zero = 0;

    if (quantity <= zero) return false;
    return true;
  },



};

