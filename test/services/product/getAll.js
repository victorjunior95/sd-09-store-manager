const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { productsService } = require('../../../services');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');
const { describe, after } = require('mocha');

// Setando chai para teste assíncrono
// Issue no Github: https://github.com/chaijs/chai/issues/415
// Obgd, nato <3
chai.use(chaiAsPromised);
const expect = chai.expect;

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'products';
let connectionMock;

module.exports = () => {
  describe('List all products (service)', () => {
    const productsList = [
      { name: 'candy', quantity: 8000 },
      { name: 'eraser', quantity: 500 },
    ];

    before(async () => {
      connectionMock = await connect();

      sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

      connectionMock.db(DB_NAME).collection(COLLECTION_NAME).insertMany(productsList);
    });

    after(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});

      MongoClient.connect.restore();
    });

    it('should return an object', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.an('object');
    });

    it('should return an object with the key products', async () => {
      const response = await productsService.getAll();

      expect(response).to.include.all.keys('products');
    });

    it('should return an object which the keys "products" contains an array', async () => {
      const response = await productsService.getAll();

      expect(response.products).to.be.an('array');
    });

    it('should return an object which the elements the array of products are an object', async () => {
      const response = await productsService.getAll();
      const [item] = response.products;

      expect(item).to.be.an('object');
    });

    it('each object must contain the keys _id, name and quantity', async () => {
      const response = await productsService.getAll();
      const [item] = response.products;

      expect(item).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
};
