const mongoConnection = require('../util/mongoConnection');
const productModel = require('../models/productsModel');

const errorObject = (code, message) => ({'err': {'code':code, 'message': message}});

//  No Magic Numbers
const MIN_NUMB_LENGTH = 5;
const MIN_PRODUCT_QUANTITY = 0;
const ZERO_DOCUMENT = 0;

const registerNewProduct = async ({name,quantity}) => {
  if(name.length <= MIN_NUMB_LENGTH){
    const code = 'invalid_data';
    const message = '"name" length must be at least 5 characters long';
    return {message: errorObject(code, message), status: 422};}
  if(quantity <= MIN_PRODUCT_QUANTITY){
    const code = 'invalid_data';
    const message = '"quantity" must be larger than or equal to 1';
    return {message: errorObject(code, message), status: 422};}
  if(typeof quantity !== 'number'){
    const code = 'invalid_data';
    const message = '"quantity" must be a number';
    return {message: errorObject(code, message), status: 422};}
  const isProductAlreadyExist = await mongoConnection()
    .then(db => db.collection('products').find({name:name}).count()) > ZERO_DOCUMENT;
  if(isProductAlreadyExist){
    const code = 'invalid_data';
    const message = 'Product already exists';
    return {message: errorObject(code, message), status: 422};
  }
  return await productModel.registerNewProduct({name,quantity});
};

const getProducts = async () => {
  return await productModel.getProducts();
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);
  if(product){return {message: product, status: 200};}
  const code = 'invalid_data';
  const message = 'Wrong id format';
  return {message: errorObject(code, message), status: 422};
};

const updateProductById = async (id, newDataProduct) => {
  //  Validations
  if(newDataProduct.name.length <= MIN_NUMB_LENGTH){
    const code = 'invalid_data';
    const message = '"name" length must be at least 5 characters long';
    return {message: errorObject(code, message), status: 422};}
  if(newDataProduct.quantity <= MIN_PRODUCT_QUANTITY){
    const code = 'invalid_data';
    const message = '"quantity" must be larger than or equal to 1';
    return {message: errorObject(code, message), status: 422};}
  if(typeof newDataProduct.quantity !== 'number'){
    const code = 'invalid_data';
    const message = '"quantity" must be a number';
    return {message: errorObject(code, message), status: 422};}

  const updatedProduct = await productModel.updateProductById(id, newDataProduct);
  return {message: updatedProduct, status: 200};
};

module.exports = { registerNewProduct, getProducts, getProductById, updateProductById };