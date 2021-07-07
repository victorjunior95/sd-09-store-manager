const express = require('express');
const router = express.Router();
const saleModel = require('../models/saleModel');
const { saleQuatityCheck, idRemoveCheck } = require('../services/saleService');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_ERROR_CLIENT = 422;
const STATUS_ERROR_NOT_FOUND = 404;
const STATUS_ERROR_SERVER = 500;
const messageErrorServer = {message: 'Sistema Indisponível'};

// Req05
router.post('/', saleQuatityCheck, async(req, res)=> {
  try {
    const salesArray = req.body;
    // console.log(salesArray);
    const newSale = await saleModel.addNewSale(salesArray);
    // console.log(newSale);
    res.status(STATUS_OK).json(newSale);
  } catch (error) {
    console.log(erro.message);
    res.status(STATUS_ERRO).send(messageErrorServer);
  }
});

// Req06
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await saleModel.getByIdSale(id);
    if(!sale) {
      res.status(STATUS_ERROR_NOT_FOUND).json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      });
    }
    res.status(STATUS_OK).json(sale);
  } catch (error) {
    console.log(erro.message);
    res.status(STATUS_ERRO).send(messageErrorServer);
  }
});

// Req06
router.get('/', async (req, res) => {
  try {
    const sales = await saleModel.getAllSales();
    res.status(STATUS_OK).json({'sales' : sales});
  } catch (error) {
    console.log(erro.message);
    res.status(STATUS_ERRO).send(messageErrorServer);
  }
});

// Req07
router.put('/:id', saleQuatityCheck, async(req, res) =>{
  try {
    const { id } = req.params;
    const saleUpdate = req.body;
    const saleUpdated = await saleModel.updateIdSale(id, saleUpdate);
    // console.log(saleUpdated);
    res.status(STATUS_OK).json(saleUpdated);
  } catch (error) {
    console.log(erro.message);
    res.status(STATUS_ERRO).send(messageErrorServer);
  }
} );

// Req08
router.delete('/:id', idRemoveCheck, async(req, res) =>{
  try {
    const { id } = req.params;
    const saleRemoved = await saleModel.removeSale(id);
    res.status(STATUS_OK).json(saleRemoved);
  } catch (error) {
    console.log(erro.message);
    res.status(STATUS_ERRO).send(messageErrorServer);
  }
} );

module.exports = router;