// Req 5
const rescue = require('express-rescue');
const { status, message, code } = require('../schema/status');

const validateQuantity = rescue((req, res, next) => {
  const itensSold = req.body;
  const minQuantity = 1;
  const items = itensSold.every((item) => {
    if (item.quantity < minQuantity) {
      return res.status(status.unprocessable)
        .json({ err: { code: code.invalidData, message: message.invalidQuantity } });
    }
    if (typeof item.quantity === 'string') {
      return res.status(status.unprocessable)
        .json({ err: { code: code.invalidData, message: message.invalidQuantity } });
    }
  });  
  next();
});

module.exports = {
  validateQuantity,
};
