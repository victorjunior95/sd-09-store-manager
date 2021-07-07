const saleModel = require('../models/saleModel');

const STATUS_ERROR_CLIENT = 422;

// Req05 - Req07
const quantityIsValid = async(salesArray) => {
  const quantityMin = 1;
  // const check2 = await salesArray.forEach((el) => console.log(el.quantity));
  const check = await salesArray
    .find((el) => typeof el.quantity !== 'number' || el.quantity < quantityMin);
  return check;
};

// Req05 - Req07
const saleQuatityCheck = async(req, res, next) => {
  const salesArray = req.body;
  const quantityCheck = await quantityIsValid(salesArray);
  console.log(quantityCheck);
  if (quantityCheck) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  return next();
};

// Req08
const idRemoveCheck = async(req, res, next) => {
  const { id } = req.params;
  const sale = await saleModel.getByIdSale(id);
  if(!sale) {
    res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
  return next();
};

module.exports = { saleQuatityCheck, idRemoveCheck };