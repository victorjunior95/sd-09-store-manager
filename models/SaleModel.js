const connection = require('./connection');

async function create(data) {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: data }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: data }));
}

async function getAll() {
  return connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((sales) => sales);
}

async function getById(id) {
  return connection()
    .then((db) => db.collection('sales').findOne({ _id: id }))
    .then((sales) => sales);
}

async function updateById(id, data) {
  return connection()
    .then((db) => db.collection('sales').updateOne({_id: id }, {
      $set: { itensSold: data },
    }))
    .then(({ result }) => (!result.nModified) ? null : ({ _id: id, itensSold: data }));
}

async function deleteById(id) {
  const salesData = await getById(id);
  return connection()
    .then((db) => db.collection('sales').deleteOne({ _id: id }))
    .then(() => salesData);
}

module.exports = { create, getAll, getById, updateById, deleteById };