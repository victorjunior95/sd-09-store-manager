// const product = require('../validations/product');

// const validadeNameAndQuantity = async (name, quantity) => {
//   if (!product.nameIsValid(name)) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: '"name" length must be at least 5 characters long',
//       },
//       status: 422,
//     };
//   }

//   if (await product.nameExists(name)) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: 'Product already exists',
//       },
//       status: 422,
//     };
//   }

//   if (!product.quantityTypeIsValid(quantity)) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: '"quantity" must be a number',
//       },
//       status: 422,
//     };
//   }

//   if (!product.quantityValueIsValid(quantity)) {
//     return {
//       err: {
//         code: 'invalid_data',
//         message: '"quantity" must be larger than or equal to 1',
//       },
//       status: 422,
//     };
//   }
// };

// module.exports = validadeNameAndQuantity;
