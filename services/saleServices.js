const errors = require('../utils/errors');
const saleModels = require('../models/saleModels');
const connection = require('../models/connection');
const limit = 0;
const idValidation = 24;

const postSales = async (body) => {
  try {
    if(body.some((element) => element.quantity <= limit)) 
      throw { response: errors.quantitySaleErr, status: 422 };
    if(body.some((element) => typeof element.quantity === 'string')) 
      throw { response: errors.quantitySaleErr, status: 422 };

    return { response: await saleModels.postSales(body), status: 200 };
  } catch(err) {
    return err;
  }
};

const getAllSales = async () => {
  try {
    const request = await saleModels.getAllData();

    return { response: request, status: 200 };

  } catch(err) {
    return err;
  }
};

const getSaleById = async (id) => {
  try {
    if(id.length !== idValidation) throw {response: errors.saleNotFoundErr, status: 404};
    const findSale = await saleModels.getDataById(id);
    if(!findSale) throw {response: errors.saleNotFoundErr, status: 404};

    return { response: findSale, status: 200 };
  } catch(err) {
    return err;
  }
};

const editSale = async (data, id) => {
  try {
    if(id.length !== idValidation) throw {response: errors.saleNotFoundErr, status: 404};
    
    if(data.some((element) => element.quantity <= limit))
      throw {response: errors.quantitySaleErr, status: 422};

    if(data.some((element) => typeof element.quantity === 'string')) 
      throw {response: errors.quantitySaleErr, status: 422};
    const res = await saleModels.editSaleById(data, id);
    return { response: res, status: 200 };

  } catch(err) {
    return err;
  }
};

module.exports = {
  postSales,
  getAllSales,
  getSaleById,
  editSale
};