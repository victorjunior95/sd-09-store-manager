const {
  getNewProduct,
  createProduct,
  getAllProducts,
  getById,
  updateProduct,
} = require('../models/ProductsModel');

const errors = {
  invalid: 'invalid_data',
  product_exist: 'Product already exists',
  name_length: '"name" length must be at least 5 characters long',
  quantity_type: '"quantity" must be a number',
  quantity_min: '"quantity" must be larger than or equal to 1',
  wrong_id: 'Wrong id format',
};

const UNPROCESSABLE = 422;

const name_min_length = 5;
const quantity_min_value = 0;

const nameIsValid = async (name) => {
  if (name.length < name_min_length || typeof name !== 'string') return false;
  return true;
};

const nameIsUnique = async (name) => {
  const productsData = await getNewProduct();
  if (productsData.some(product => product.name === name) === true) return false;
  return true;
};

const quantityIsPositive = async (quantity) => {
  if (quantity <= quantity_min_value) return false;
  return true;
};

const quantityIsNumber = async (quantity) => {
  if (typeof quantity === 'string') return false;
  return true;
};

const validateNameQuantity = async (name, quantity) => {
  const validName = await nameIsValid(name);
  const positiveQuantity = await quantityIsPositive(quantity);
  const quantityIsNum = await quantityIsNumber(quantity);

  if (!validName) return {
    isError: true,
    err: {
      code: errors.invalid,
      message: errors.name_length,
    },
    status: UNPROCESSABLE,
  };

  if (!positiveQuantity) return {
    isError: true,
    err: {
      code: errors.invalid,
      message: errors.quantity_min,
    },
    status: UNPROCESSABLE,
  };

  if (!quantityIsNum) return {
    isError: true,
    err: {
      code: errors.invalid,
      message: errors.quantity_type,
    },
    status: UNPROCESSABLE,
  };

  return true;
};

const createService = async (name, quantity) => {
  const uniqueName = await nameIsUnique(name);
  const isValid = await validateNameQuantity(name, quantity);
  
  if (!uniqueName) return {
    isError: true,
    err: {
      code: errors.invalid,
      message: errors.product_exist,
    },
    status: UNPROCESSABLE,
  };
  
  if (isValid !== true) return isValid;

  const product = await createProduct(name, quantity);

  return product.ops[0];
};

const updateService = async (id, name, quantity) => {
  const isValid = await validateNameQuantity(name, quantity);
  if (isValid !== true) return isValid;

  const editedProduct = await updateProduct(id, name, quantity);
  return editedProduct;
};

const getAllService = async () => {
  const products = await getAllProducts();
  return products;
};

const getByIdService = async (id) => {
  const product = await getById(id);
  if (!product) return {
    isError: true,
    err: {
      code: errors.invalid,
      message: errors.wrong_id,
    },
    status: UNPROCESSABLE,
  };

  return product;
};

module.exports = {
  createService,
  getAllService,
  getByIdService,
  updateService,
};