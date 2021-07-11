const { ObjectId } = require('mongodb');

const connection = require('./connection');

const collectionProduct = 'products';

const create = async (name, quantity) => {
  const newProduct = await connection().then((db) =>
    db.collection(collectionProduct).insertOne({ name, quantity }),
  );
  return newProduct.ops[0];
};

const update = async (id, name, quantity) => {
  const productId = new ObjectId(id);

  const updateProduct = await connection()
    .then((db) =>
      db
        .collection(collectionProduct)
        .findOneAndUpdate(
          { _id: productId },
          { $set: { name, quantity } },
          { returnOriginal: false },
        ),
    )
    .then((result) => result.value);

  return updateProduct;
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
    return null;
  }

  const product = await connection().then((db) =>
    db.collection(collectionProduct).findOne(new ObjectId(id)),
  );

  if (!product) return null;
  return product;
};

const exclude = async (id) => {
  const productId = new ObjectId(id);

  const deleteProduct = await connection().then((db) =>
    db
      .collection(collectionProduct)
      .findOneAndDelete({ _id: productId }, { project: { name: 1, quantity: 1 } }),
  );

  return deleteProduct.value;
};

module.exports = {
  create,
  findName,
  listAll,
  findProductById,
  update,
  exclude,
};
