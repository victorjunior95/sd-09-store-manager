const connection = require('./connection');
const { ObjectId, ObjectID } = require('mongodb');

const create =  async (itensSold) => {
  const newSale =  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);

  return {
    _id: newSale._id,
    itensSold,
  };
};

const edit = (id, itensSold) => {
  if(!ObjectID.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectId(id) },
      { $set: { itensSold }}))
    .then(() => ({ 
      _id: id,
      itensSold
    }));
};


const getAll = () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getById = (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }))
    .catch(() => null);
};

const remove = async (id) => {
  if (!ObjectID.isValid(id)) {
    return null;
  }

  const sale = getById(id);

  const removed = await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }))
    .catch(() => null);
 
  if (!removed) {
    return null;
  }

  return sale;

};
 
module.exports = {
  create,
  edit, 
  getAll,
  getById,
  remove,
};
