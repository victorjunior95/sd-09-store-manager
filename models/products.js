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
  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id))).toArray();
};


// const isNonEmptyString = (value) => {
//     if (!value) return false;
//     return typeof value === 'string';
// };

// const isValid = (firstName, middleName, lastName) => {
//     if (middleName && typeof middleName !== 'string') return false;
//     return isNonEmptyString(firstName) && isNonEmptyString(lastName);
// };

// const create = async (firstName, middleName, lastName) =>
//     connection()
//         .then((db) => db.collection('authors').insertOne({ firstName, middleName, lastName }))
//         .then(result => getNewAuthor({ id: result.insertedId, firstName, middleName, lastName }));



const findByName = async (name) => {
  const existeProduct = await connection()
    .then((db) => db.collection('products').findOne({ 'name': name }));
  return existeProduct;
};

module.exports = {
  getAll,
  findByName,
  getById,
  // isValid,
  create,
};