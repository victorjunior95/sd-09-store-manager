const connection = require('./connection');

async function createData(data) {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: data }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold: data }));
}

async function getAllData() {
  return connection()
    .then((db) => db.collection('sales').find().toArray())
    .then((sales) => sales);
}

async function getDataById(id) {
  return connection()
    .then((db) => db.collection('sales').findOne({ _id: id }))
    .then((sales) => sales);
}

async function updateDataById(id, data) {
  return connection()
    .then((db) => db.collection('sales').updateOne({_id: id }, {
      $set: { itensSold: data },
    }))
    .then(({ result }) => (!result.nModified) ? null : ({ _id: id, itensSold: data }));
}

async function deleteDataById(id) {
  const salesData = await getDataById(id);
  return connection()
    .then((db) => db.collection('sales').deleteOne({ _id: id }))
    .then(() => salesData);
}

module.exports = { createData, getAllData, getDataById, updateDataById, deleteDataById };
