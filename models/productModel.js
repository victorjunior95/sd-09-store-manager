const connection = require('./connection');
const { ObjectId } = require('mongodb');

// 1 - Crie um endpoint para o cadastro de produtos
const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }).toArray());
};
// 2 - Crie um endpoint para listar os produtos
const listProduct = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};
// 3 - Crie um endpoint para atualizar um produto
const updateProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').updateOne(
      {
        name: `${name}`
      },
      {
        $set: { quantity: quantity },
      },
    ));
};
// 4 - Crie um endpoint para deletar um produto

module.exports = {
  createProduct,
};

/* { "name": "Produto Silva", "quantity": 10 }
{ "_id": ObjectId("5f43cbf4c45ff5104986e81d"), "name": "Produto Silva", "quantity": 10 }
*/