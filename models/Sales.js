const { ObjectId } = require('mongodb');
const connection = require('./connection');

function addNewSale(data) {
  return connection().then((db) =>
    db.collection('sales').insertOne(data))
	  .then(({ ops } ) => ops);
}

const getAll = async() => {
  return connection().then((db) => db.collection('sales')
    .find().toArray())
    .then((sales) => sales);
};

const getOne = async(id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('sales')
    .findOne({ _id: ObjectId(id) }))
    .then((sales) => sales);
};

const updateSale = async(id, data) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('sales')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold: [{ ...data[0] } ]} },
      { returnOriginal: false }
    ));
};

module.exports = {
  addNewSale,
  getAll,
  getOne,
  updateSale,
};