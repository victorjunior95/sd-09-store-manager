const {
  createProduct,
  getProduct,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProductFromDb
} = require('../models/productsModel');

const NAME_LENGTH = 5;

const productNameValidate = async (name) => {
  const product = await getProduct(name);
  if (product !== null) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  };
  if (name.length < NAME_LENGTH) return {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  };
  return name;
};

const quantityValidate = (quantity) => {
  if (typeof quantity !== 'number') return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  };
  if (quantity < 1) return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  };
  return quantity;
};

const newProduct = async (name, quantity) => {
  const productName = await productNameValidate(name);
  const productQuantity = quantityValidate(quantity);
  if (productName.err) {
    return productName;
  }
  if (productQuantity.err) {
    return productQuantity;
  }
  const product = await createProduct(productName, productQuantity);
  return product;
};

const productsList = async () => {
  const products = await getAllProducts();
  return products;
};

const productById = async (id) => {
  const product = await findProductById(id);
  if (!product) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  return product;
};

const patchProduct = async (id, name, quantity) => {
  const productId = await findProductById(id);
  if (!productId) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  const productQuantity = quantityValidate(quantity);
  const productName = await productNameValidate(name);
  if (productQuantity.err) {
    return productQuantity;
  }
  if (productName.err) {
    return productName;
  }
  const product = await updateProduct(id, productName, productQuantity);
  return product;
};

const removeProduct = async (id) => {
  const productId = await findProductById(id);
  if (!productId) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    }
  };
  deleteProductFromDb(id);
  return productId;
};

module.exports = {
  newProduct,
  productsList,
  productById,
  patchProduct,
  removeProduct
};
