const productService = require('../services/productService');

const status422 = 422;
const status201 = 201;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productService.create({name, quantity});
  // console.log(response, 'final');
  if ( response['err']) {
    return res
      .status(status422)
      .json(response);
  }

  res
    .status(status201)
    .json({id: response.id, name, quantity});
};


module.exports = {
  create,
};
