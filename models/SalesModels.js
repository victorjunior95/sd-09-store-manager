const connection = require('./connection');
const {ObjectId} = require('mongodb');

async function create(itensSold) {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({itensSold});

  const result = await sales.ops[0];
  return {
    _id: result._id,
    itensSold: result.itensSold
  };
}

async function getAll() {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();  
  return {
    sales: sales
  };
}

async function findById(id) {
  if(!ObjectId.isValid(id)) {
    return null;
  }
  
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return {
    sales: sale
  };
}

async function updateOne(id, body) {
  if(!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  await db.collection('sales')
    .updateOne(
      {_id: ObjectId(id)}, 
      {$set: { itensSold: body}}, 
    );

  return {
    _id: id,
    itensSold: body
  };
}

async function deleteOne(id) {
  if(!ObjectId.isValid(id)) {
    return null;
  }
  
  const deleted = await findById(id);
  
  const db = await connection();
  await db.collection('sales').deleteOne({_id: ObjectId(id)});
  return deleted;
}

module.exports = {
  create,
  getAll,
  findById,
  updateOne,
  deleteOne
};