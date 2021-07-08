const salesModel = require('../models/salesModel');

const postNewSale = async (array) => {
  const result = await salesModel.postNewSale(array);

  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Não existe produto com o Id fornecido'
    },
  };

  return result;
};

module.exports = {
  postNewSale,
};
