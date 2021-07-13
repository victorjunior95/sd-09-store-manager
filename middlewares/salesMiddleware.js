const salesSchema = require('../schemas/salesSchema');

const validateSaleData = (req, res, next) => {
  const itensSold = req.body;
  let error = {};
  itensSold.forEach(async (item) => {
    validation = await salesSchema.validateSale(item);
    if(error){
      return res.status(validation.response).json({ err: validation.err });
    }
  });
  next();
};

const validateSaleId = (req, res, next) => {
  const { id } = req.params;
  const validation = salesSchema.idIsNotValid(id);
  if(validation) {
    return res.status(validation.response).json({ err: validation.err });
  }
  next();
};

module.exports = { validateSaleData, validateSaleId };
