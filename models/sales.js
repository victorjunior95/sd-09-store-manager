const connection = require('./connection');
const { ObjectId } = require('mongodb');

const create =  async (itensSold) => {
  const newSale =  await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);

  return {
    _id: newSale._id,
    itensSold,
  };
};

const edit = (id, name, quantity) => {
  if(!ObjectID.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('sales').updateOne({ _id: ObjectID(id) },
      { $set: { itensSold }}))
    .then(() => ({ id, itensSold }));
};


const getAll = () => {
  return connection()
    .then((db) => db.collection('sales').find().toArray());
};

const getById = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }))
    .catch(() => null);
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const sale = getById(id);
  
  const removed = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
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
