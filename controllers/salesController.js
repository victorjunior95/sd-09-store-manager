const httpCodes = require('../auxiliarFunctions/httpCodes');
const salesServices = require('../services/salesServices');

// 5 - Crie um endpoint para cadastrar vendas
const postNewSale = async (req, res, next) => {
  const mySaleArray = req.body;
  const result = await salesServices.postNewSale(mySaleArray);

  if (result.err) return next(result.err);

  res.status(httpCodes.ok).json({
    _id: result,
    itensSold: mySaleArray,
  });
};

// 6 - Crie um endpoint para listar as vendas
const getSales = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    const result = await salesServices.getAllSales();

    return res.status(httpCodes.ok).json(result);
  };

  const result = await salesServices.getSaleById(id);

  if (result.err) return next(result.err);

  res.status(httpCodes.ok).json(result);
};

// 7 - Crie um endpoint para atualizar uma venda
const updateSale = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const result = await salesServices.updateSale({id, itensSold});

  if(result === 1) return res.status(httpCodes.ok).json({_id: id, itensSold});

  res.status(httpCodes.bad_request).json({
    err: {
      code: 'bad_request',
      message: 'Não foi possivel atualizar'
    }
  });
};

// 8 - Crie um endpoint para deletar uma venda
const deleteSale = async (req, res, next) => {
  const { id } = req.params;

  const result = await salesServices.deleteSale(id);

  if(result.err) return next(result.err);

  res.status(httpCodes.ok).json(result);
};

module.exports = {
  postNewSale,
  getSales,
  updateSale,
  deleteSale,
};
