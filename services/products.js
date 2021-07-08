const productsModel = require('../models/products');

const getAll = async () => productsModel.getAll();

const create = async (name, quantity) => {
  const findByName =  await productsModel.findByName(name);
  if (findByName) return null;
  const product = await productsModel.create(name, quantity);
  return product;
};


const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

  // const create = async (firstName, middleName, lastName) => {
  //   // Buscamos um autor com o mesmo nome completo que desejamos criar
  //   const existingAuthor = await Author.findByName(firstName, middleName, lastName);
  
  //   // Caso esse autor já exista, retornamos um objeto de erro informando
  //   // que não é possível criar o autor pois ele já existe
  //   if (existingAuthor) {
  //     return {
  //       error: {
  //         code: 'alreadyExists',
  //         message: 'Um autor já existe com esse nome completo',
  //       },
  //     };
  //   }
  
  //   // Caso o autor não exista e, portanto, possa ser criado
  //   // chamamos o model e retornamos o resultado
  //   return Author.create(firstName, middleName, lastName);
  // };
  
module.exports = {
  getAll,
  getById,
  create,
};