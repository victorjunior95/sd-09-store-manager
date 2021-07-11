const productsModel = require('../../models/products/productsModel');

const create = async (name, quantity) => {
  const produtc = await productsModel.searchProductName(name);

  if (produtc) {
    return { status: 422, code: 'invalid_data', message: 'Product already exists' };
  }

  const newProduct = await productsModel.createProducts(name, quantity);
  return { newProduct, status: 201 };
};

const findAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const findById = async (id) => {
  try {
    const result = await productsModel.findById(id);

    if (result === null) {
      return { status: 422, code: 'invalid_data', message: 'Wrong id format' };
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, updatedProduct) => {
  try {
    const result = await productsModel.updateProduct(id, updatedProduct);
    console.log(`${result.modifiedCount} document was updated `);
    if (result === null) {
      return { status: 422, code: 'invalid_data', message: 'Wrong id format' };
    }

    return { _id: id, ...updatedProduct, };
  } catch (err) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  try {
    const searchedProduct = await productsModel.findById(id);

    if (searchedProduct === null) {
      return { status: 422, code: 'invalid_data', message: 'Wrong id format' };
    }

    await productsModel.deleteById(id);

    return { _id: id, ...searchedProduct };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteById,
};
