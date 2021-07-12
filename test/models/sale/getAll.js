const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const { Sale } = require('../../../models');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'sales';
let connectionMock;

module.exports = () => {
  describe('List all registered sales (model)', () => {
    const items = [
      { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
      { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
    ];
    const sale = new Sale(items);

    before(async () => {
      connectionMock = await connect();

      await sale.create();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});

      MongoClient.connect.restore();
    });

    it('should return an array', async () => {
      const response = await sale.getAll();

      expect(response).to.be.an('array');
    });

    it('should return an array of objects', async () => {
      const [item] = await sale.getAll();

      expect(item).to.be.an('object');
    });

    it('each object should have the keys _id and itensSold', async () => {
      const [item] = await sale.getAll();

      expect(item).to.include.all.keys('_id', 'itensSold');
    });

    it('the value of itensSold should be an array', async () => {
      const [item] = await sale.getAll();

      expect(item.itensSold).to.be.an('array');
    });

    it('the value of itensSold should be an array of objects', async () => {
      const [item] = await sale.getAll();
      const [sold] = item.itensSold;

      expect(sold).to.be.an('object');
    });

    it('the value of itensSold should be an array of objects with the following properties', async () => {
      const [item] = await sale.getAll();
      const [sold] = item.itensSold;

      expect(sold).to.include.all.keys('productId', 'quantity');
    });
  });
};
