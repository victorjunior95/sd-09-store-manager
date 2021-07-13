const salesServices = require('../services/sales');
const STATUS_200 = 200; // Respostas de sucesso (200-299)
const STATUS_201 = 201;
const STATUS_422 = 422; // Erros do cliente (400-499)

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

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const product = await productsServices.getById(id);
//   if (product !== null) {
//     return res.status(STATUS_200).send(product);
//   } else {
//     res.status(STATUS_422).json({
//       err: {
//         code: 'invalid_data',
//         message: 'Wrong id format',
//       },
//     });
//   }
// };

// const del = async (req, res) => {
//   const { id } = req.params;
//   const product = await productsServices.del(id);
//   if (product !== null) {
//     return res.status(STATUS_200).send(product);
//   } else {
//     res.status(STATUS_422).json({
//       err: {
//         code: 'invalid_data',
//         message: 'Wrong id format',
//       },
//     });
//   }
// };

// const change = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, quantity } = req.body;
//     const product = await productsServices.change(id, name, quantity);
//     res.status(STATUS_200).send(product);
//   } catch (err) {
//     console.error(err);
//   }
// };



module.exports = {
  // del,
  // getById,
  // change,
  getAll,
  create
};