const salesSchema = require('../schemas/salesSchema');

const validateSaleData = async (req, res, next) => {
  const itensSold = req.body;
  const i = 0;
  for (let index = i; index < itensSold.length; index += 1) {
    const validation = await salesSchema.validateSale(itensSold[index]);
    if (validation) {
      return res.status(validation.response).json({ err: validation.err });
    }
    const quantityValidation = await salesSchema.checkProductInventory(
      itensSold[index], req.method);
    if (quantityValidation) {
      return res.status(
        quantityValidation.response).json({ err: quantityValidation.err });
    }
  }
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

const validateSaleExists = async (req, res, next) => {
  const  { id } = req.params;
  const { method } = req;
  const validation = await salesSchema.saleExists(id, method);
  if (validation) {
    return res.status(validation.response).json({ err: validation.err });
  }
  next();
};

module.exports = { validateSaleData, validateSaleId, validateSaleExists };
