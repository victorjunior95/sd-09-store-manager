const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

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
