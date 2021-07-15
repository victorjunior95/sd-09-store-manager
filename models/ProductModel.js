const connection = require('./connection');

async function create({ name, quantity }) {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));
}

async function getAll() {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products);
}

async function getById(id) {
  return connection()
    .then((db) => db.collection('products').findOne({ _id: id }))
    .then((product) => product);
}

async function getByName(name) {
  return connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((product) => product);
}

async function updateById(id, { name, quantity }) {
  return connection()
    .then((db) => db.collection('products').updateOne({_id: id }, {
      $set: { name, quantity }
    }))
    .then(({ result }) => (!result.nModified) ? null : ({ _id: id, name, quantity }));
}

async function deleteById(id) {
  const productData = await getById(id);
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: id }))
    .then(() => productData);
}

async function updateQuantity(id, quantity) {
  return connection()
    .then((db) => db.collection('products'). updateOne({_id: id}, {
      $set: { quantity }
    }));
}

module.exports = {
  create,
  getAll,
  getById,
  getByName,
  updateById,
  deleteById,
  updateQuantity,
};
