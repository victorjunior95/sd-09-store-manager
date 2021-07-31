const connection = require('./connection');

const NAME_COLLECTION = 'products';

const createProduct = async(dataProduct) =>{
  const db = await connection(); // conectando ao banco de dados
  const { ops }= await db.collection(NAME_COLLECTION).insertOne(dataProduct); // eu to inserindo o novo objeto com as informações do produto na collection products
  return ops[0];
};

const getByName = async(name) =>{
  const db = await connection(); 
  const result = await db.collection(NAME_COLLECTION).findOne({ name });
  return result;
};

// const getAll = async () => {
//   return connection()
//     .then((db) => db.collection('authors').find().toArray())
//     .then((authors) =>
//       authors.map(({ _id, firstName, middleName, lastName }) =>
//         getNewAuthor({
//           id: _id,
//           firstName,
//           middleName,
//           lastName,
//         })
//       )
//     );
// };

// db.connection('products').insert


module.exports = {
  createProduct, 
  getByName
};