const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) =>
  await connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });

    return product.ops[0];
  });

const getByName = async (name) => 
  await connect().then(async (db) =>  {
    const product = await db.collection('products').find({name}).toArray();

    return product;
  });

const getById = async (id)   => {  
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));  
};

const getAll = async ()   => 
  await connect().then(async (db) => {
    const product = await db.collection('products').find().toArray();

    return product;
  });

const update = async (id, name, quantity) => 
  await connect().then(async (db) =>  {
    await db.collection('products')
      .updateOne({_id: ObjectId(id)}, { $set: {name,quantity}});

    return { _id: id, name, quantity};
  });

const remove = async (id) => await connect().then(
  async (db) => await db.collection('products').deleteOne({_id: ObjectId(id)}));  


module.exports = {
  add,
  getByName,
  getById,
  getAll,
  update,
  remove
};
