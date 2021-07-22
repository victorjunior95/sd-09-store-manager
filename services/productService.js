const {
  createProduct,
  updateProductInfo,
  deleteProductModel
} = require('../models/products');
const joi = require('joi');
const minChar = 5;
const {
  getProductByName,
  listAllProducts,
  getProductById
} = require('../models/products');
const { ObjectId } = require('mongodb');

const createValidation = joi.object({
  name: joi.string().min(minChar).required(),
  quantity: joi.number().min(1).required()
    .messages({ 'number.min': '"quantity" must be larger than or equal to 1'}),
});

const duplicatedProduct = async (productData) => {
  const product = await getProductByName(productData);
  if (product) {
    return {
      message: 'Product already exists'
    };
  };
};

const productCreate = async (productData) => {
  const { error } = createValidation.validate(productData);
  if (error) {
    return {
      status: 422,
      code: 'invalid_data',
      message: error.message,
    };
  }
  const existingProduct = await duplicatedProduct(productData);
  if (existingProduct) return {
    status: 422,
    code: 'invalid_data',
    message: existingProduct.message,
  };

  const data = await createProduct(productData).then(result => result);
  return data;
};



const listProducts = async () => {
  const list = await listAllProducts();
  return list;
};

const productDetails = async (id) => {
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  const details = await getProductById(id);
  return details;
};

const updateProduct = async (updateInfo) => {
  const { id, productData } = updateInfo;
  if (!ObjectId.isValid(id)) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  const { error } = createValidation.validate(productData);
  if (error) {
    return {
      status: 422,
      code: 'invalid_data',
      message: error.message,
    };
  }
  
  const update = await updateProductInfo(updateInfo);
  return update;

};

const deleteProduct = async (id) => {
  if (ObjectId.isValid(id) === false) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  const remove = await deleteProductModel(id);
  return remove;
};

module.exports = {
  productCreate,
  listProducts,
  productDetails,
  updateProduct,
  deleteProduct,
};
