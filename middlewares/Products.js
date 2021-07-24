const productsSchema = require('../schemas/Products');

const productValidator = async (req, res, next) => {
  const { name, quantity } = req.body;
  console.log('oi');
  const isValid = await productsSchema.productValidator(name, quantity);
  console.log(isValid);
  if(isValid.message) return res.status(isValid.code).json(isValid.message);
  next();
};

const idValidator = async (req, res, next) => {
  const { id } = req.params;
  const isValid = await productsSchema.idValidator(id);
  if(isValid.message) return res.status(isValid.code).json(isValid.message);
  next();
};

module.exports = { productValidator, idValidator };