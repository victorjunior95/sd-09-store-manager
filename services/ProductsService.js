const {
  createProduct,
  findByName,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
} = require('../models/ProductsModel');

const objErrorToReturn = (typeError) => {
  return {
    err: {
      code: 'invalid_data',
      message: typeError,
    },
  };
};

const getAllService = () => getAll();

const findByIdService = async (id) => {
  const product = await findById(id);

  if (!product) return objErrorToReturn('Wrong id format');

  return product;
};
const createService = async (name, quantity) => {
  const numberToComperName = 5;

  if (name.length < numberToComperName) {
    return objErrorToReturn('"name" length must be at least 5 characters long');
  }
  if (quantity < 1) {
    return objErrorToReturn('"quantity" must be larger than or equal to 1');
  }
  if (typeof quantity === 'string') {
    return objErrorToReturn('"quantity" must be a number');
  }
  if (await findByName(name)) {
    return objErrorToReturn('Product already exists');
  }

  const newProduct = await createProduct(name, quantity);
  return newProduct;
};

const updateProductData = async (name, quantity, id) => {
  const numberToComper = 5;

  if (name.length < numberToComper) {
    return objErrorToReturn('"name" length must be at least 5 characters long');
  }

  if (quantity < 1) {
    return objErrorToReturn('"quantity" must be larger than or equal to 1');
  }

  if (typeof quantity === 'string') {
    return objErrorToReturn('"quantity" must be a number');
  }

  return await updateProduct(name, quantity, id);
};

const deleteProductService = async (id) => {
  const productDeleted = await deleteProduct(id);

  if(!productDeleted) return objErrorToReturn('Wrong id format');

  return productDeleted;
};

module.exports = {
  createService,
  getAllService,
  findByIdService,
  updateProductData,
  deleteProductService,
};
