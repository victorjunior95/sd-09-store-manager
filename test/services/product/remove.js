const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { productsService } = require('../../../services');
const { InvalidArgumentError, NotFoundError } = require('../../../errors');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');
const { describe } = require('mocha');

// Setando chai para teste assíncrono
// Issue no Github: https://github.com/chaijs/chai/issues/415
// Obgd, nato <3
chai.use(chaiAsPromised);
const expect = chai.expect;

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'products';
let connectionMock;

module.exports = () => {
  describe('Remove a product (service)', () => {
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

    describe('when a valid _id is provided', () => {
      it('should return a object', async () => {
        const { _id: id } = await productsService.create({ name: 'candy', quantity: 8000 });

        const response = await productsService.remove(id);

        expect(response).to.be.an('object');
      });

      it('should return a object with the keys _id, name and quantity', async () => {
        const { _id: id } = await productsService.create({ name: 'candy', quantity: 8000 });

        const response = await productsService.remove(id);

        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      });
    });

    describe('when an invalid _id is provided', () => {
      it('should throw an InvalidArgumentError', async () => {
        const { _id: id } = await productsService.create({ name: 'candy', quantity: 8000 });

        const invalidID = id.toString().replace('0', 'o');

        expect(
          productsService.remove(invalidID)
        ).to.be.rejectedWith(
          InvalidArgumentError,
          'Wrong id format',
        );
      });
    });

    describe('when a non registered id is provided', () => {
      it('should throw an NotFoundError', async () => {
        const invalidID = '60e8a400c7520a3aa88a8789';
        await productsService.create({ name: 'candy', quantity: 8000 });

        expect(
          productsService.remove(invalidID)
        ).to.be.rejectedWith(
          NotFoundError,
          'Entity "product" not found',
        );
      });
    });
  });
};
