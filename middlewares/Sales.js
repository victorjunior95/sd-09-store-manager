const salesSchema = require('../schemas/Sales');

const saleValidator = async (req, res, next) => {
  const sale = req.body;
  const isValid = await salesSchema.saleValidator(sale);
  if(isValid.message) return res.status(isValid.code).json(isValid.message);
  next();
};

module.exports = { saleValidator };