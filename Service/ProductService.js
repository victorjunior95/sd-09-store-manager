const ProductModel = require('../Model/ProductModel');
const { StatusCodes } = require('http-status-codes');
const Ultils = require('../Helpers/Ultils');

const createProduct = async (name, quantity) => {
  if (!(await Ultils.validName(name))) {
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  }

  if (!(await Ultils.quantityIsNumber(quantity))) {
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  }

  if (!(await Ultils.validInsertQuantity(quantity))) {
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  }

  const nameResult = await ProductModel.findProductByName(name);

  if (!(await Ultils.nameExist(nameResult))) {
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  }

  const result = await ProductModel.createProduct(name, quantity);

  return result;
};

const getAllProducts = async () => {
  const getInput = await ProductModel.getAllProducts();
  const result = { products: [...getInput] };
  return result;
};

const getProductId = async (id) => {
  const result = await ProductModel.findById(id);
  if (!result )
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  return result;
};

const getProductByName = async () => {};

const updateProduct = async (id, name, quantity) => {
  if (!(await Ultils.validName(name))) {
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  }

  if (!(await Ultils.quantityIsNumber(quantity))) {
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },

      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  }

  if (!(await Ultils.validInsertQuantity(quantity))) {
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  }
  const returns = await ProductModel.updateById(id, name, quantity);
  console.log(returns);

  return returns;
};

const deleteProduct = async (id) => {
  const product = await ProductModel.deleteProduct(id);
  if (product === null)
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };

  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductId,
  getProductByName,
  updateProduct,
  deleteProduct,
};
