const productsSchema = require('../schemas/productsSchema');

const validateProductData = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { response, err } = await productsSchema.validateProduct(name, quantity);
  if(response){
    return res.status(response).json({ err });
  }
  next();
};

const validateProductId = (req, res, next) => {
  const { id } = req.params;
  const validation = productsSchema.idIsNotValid(id);
  console.log(validation);
  if(validation) {
    return res.status(validation.response).json({ err: validation.err });
  }
  next();
};

module.exports = { validateProductData, validateProductId };
