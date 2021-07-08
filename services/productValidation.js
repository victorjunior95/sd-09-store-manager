const product = require('../validations/product');
const productsModel = require('../models/productsModel');

// Depois tentar implementar o Joi ou adicionar middlewares para todos esses casos
const postValidateProduct = async (name, quantity) => {
  if (!product.nameIsValid(name)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
      status: 422,
    };
  }

  if (await product.nameExists(name)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
      status: 422,
    };
  }

  if (!product.quantityTypeIsValid(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
      status: 422,
    };
  }

  if (!product.quantityValueIsValid(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
      status: 422,
    };
  }

  const postProduct = await productsModel.postIntoDb(name, quantity);

  return postProduct;
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();

  return allProducts;
};

const getProductById = async (id) => {
  if (!product.idIsValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      status: 422,
    };
  }

  return await productsModel.getProductById(id);
};

const updateProduct = async (id, name, quantity) => {
  if (!product.idIsValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      status: 422,
    };
  }

  if (!product.nameIsValid(name)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
      status: 422,
    };
  }

  if (!product.quantityTypeIsValid(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
      status: 422,
    };
  }

  if (!product.quantityValueIsValid(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
      status: 422,
    };
  }

  return await productsModel.updateProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  if (!product.idIsValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      status: 422,
    };
  }

  return await productsModel.deleteProduct(id);
};

module.exports = {
  postValidateProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
