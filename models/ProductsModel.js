const connection = require('./connection');
const { ObjectId } = require('mongodb');

const find = async (id) => {
  if (id === undefined) {
    const i = await connection().then((db) => db.collection('products').find().toArray());
    return i;
  }
  const obj = await connection().then((db) => db.collection('products').find({
    _id: ObjectId(id),
  }).toArray());

  return obj[0];
};

const create = async (name, quantity) => {
  const products = await connection().then((db) => db.collection('products').insertOne(
    {
      name,
      quantity,
    }));

  return products;
};

const update = async (id, name, quantity) => {
  const result = await connection().then((db) => db.collection('products').updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $set:
        {
          name,
          quantity,
        }
    }));

  if (result.modifiedCount === 1) {
    return({ id, name, quantity });
  };
  return ({ message: 'Não foi possivel editar' });
};

module.exports = {
  find,
  create,
  update,
};