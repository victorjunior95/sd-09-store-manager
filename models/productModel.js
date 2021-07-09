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
const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('products').updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name: name,
          quantity: quantity
        },
      },
    ));
};
// 4 - Crie um endpoint para deletar um produto
const deleteProduct = async (id) => {
  return connection()
    .then((db) => db.collection('products').delete({ _id: new ObjectId(id)}))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

module.exports = {
  createProduct,
  listProduct,
  updateProduct,
  deleteProduct,
};
