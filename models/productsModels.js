const connection = require('./connection');
const { ObjectId } = require('mongodb');

module.exports = {
  findByName: (name, _quantity) => {
    return connection().then((db) => db.collection('products').findOne({ name }));
  },

  addProduct: async (name, quantity) => {
    const newProduct = await connection().then((db) =>
      db.collection('products').insertOne({ name, quantity }));

    return newProduct.ops[0];
  },

  listAllProducts: () => {
    const allProducts =  connection().then((db) =>
      db.collection('products').find().toArray());

    return allProducts;
  },

  listProductById: (id) => {
    if (!ObjectId(id)) return null;

    return connection().then((db) =>
      db.collection('products').findOne({ _id: ObjectId(id) }));
  },

  updateProduct: async (id, name, quantity) => {
    const edited = await connection().then((db) =>
      db.collection('products')
        .update({ _id: ObjectId(id) }, { $set: { name, quantity } })
        .then(() => ({ _id: id, name, quantity }))
    );

    return edited;
  },

  deleteProduct: async (id) => {
    const deleted = await connection().then((db) =>
      db.collection('products').findOne({ _id: ObjectId(id) })
    );

    await connection().then((db) =>
      db.collection('products').deleteOne({ _id: ObjectId(id) }));

    return deleted;
  },
};
