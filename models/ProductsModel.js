const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionProduct = 'products';

const create = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection(collectionProduct).insertOne({ name, quantity }),
  );
  return newProduct.ops[0];
};

const listAll = async () => {
  const allProducts = await connection()
    .then((db) => db.collection(collectionProduct).find().toArray())
    .then((products) => products);
  return { products: allProducts };
};

const findName = async (name) => {
  const nameProduct = await connection().then((db) =>
    db.collection(collectionProduct).findOne({ name }),
  );
  if (!nameProduct) return false;
  return true;
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    console.log(!ObjectId.isValid(id));
    return null;
  }

  const product = await connection().then((db) =>
    db.collection(collectionProduct).findOne(new ObjectId(id)),
  );

  if (!product) return null;
  return product;
};

module.exports = {
  create,
  findName,
  listAll,
  findProductById,
};
