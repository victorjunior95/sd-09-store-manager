const connection = require('./connection');

const addProduct =  async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').insertOne({name, quantity}));
  return product.ops[0];
};

const updateOneProduct = async (id, name, quantity) => {
  const product = await connection()
    .then((db) => db.collection('products').updateOne(
      { _id: id },
      { $set: { name, quantity } },
      { upsert: true }))
    .then(() => ({ id, name, quantity }));
  return product;
};

const findOneProduct = async (objSearch) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne(objSearch));
  return product;
};

const findAllProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

const excludeOneProduct = async (id) => {
  const product = findOneProduct({ _id: id });
  await connection()
    .then((db) => db.collection('products').deleteOne({ _id: id }))
    .then(() => (product));
  return product;
};

module.exports = {
  addProduct,
  updateOneProduct,
  findOneProduct,
  findAllProducts,
  excludeOneProduct,
};
