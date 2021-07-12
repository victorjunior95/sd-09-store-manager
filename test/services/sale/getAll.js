const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { describe } = require('mocha');
const { salesService } = require('../../../services');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');

chai.use(chaiAsPromised);
const expect = chai.expect;

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'sales';
let connectionMock;

module.exports = () => {
  describe('List all registered sales (service)', () => {
    const soldItems = [
      { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
      { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
    ];

    before(async () => {
      connectionMock = await connect();

      await salesService.create(soldItems);

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});

      MongoClient.connect.restore();
    });

    it('should return an object', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('object');
    });

    it('should return an object with the key sales', async () => {
      const response = await salesService.getAll();

      expect(response).to.include.all.keys('sales');
    });

    it('each object should have the keys _id and itensSold', async () => {
      const response = await salesService.getAll();
      const [item] = response.sales;

      expect(item).to.include.all.keys('_id', 'itensSold');
    });

    it('the value of itensSold should be an array', async () => {
      const response = await salesService.getAll();
      const [item] = response.sales;

      expect(item.itensSold).to.be.an('array');
    });

    it('the value of itensSold should be an array of objects', async () => {
      const response = await salesService.getAll();
      const [item] = response.sales;
      const [sold] = item.itensSold;

      expect(sold).to.be.an('object');
    });

    it('the value of itensSold should be an array of objects with the following properties', async () => {
      const response = await salesService.getAll();
      const [item] = response.sales;
      const [sold] = item.itensSold;

      expect(sold).to.include.all.keys('productId', 'quantity');
    });
  });
};