const productsModel = require('../models/productsModels');
const { ObjectId } = require('mongodb');
const productsModels = require('../models/productsModels');

module.exports = {
  validateProduct: async (name, quantity) => {
    const minCharacters = 5;

    if (name.length < minCharacters || !name.length) {
      return {
        'err': {
          'code': 'invalid_data',
          'message': '"name" length must be at least 5 characters long'
        }
      };
    }

    if (typeof quantity !== 'number') {
      return {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be a number'
        }
      };
    }

    if (Number(quantity) < 1) {
      return {
        'err': {
          'code': 'invalid_data',
          'message': '"quantity" must be larger than or equal to 1'
        }
      };
    }

    const findedProduct = await productsModel.findByName(name, quantity);

    if (findedProduct) {
      return {
        'err': {
          'code': 'invalid_data',
          'message': 'Product already exists'
        }
      };
    }

    const newProduct = await productsModel.addProduct(name, quantity);

    return newProduct;
  },

  findAllProducts: async () => {
    const finded = await productsModels.listAllProducts();

    return finded;
  },

  findOneProduct: async (id) => {
    if (ObjectId.isValid(id)) {
      const finded = await productsModel.listProductById(id);

      if (finded) return finded;
    }

    return {
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong id format'
      }
    };
  },
};
