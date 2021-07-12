const productsSchema = require('../schemas/productsSchema');

const validateProductData = async (req, res, next) => {
  const { name, quantity } = req.body;
  const id = req.params.id || null;
  const { response, err } = await productsSchema.validateProduct(id, name, quantity);
  if(response){
    return res.status(response).json({ err });
  }
  next();
};

const validateProductId = (req, res, next) => {
  const { id } = req.params;
  const validation = productsSchema.idIsNotValid(id);
  if(validation) {
    return res.status(validation.response).json({ err: validation.err });
  }
  next();
};

module.exports = { validateProductData, validateProductId };
