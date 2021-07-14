const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { describe, afterEach } = require('mocha');
const { salesService } = require('../../../services');
const { MongoClient } = require('mongodb');
const { InvalidArgumentError, NotFoundError } = require('../../../errors');
const connect = require('../../mocks/connection');

chai.use(chaiAsPromised);
const expect = chai.expect;

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'sales';
let connectionMock;

module.exports = () => {
  describe('Update a sale (service)', () => {
    const items = [
      { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
      { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
    ];

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

    describe('when a valid id is provided', () => {
      it('should return an object', async () => {
        const { _id: id } = await salesService.create(items);
        items[0].quantity = 3;
        const response = await salesService.update({ id, itensSold: items });

        expect(response).to.be.an('object');
      });

      it('the object should have the keys _id and itensSold', async () => {
        const { _id: id } = await salesService.create(items);
        items[0].quantity = 3;
        const response = await salesService.update({ id, itensSold: items });

        expect(response).to.include.all.keys('_id', 'itensSold');
      });

      it('the value of itensSold should be an array', async () => {
        const { _id: id } = await salesService.create(items);
        items[0].quantity = 3;
        const item = await salesService.update({ id, itensSold: items });

        expect(item.itensSold).to.be.an('array');
      });

      it('the value of itensSold should be an array of objects', async () => {
        const { _id: id } = await salesService.create(items);
        items[0].quantity = 3;
        const item = await salesService.update({ id, itensSold: items });
        const [sold] = item.itensSold;

        expect(sold).to.be.an('object');
      });

      it('the value of itensSold should be an array of objects with the following properties', async () => {
        const { _id: id } = await salesService.create(items);
        items[0].quantity = 3;
        const item = await salesService.update({ id, itensSold: items });
        const [sold] = item.itensSold;

        expect(sold).to.include.all.keys('productId', 'quantity');
      });

      it('only the value of the diferent quantity is changed', async () => {
        const prevResponse = await salesService.create(items);
        const{ _id: id, itensSold: prevItensSold } = prevResponse;
        items[0].quantity = 3;
        const nextResponse = await salesService.update({ id, itensSold: items });
        const { itensSold: nextItensSold } = nextResponse;

        expect(prevItensSold).not.to.be.equal(nextItensSold);
      });
    });

    describe('when a valid unregistered id is provided', () => {
      it('should throw an NotFoundError', async () => {
        const id = '60ec7d21c9eee5668cfd6aa9';

        expect(
          salesService.update({ id, itensSold: items })
        ).to.be.rejectedWith(
          NotFoundError,
          'Sale not found',
        );
      });
    });

    describe('when an invalid id is provided', () => {
      it('should return null', async () => {
        const id = 'abcdef';

        expect(
          salesService.update({ id, itensSold: items })
        ).to.be.rejectedWith(
          InvalidArgumentError,
          'Wrong product ID or invalid quantity',
        );
      });
    });
  });
};
