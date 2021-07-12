const SalesModels = require('../models/Sales');
const Validate = require('./Validation');

const create = async (SoldList) => {
  const validSoldList = Validate.saleValid(SoldList);
  if(validSoldList.err) return validSoldList; 
  return await SalesModels.create(SoldList);
};

const getAll = async () => await SalesModels.getAll()
  .then((sales) => ({ sales }));

const findById = async (id) => {
  const sale = await SalesModels.findById(id);
  if (!sale) return ({
    err: {
      code:'not_found',
      message:'Sale not found',
    }
  });

  return sale;
};

const editSale = async (id, productId, quantity) => {
  const verifyUpdate = Validate.validUpdate(quantity);

  if(verifyUpdate.err) return verifyUpdate;
  
  const sale = await SalesModels.editSale(id, productId, quantity);
  const editedSale = {
    _id: sale._id,
    itensSold: [{productId: sale.productId, quantity: sale.quantity}]
  };

  return editedSale;
};

const removeSale = async (id) => {

  const verify = await SalesModels.removeSale(id);
  if(verify) return verify;
  return Validate.err;

};

module.exports = {
  create,
  getAll,
  findById,
  editSale,
  removeSale,
};