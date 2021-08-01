const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';

const Model = require('../../models');
const getConnection = require('./connectionMock');

describe('Cadastro de um novo produto', () => {
  describe('quando é adicionado com sucesso', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto', async () => {
      const response = await Model.products.addProduct(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Model.products.addProduct(payload);

      expect(response).to.have.a.property('_id');
    });
  });
});

describe('Carrega a lista de produtos', () => {
  describe('quando não tem nenhum cadastrado',() => {
    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um array', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.an('array');
    });

    it('vazio', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.empty;
    });
  });

  describe('quando tem produtos cadastrados', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db(DB_NAME).collection('products').insertOne(payload);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um array', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.an('array');
    });

    it('de objetos', async () => {
      const [ item ] = await Model.products.getProducts();

      expect(item).to.be.an('object');
    });
  });
});
