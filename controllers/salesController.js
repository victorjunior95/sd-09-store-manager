const salesServices = require('../services/sales');
const STATUS_200 = 200,
  STATUS_201 = 201,
  STATUS_422 = 422,
  STATUS_404 = 404;

const create = async (req, res) => {
  const newSale = req.body;
  const sale = await salesServices.create(newSale);
  if (sale !== null) {
    return res.status(STATUS_200).json(sale);
  } else {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
};

const getAll = async (req, res) => {
  const sales = await salesServices.getAll();
  if (sales !== null) {
    res.status(STATUS_200).json({ sales: sales });
  } else {
    console.error();
    res.status(STATUS_422)
      .send({ message: 'erro ao solicitar requisição' });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const itensSold = await salesServices.getById(id);
  if (itensSold !== null) {
    return res.status(STATUS_200).send(itensSold);
  } else {
    res.status(STATUS_404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
};

const change = async (req, res) => {
  try {
    const newSale = req.body;
    const { id } = req.params;
    const sale = await salesServices.change(id, newSale);
    res.status(STATUS_200).send(sale);
  } catch (err) {
    console.error(err);
    res.status(STATUS_422)
      .send({ message: 'Wrong product ID or invalid quantity' });
  }
};

const del = async (req, res) => {
  const ret = {
    code: 'invalid_data',
    error: { message: 'Wrong sale ID format' },
    status: STATUS_422
  };
  const { id } = req.params;
  const sale = await salesServices.del(id);
  if (sale === ret) {
    return res.status(STATUS_200).send(sale);
  } else {
    res.status(STATUS_422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
};




module.exports = {
  del,
  getById,
  change,
  getAll,
  create,

};