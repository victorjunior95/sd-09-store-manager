const productModel = require ('../models/productModel');
const productValidation = require ('../validation/productValidation');

const createProduct = async( objProduct) =>{
  const { error } = productValidation.validate(dataProducts);
  if( error) {
    return {
      message: error.details[0].message,
      error: true,
      statusCode: 422
    };
  }

  const checkExisteNameDB = await productModel.getByBane(objProduct.name);
  if(checkExisteNameDB) {
    return {
      message: 'Product already existis',
      error: true,
      statusCode: 422
    };
  }

  const result = await productModel.createProduct(objProduct);

  return result;
};