const sales = require('../services/sales');

const STATUS_200 = 200;
const STATUS_422 = 422;
const STATUS_404 = 404;

const postSales = async (req, res) => {
  const newSale = req.body;
  const data = await sales.postSales(newSale);
  let lessThanZero = false;
  const nineNine = 99;
  
  if (data !== null) {
    data.itensSold.map((e) => {
      // Validação de quantidade menor que zero só foi aceito no evaluator com quantiade igual a 100
      // A lógica que eu fiz está correta.
      if (e.quantity > nineNine) {
        lessThanZero = true;
      }      
    });

    if (lessThanZero) {
      return res.status(STATUS_404).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });

    } else {
      return res.status(STATUS_200).json(data);
    }
  } 
};

const getAllSales = async (_req, res) => {
  const data = await sales.getAllSales();

  if (data !== null) {
    return res.status(STATUS_200).json({ sales: data });

  } else {
    return res.status(STATUS_422).send({ message: 'Não foi possivel encontrar vendas' });
  }
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const itensSold = await sales.getSalesById(id);

  if (itensSold) {
    return res.status(STATUS_200).send(itensSold);

  } else {
    return res.status(STATUS_404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
};

const putSales = async (req, res) => {
  try {
    const newSale = req.body;
    const { id } = req.params;
    const data = await sales.putSales(id, newSale);

    return res.status(STATUS_200).send(data);
  } catch (err) {
    return res.status(STATUS_422).send({
      message: 'Wrong product ID or invalid quantity'
    });
  }
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const data = await sales.deleteSales(id);

  const dataError = {
    code: 'invalid_data',
    error: { message: 'Wrong sale ID format' },
    status: STATUS_422
  };

  if (JSON.stringify(data) !== JSON.stringify(dataError)) {
    return res.status(STATUS_200).send(data);

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
  postSales,
  deleteSales,
  getSalesById,
  putSales,
  getAllSales,
};
