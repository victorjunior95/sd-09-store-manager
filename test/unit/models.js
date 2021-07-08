const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

const product1 = { name: 'Mjolnir', quantity: 15 };
const arrayOfProducts = [
  {
    "_id": "60e7004bdf412826618020a8",
    "name": "Mjolnir",
    "quantity": 10
  },
  {
    "_id": "60e70050df412826618020a9",
    "name": "Escudo de Vibranium",
    "quantity": 15
  },
  {
    "_id": "60e70062df412826618020ab",
    "name": "Manopla do Infinito",
    "quantity": 20
  },
];
const arrayOfSales = [
  {
    "productId": "60e7004bdf412826618020a8",
    "quantity": 5
  },
  {
    "productId": "60e70050df412826618020a9",
    "quantity": 5
  },
];
const completeSale = {
  "_id": "60e70068df412826618020ac",
  "itensSold": [
    {
      "productId": "60e7004bdf412826618020a8",
      "quantity": 5
    },
    {
      "productId": "60e70050df412826618020a9",
      "quantity": 5
    },
  ]
};

describe('Testa o model de produtos', () => {

  let DBServer
  let connectionMock;
  
  before(async () => {
    
    DBServer = await MongoMemoryServer.create();
    const URLMock = DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    // await connectionMock.db('StoreManager').collection('products').insertOne();
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Testa a funcao registerProduct', () => {
    
    it('Adiciona um produto e retorna um objeto', async () => {
      const result = await productsModel.registerProduct(product1);
      const productOnDB = await connectionMock.db('StoreManager').collection('products').findOne({ name: product1.name });

      expect(result).to.be.a('object');
      expect(result).to.have.property('_id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
      expect(productOnDB).to.be.a('object');
      expect(productOnDB).to.have.property('_id');
      expect(productOnDB).to.have.property('name');
      expect(productOnDB).to.have.property('quantity');
      expect(result.name).to.be.equal(productOnDB.name);
    });

  })

  describe('Testa a funcao de getAllProducts e getById', () => {

    before(async () => {
      await connectionMock
        .db('StoreManager').collection('products').insertMany(arrayOfProducts);
    });

    after(async () => {
      await connectionMock
        .db('StoreManager').collection('products').deleteMany({});
    });

    it('Testa se getAllProducts retorna todos os produtos', async () => {
      const result = await productsModel.getAllProducts();

      expect(result).to.be.a('array');
      expect(result).to.have.length(3);
      expect(result[0]).to.have.property('_id');
      expect(result[0]).to.have.property('name');
      expect(result[0]).to.have.property('quantity');
    });

    it('Testa se getById retorna o produto correto', async () => {
      const result = await productsModel.getById('60e7004bdf412826618020a8');

      expect(result).to.be.a('object');
      expect(result).to.have.property('_id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
      expect(result._id.toString()).to.be.equal('60e7004bdf412826618020a8');
      expect(result.name).to.be.equal('Mjolnir');
      expect(result.quantity).to.be.equal(10);
    });

  });

  describe('Testa as funcoes updateProductById e deleteProductById', () => {

    before(async () => {
      await connectionMock
        .db('StoreManager').collection('products').insertMany(arrayOfProducts);
    });

    after(async () => {
      await connectionMock
        .db('StoreManager').collection('products').deleteMany({});
    });

    it('Testa se updateProductById faz o update e retorna um produto', async () => {
      const result = await productsModel.updateProductById('60e7004bdf412826618020a8', product1);

      expect(result).to.be.a('object');
      expect(result).to.have.property('_id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
      expect(result.quantity).to.be.equal(product1.quantity);
      expect(result.quantity).not.to.be.equal(undefined);
      expect(arrayOfProducts[0].quantity).not.to.be.equal(result.quantity);
    });

    it('Testa se deleteProductById deleta um produto do banco', async () => {
      const returnedProduct = arrayOfProducts[0];
      const result = await productsModel.deleteProductById('60e7004bdf412826618020a8').then(() => returnedProduct);
      const findProductDeleted = await productsModel.getById('60e7004bdf412826618020a8');

      expect(result).to.be.a('object');
      expect(result).to.have.property('_id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
      expect(findProductDeleted).to.be.equal(null);
    });

  });

});

describe('Testa o model de sales', () => {

  let DBServer
  let connectionMock;
  
  before(async () => {
    DBServer = await MongoMemoryServer.create();
    const URLMock = DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);

    await connectionMock.db('StoreManager').collection('products').insertMany(arrayOfProducts);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Testa se a funcao registerSales registra uma venda', () => {

    it('A funcao registra uma venda e retorna um objeto de venda', async () => {
      const result = await salesModel.registerSales(arrayOfSales);
      const productOnDB = await productsModel.getById('60e7004bdf412826618020a8');

      expect(result).to.be.a('object');
      expect(result).to.have.property('_id');
      expect(result).to.have.property('itensSold');
      expect(result.itensSold).to.be.a('array');
      expect(result.itensSold).to.be.length(2);
      expect(productOnDB.quantity).to.be.equal(arrayOfProducts[0].quantity - arrayOfSales[0].quantity)
    });
    
  });

  describe('Testa as funcoes getAllSales e getSalesById', () => {

    before(async () => {
      await connectionMock
        .db('StoreManager').collection('sales').insertOne(completeSale);
    });

    after(async () => {
      await connectionMock
        .db('StoreManager').collection('sales').deleteMany({});
    });

    it('Testa se a func getAllSales busca todas sales do db', async () => {
      const result = await salesModel.getAllSales();

      expect(result).to.be.a('array');
      expect(result).to.have.length(1);
      expect(result[0]).to.be.a('object');
      expect(result[0]).to.have.property('_id');
      expect(result[0]).to.have.property('itensSold');
      expect(result[0].itensSold).to.be.a('array');
      expect(result[0].itensSold).to.be.length(2);
    });

    it('Testa se a func getSalesById busca uma sale no db', async () => {
      const result = await salesModel.getSalesById('60e70068df412826618020ac');

      expect(result).to.be.a('object');
      expect(result).to.have.property('_id');
      expect(result).to.have.property('itensSold');
      expect(result.itensSold).to.be.a('array');
      expect(result.itensSold).to.be.length(2);
      expect(resutl._id.toString()).to.be.equal('60e70068df412826618020ac');
    });

  });

});
