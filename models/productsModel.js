const connection = require('./connection');

async function createData({ name, quantity }) {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));
}

async function getAllData() {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => products);
}

async function getDataById(id) {
  return connection()
    .then((db) => db.collection('products').findOne({ _id: id }))
    .then((product) => product);
}

async function getDataByName(name) {
  return connection()
    .then((db) => db.collection('products').findOne({ name }))
    .then((product) => product);
}

async function updateDataById(id, { name, quantity }) {
  return connection()
    .then((db) => db.collection('products').updateOne({_id: id }, {
      $set: { name, quantity }
    }))
    .then(({ result }) => (!result.nModified) ? null : ({ _id: id, name, quantity }));
}

async function deleteDataById(id) {
  const productData = await getDataById(id);
  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: id }))
    .then(() => productData);
}

async function updateDataQuantity(id, quantity) {
  return connection()
    .then((db) => db.collection('products'). updateOne({_id: id}, {
      $set: { quantity }
    }));
}

module.exports = {
  createData,
  getAllData,
  getDataById,
  getDataByName,
  updateDataById,
  deleteDataById,
  updateDataQuantity,
};