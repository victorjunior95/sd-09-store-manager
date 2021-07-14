const connection = require('./connection');
const {ObjectId} = require('mongodb');

const return_length = 0;

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

  if (sales.length === return_length) return null;
 
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

  if (!sale) return null;

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
    
  const db = await connection();
  const deleted = await db.collection('sales').findOneAndDelete({_id: ObjectId(id)});

  if (!deleted) return null;
  // console.log(deleted.value);

  return deleted.value;
}

module.exports = {
  create,
  getAll,
  findById,
  updateOne,
  deleteOne
};