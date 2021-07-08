const productsModel = require('../models/products');
 

const getAll = async () => productsModel.getAll();

const create = async (name, quantity) => {
  const findByName =  await productsModel.findByName(name);
  if (findByName) return null;
  const product = await productsModel.create(name, quantity);
  return product;
};


// const findById = async (id) => {
//     // Solicitamos que o model realize a busca no banco
//     const author = await Author.findById(id);
  
//     // Caso nenhum autor seja encontrado, retornamos um objeto de erro.
//     if (!author) {
//       return {
//         error: {
//           code: 'notFound',
//           message: `Não foi possível encontrar um autor com o id ${id}`,
//         },
//       };
//     }
  
//     // Caso haja um autor com o ID informado, retornamos esse autor
//     return author;
//   };
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
  // findById,
  create,
};