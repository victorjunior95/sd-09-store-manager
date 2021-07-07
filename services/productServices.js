const connection = require('../models/connection');
const productModel = require('../models/productModel');
const errors = require('../utils/errors');
const DB_COLLECTION = 'products';
const { ObjectId } = require('mongodb');

const postServices = async (name, quantity) => {
  const nameLength = 5;
  const quantityCount = 0;
  const dataType = 'string';

  const findProduct = await connection().then((db) => 
    db.collection(DB_COLLECTION)
      .find({ name: name }).toArray());

      
      
  try {
    
    if(name.length < nameLength) throw { response: errors.nameLengthErr, status: 422 };
    
    if(quantity === quantityCount) throw { response: errors.quantityErr, status: 422 };
    
    if(typeof quantity === dataType) throw { response: errors.dataTypeErr, status: 422 };
    
    if(findProduct.length > quantityCount) 
      throw { response: errors.productExistenceErr, status: 422 };
    
    return { response: await  productModel.insertProduct(name, quantity), status: 201 };
    
  } catch(err) {
    return err;
  }
};

const getAllProducts = async () => {
  const request = await productModel.getAllData();

  return { response: request, status: 200 };
};

const getOneProduct = async (id) => {
  try {
    const request = await productModel.getProduct(id);
    if(!request) throw {response: errors.idFormatErr, status: 422};

    return { response: await productModel.getProduct(id), status: 200 };

  } catch(err) {
    return err;
  }

};

module.exports = {
  postServices,
  getAllProducts,
  getOneProduct
};
