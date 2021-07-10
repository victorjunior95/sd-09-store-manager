const connection = require('./connection');

async function create(data) {
  return connection()
    .then((db) => db.collection('products').insertOne(data))
    .then(({ insertedId }) => ({ _id: insertedId, ...data }))
    .catch((err) => err);
}

async function getAll() {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products)
    .catch((err) => err);
}

async function getById(id) {
  return connection()
    .then((db) => db.collection('products').findOne({ _id: id }))
    .then((product) => product)
    .catch((err) => err);
}

async function getByName(name) {
  return connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((product) => product)
    .catch((err) => err);
}

async function updateById(id, data) {
  return connection()
    .then((db) => db.collection('products').update({ _id: id }, data))
    .then(({ result }) => (!result.nModified) ? null : ({ _id: id, ...data }))
    .catch((err) => err);
}

async function deleteById(id) {
  const productData = await getById(id);
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: id }))
    .then(() => productData)
    .catch((err) => err);
} 

module.exports = { create, getAll, getById, getByName, updateById, deleteById };
