// Querys com o mongodb.
const connection = require('./connection');
const { ObjectId } = require('mongodb');

// Req 1 => query de criação de dados no BD
const create = async(name, quantity) => { // Recebe os parâmetros, toda conexão com o BD é assíncrona
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity})); //query para adicionar um produto ao mongodb
  const createProduct = { _id: insertedId, name, quantity }; // crio os 3 campos no mongo, faço uma renomeiação do id
  return createProduct;
};
// Req 1 => query para encontrar o produto pelo nome
const findByName = async (name) => { // Recebe o nome
  const productByName = await connection()
    .then((db) => db.collection('products').findOne({ name })); //query para encontrar um campo, que é o nome passado
  return productByName;
};
// Req 2 => query para trazer todos os produtos
const findAll = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray()); //query para trazer todo o BD, foi necessário a conversão porque o formato é obj
  return products;
};
// Req 2 => query para trazer um produto por id
const findById = async (id) => {
  const productById = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) })); // query para trazer apenas um dado
  return productById;
};
// Req 3 => query para fazer update no BD
const updateById = async (id, name, quantity) => {
  const updateProduct = await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return updateProduct;
};
// Req 4
const deleteById = async (id) => {
  const deleteProduct = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return deleteProduct;
};

module.exports = {
  findByName,
  create,
  findAll,
  findById,
  updateById,
  deleteById
};
