const rescue = require('express-rescue');
// Req 1 => Sacada para importar os códigos de erro
const { status, message, code } = require('../schema/status');

// Req 1 => Middleware de validação da quantidade de caracteres
const validateName = rescue((req, res, next) => {
  const { name } = req.body;
  const minNameLength = 5;
  if (name.length < minNameLength) {
    return res.status(status.unprocessable)
      .json({ err: { code: code.invalidData, message: message.nameLength } });
  }
  next();
});
// Req 1 => Middleware de validação da quantidade do produto
const validateQuantity = rescue((req, res, next) => {
  const { quantity } = req.body;
  const minQuantity = 1;
  if (quantity < minQuantity) {
    return res.status(status.unprocessable)
      .json({ err: { code: code.invalidData, message: message.quanitityLength } });
  }
  if (typeof quantity === 'string') {
    return res.status(status.unprocessable)
      .json({ err: { code: code.invalidData, message: message.quantityType } });
  }
  next();
});

module.exports = {
  validateName,
  validateQuantity,
};