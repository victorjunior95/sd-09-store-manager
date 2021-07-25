const salesSchema = require('../schemas/Sales');

const saleValidator = async (req, res, next) => {
  const sale = req.body;
  const isValid = await salesSchema.saleValidator(sale);
  if(isValid.message) return res.status(isValid.code).json(isValid.message);
  next();
};

const idValidator = async (req, res, next) => {
  const { id } = req.params;
  const isValid = await salesSchema.idValidator(id);
  if(isValid.message) return res.status(isValid.code).json(isValid.message);
  next();
};

const deleteValidator = async (req, res, next) => {
  const { id } = req.params;
  const isValid = await salesSchema.deleteValidator(id);
  if(isValid.message) return res.status(isValid.code).json(isValid.message);
  next();
};

module.exports = { saleValidator, idValidator, deleteValidator };