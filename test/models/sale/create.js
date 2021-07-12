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
  describe('Create a new sale (model)', () => {
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

    describe('successful insertion of a sale of a single product', () => {
      const items = [
        { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
      ];
      const sale = new Sale(items);

      it('should return an object', async () => {
        const response = await sale.create();
        console.log(response);

        expect(response).to.be.an('object');
      });

      it('should return an object with the keys _id and itensSold', async () => {
        const response = await sale.create();

        expect(response).to.include.all.keys('_id', 'itensSold');
      });

      it('the key items sold should be an array', async () => {
        const response = await sale.create();

        expect(response.itensSold).to.be.an('array');
      });

      it('the length of itensSold should be 1', async () => {
        const response = await sale.create();

        expect(response.itensSold).to.have.lengthOf(1);
      });
    });

    describe('successful insertion of a sale with many products', () => {
      const items = [
        { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
        { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
      ];
      const sale = new Sale(items);

      it('should return an object', async () => {
        const response = await sale.create();

        expect(response).to.be.an('object');
      });

      it('should return an object with the keys _id and itensSold', async () => {
        const response = await sale.create();

        expect(response).to.include.all.keys('_id', 'itensSold');
      });

      it('the key items sold should be an array', async () => {
        const response = await sale.create();

        expect(response.itensSold).to.be.an('array');
      });

      it('the length of itensSold should be 2', async () => {
        const response = await sale.create();

        expect(response.itensSold).to.have.lengthOf(2);
      });
    });

    describe('failure of an insertion', () => {
      describe('when some item has an invalid id', () => {
        const items = [
          { productId: 'abcdef', quantity: 5 },
        ];
        const sale = new Sale(items);

        it('should return null', async () => {
          const response = await sale.create(items);

          expect(response).to.be.equal(null);
        });
      });
    });
  });
};
