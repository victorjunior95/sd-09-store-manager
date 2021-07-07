const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function create(itensSold){
  return await connection()
    .then((db) => db.collection('sales').insertOne( { itensSold } ))
    .then((result) => (result.ops[0]));
}

async function getAll() {
  const products =  await connection()
    .then((db) => db.collection('sales').find().toArray());
  return products;
}

async function getByName(name) {
  return await connection()
    .then((db) => db.collection('sales').findOne({ name }))
    .then((results) => results);
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return null;

  const product = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!product) return null;

  return product;
};

const update = async (id, itensSold) =>  {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const saleUpdate = await db.collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } }, 
      { returnOriginal: false}
    );

  if (!SaleUpdate) return null;

  return saleUpdate;
};

async function deleteOne(id) {
  if (!ObjectId.isValid(id)) return null;
  const saleDelete = await findById(id);
  await connection().then(db => db.collection('sales').deleteOne(
    { _id: ObjectId(id) }
  ));
  return saleDelete;
};

module.exports = {
  getAll,
  create,
  getByName,
  findById,
  update,
  deleteOne
}; 