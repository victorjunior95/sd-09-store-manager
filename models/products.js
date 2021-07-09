const connection = require('./connection');
const { ObjectId } = require('mongodb');

// Cria uma string com o nome completo do autor

const create = async (name, quantity) =>
  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
}

/*
Busca um autor específico, a partir do seu ID
@param {String} id ID do autor a ser recuperado
*/
const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('products')
    .findOne(ObjectId(id)));
};

const change = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  connection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return { _id: id, name, quantity };
};
//  https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/

const del = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) })); 
};

const findByName = async (name) => {
  const existeProduct = await connection()
    .then((db) => db.collection('products').findOne({ 'name': name }));
  return existeProduct;
};

module.exports = {
  del,
  getAll,
  findByName,
  getById,
  change,
  create,
};