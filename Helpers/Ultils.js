const  SalesModel  = require('../Model/SalesModel');
const nameExist = (nameResult) => {
  const ZERO = 0;
  if (nameResult.length > ZERO) return false;

  return true;
};
const quantityIsNumber = (quantity) => {
  if (typeof quantity !== 'number') return false;

  return true;
};
const validInsertQuantity = (quantity) => {
  if (!quantity || quantity < 1) return false;

  return true;
};

const validName = (name) => {
  const MIN_CHARACTERS_NAME = 5;

  if (!name || name.length < MIN_CHARACTERS_NAME) return false;

  return true;
};
const validQuantity = (quantity) => {
  const minQuantity = 0;
  if (quantity <= minQuantity || typeof quantity === 'string') {
    return false;
  }
  return true;
};

const validId = (id) => {
  const minLengthID = 24;
  if (typeof id !== 'string' || id.length < minLengthID) {
    return false;
  }
  return true;
};
const existId = async (id) => {
  const idVerify = await SalesModel.getOneSale(id);
  if (!idVerify) {
    return false;
  }
  return idVerify;
};

module.exports = {
  nameExist,
  quantityIsNumber,
  validInsertQuantity,
  validName,
  validQuantity,
  validId,
  existId,
};
