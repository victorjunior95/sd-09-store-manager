const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const COLLECTION = 'products';

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

      await connectionMock.db(DB_NAME).collection(COLLECTION).insertOne(payload);
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

describe('Carrega um produto cadastrado pela "_id"', () => {
  describe('quando não encontrado', () => {
    const ID_EXAMPLE = '604cb554311d68f491ba5781';

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('o retorno é null', async () => {
      const response = await Model.products.getProductById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando encontrado', () => {
    it('o retorno é um objeto, com as informações do produto', async () => {
      const payload = { name: 'Testy, the Tester', quantity: 30 };

      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION).insertOne(payload);

      const response = await Model.products.getProductById(insertedId);

      expect(response).to.be.an('object');

      expect(response).to.have.property('name');

      expect(response).to.have.property('quantity');

      MongoClient.connect.restore();
    });
  });
});
