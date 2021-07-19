const ProductModel = require('../model/Products');

const add = async (name, quantity) => {
  const existProduct = await exists(name);
  // console.log(existProduct);
  if(! existProduct ) {
    const product = await ProductModel.add(name, quantity);

    return product;
  }

  return [];
};

const exists = async (name) => {
  const product = await ProductModel.getByName(name);
  const empty = 0;

  if(product.length === empty) {
    return false;
  }

  return true;
};

const listAll = async () => {
  const products = await ProductModel.getAll();

  return { products: products};
};

const list = async (id) => {
  if(id){
    const product = await ProductModel.getById(id);    

    return product;
  }
  const allProducts = await listAll();

  return allProducts;
};

const remove = async (id) => {
  const product = await ProductModel.getById(id);
  
  if(product){    
    await ProductModel.remove(id);

    return product;    
  }

  return null;
};

module.exports = {
  add,
  exists,
  list,
  remove
};
