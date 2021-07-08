const connection = require('./connection');

const collectionProduct = 'products';

const create = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection(collectionProduct).insertOne({ name, quantity }),
  );
  return newProduct.ops[0];
};

const findName = async (name) => {
  const findNameProduct = await connection().then((db) =>
    db.collection(collectionProduct).findOne({name}),
  );
  if(!findNameProduct) return false;
  return true;

};

module.exports = {
  create,
  findName,
};
