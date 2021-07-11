const sinon = require('sinon');
const { expect } = require('chai');
const { describe } = require('mocha');
const { productsController } = require('../../../controllers');
const { productsService } = require('../../../services');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'products';
let connectionMock;

module.exports = () => {
  describe('List all products (controller)', () => {
    const productsList = [
      { name: 'candy', quantity: 8000 },
      { name: 'eraser', quantity: 500 },
    ];
    const sandbox = sinon.createSandbox();
    const request = {};
    const response = {};
    let next;

    before(async () => {
      connectionMock = await connect();

      connectionMock.db(DB_NAME).collection(COLLECTION_NAME).insertMany(productsList);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      next = sandbox.stub().callsFake(() => {});

      sandbox.stub(MongoClient, 'connect')
        .resolves(connectionMock);
      sandbox.stub(productsService, 'getAll')
        .resolves({ products: productsList});
    });

    after(() => {
      connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});

      sandbox.restore();
    });

    it('should not call the function next', async () => {
      await productsController.getAll(request, response, next);

      expect(next.neverCalledWith()).to.be.equal(true);
    });

    it('should return a status code 200', async () => {
      await productsController.getAll(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('should return an response with the following structure', async () => {
      await productsController.getAll(request, response, next);
      const products = await connectionMock.db(DB_NAME)
        .collection(COLLECTION_NAME).find().toArray();

      expect(response.json.calledWith({ products })).to.be.equal(true);
    });
  });
};
