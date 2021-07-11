const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const { Product } = require('../../../models');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'products';

module.exports = () => {
  describe('Creation of a new product (model)', () => {
    // Link da reply do StackOverflow que salvou minha vida
    // Com o MongoMemoryServer https://stackoverflow.com/a/63675768
    const product = new Product();
    const payload = {
      name: 'candy', quantity: 8000,
    };
    let connectionMock;


    before(async () => {
      connectionMock = await connect();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    afterEach(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    describe('Successful insertion', () => {
      it('should call the function create', () => {
        expect(product.create).to.be.a('function');
      });

      it('should return an object', async () => {
        const response = await product.create(payload);

        expect(response).to.be.an('object');
      });

      it('the object must containd the keys _id, name and quantity', async () => {
        const response = await product.create(payload);

        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      })
    });
  });
};