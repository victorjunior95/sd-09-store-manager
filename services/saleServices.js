const errors = require('../utils/errors');
const saleModels = require('../models/saleModels');
const productModels = require('../models/productModel');
const connection = require('../models/connection');
const { ObjectId } = require('mongodb');
const limit = 0;
const idValidation = 24;
const DB_COLLECTION = 'products';

const postSales = async (body) => {
  try {
    if(body.some((element) => element.quantity <= limit)) 
      throw { response: errors.quantitySaleErr, status: 422 };
    
    if(body.some((element) => typeof element.quantity === 'string')) 
      throw { response: errors.quantitySaleErr, status: 422 };
    
    const res = await saleModels.postSales(body);
    const sendUpdate = await res.itensSold.map((element) => 
      updateStock(element.productId, element.quantity));

    return { response: res, status: 200, sendUpdate };
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

const deleteSale = async (id) => {
  try {
    if(id.length !== idValidation) throw {response: errors.saleErr, status: 422};

    if(!await saleModels.getDataById(id)) throw { response: errors.saleErr, status: 422 };

    const req = productModels.getProduct(id);

    return { response: await saleModels.deleteData(id), status: 200};


  } catch(err) {
    return err;
  }

};

const updateStock = async (id, quantity) => {
  const searchProduct = await connection().then((db) =>
    db.collection(DB_COLLECTION).findOne({ _id: ObjectId(id) }));

  console.log(searchProduct);
  if(!searchProduct) return;
  if(searchProduct.quantity < quantity) return;

  console.log(searchProduct.quantity - quantity);
  const total = searchProduct.quantity - quantity;
  return await connection().then((db) => db.collection(DB_COLLECTION)
    .updateOne({ _id: ObjectId(id)},
      { $set: { quantity: total }}));
};

module.exports = {
  postSales,
  getAllSales,
  getSaleById,
  editSale,
  deleteSale
};