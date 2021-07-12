const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { describe } = require('mocha');
const { salesService } = require('../../../services');
const { MongoClient } = require('mongodb');
const { InvalidArgumentError } = require('../../../errors');
const connect = require('../../mocks/connection');

chai.use(chaiAsPromised);
const expect = chai.expect;

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'sales';
let connectionMock;

module.exports = () => {
  describe('Create a new sale (service)', () => {
    before(async () => {
      connectionMock = await connect();

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);
    });

    afterEach(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_NAME).deleteMany({});
    });

    after(() => {
      MongoClient.connect.restore();
    });

    describe('when an invalid payload is provided', () => {
      describe('when a negative quantity is provided', () => {
        it('should throw an InvalidArgumentError', async () => {
          const items = [
            { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
            { productId: '60ebf0104806670c7c6414ba', quantity: -5 },
          ];

          expect(
            salesService.create(items),
          ).to.be.rejectedWith(
            InvalidArgumentError,
            'Wrong product Id or invalid quantity',
          );
        });
      });

      describe('when a quantity equal to zero is provided', () => {
        it('should throw an InvalidArgumentError', async () => {
          const items = [
            { productId: '60ebeffd4806670c7c6414b9', quantity: 0 },
            { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
          ];

          expect(
            salesService.create(items),
          ).to.be.rejectedWith(
            InvalidArgumentError,
            'Wrong product Id or invalid quantity',
          );
        });
      });

      describe('when a string is providade to quantity', () => {
        it('should throw an InvalidArgumentError', async () => {
          const items = [
            { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
            { productId: '60ebf0104806670c7c6414ba', quantity: 'string' },
          ];

          expect(
            salesService.create(items),
          ).to.be.rejectedWith(
            InvalidArgumentError,
            'Wrong product Id or invalid quantity',
          );
        });
      });

      describe('when an invalid id is provided', () => {
        it('should throw an InvalidArgumentError', async () => {
          const items = [
            { productId: 'abcdef', quantity: 2 },
            { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
          ];

          expect(
            salesService.create(items),
          ).to.be.rejectedWith(
            InvalidArgumentError,
            'Wrong product Id or invalid quantity',
          );
        });
      });
    });

    describe('when a valid payload is provided', () => {
      const items = [
        { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
        { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
      ];

      it('should return an object', async () => {
        const response = await salesService.create(items);

        expect(response).to.be.an('object');
      });

      it('should return with the keys _id and itensSold', async () => {
        const response = await salesService.create(items);

        expect(response).to.include.all.keys('_id', 'itensSold');
      })

      it('the key itens should return an array', async () => {
        const response = await salesService.create(items);

        expect(response.itensSold).to.be.an('array');
      });

      it('the key itens should return an array of objects', async () => {
        const response = await salesService.create(items);
        const [item] = response.itensSold;

        expect(item).to.be.an('object');
      });

      it('each object from itensSold should have the keys productId and quantity', async () => {
        const response = await salesService.create(items);
        const [item] = response.itensSold;

        expect(item).to.include.all.keys('productId', 'quantity');
      });
    });
  });
};
