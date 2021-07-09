const productsServices = require('../services/products');

const STATUS_200 = 200; // Respostas de sucesso (200-299)
const STATUS_201 = 201;
const STATUS_422 = 422; // Erros do cliente (400-499)

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsServices.create(name, quantity);
  if (newProduct !== null) {
    return res.status(STATUS_201).json(newProduct);
  } else {
    return res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
};

const getAll = async (req, res) => {
  const products = await productsServices.getAll();
  let obj = { products } ;
  res.status(STATUS_200).json(obj);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getById(id);
  if (product !== null) {
    return res.status(STATUS_200).send(product);
  } else {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

const del = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.del(id);
  if (product !== null) {
    return res.status(STATUS_200).send(product);
  } else {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

const change = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await productsServices.change(id, name, quantity);
    res.status(STATUS_200).send(product);
  } catch (err) {
    console.error(err);
  }
};



module.exports = {
  del,
  getById,
  change,
  getAll,
  create
};