const sinon = require('sinon');
const { expect } = require('chai');
const { describe, afterEach } = require('mocha');
const { Sale } = require('../../../models');
const { MongoClient } = require('mongodb');
const connect = require('../../mocks/connection');

const DB_NAME = 'StoreManager';
const COLLECTION_NAME = 'sales';
let connectionMock;

module.exports = () => {
  describe('Update a sale (model)', () => {
    const items = [
      { productId: '60ebeffd4806670c7c6414b9', quantity: 2 },
      { productId: '60ebf0104806670c7c6414ba', quantity: 5 },
    ];
    const sale = new Sale(items);

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
        const { _id: id } = await sale.create();
        items[0].quantity = 3;

        const updSale = new Sale(items, id);
        const response = await updSale.update();

        expect(response).to.be.an('object');
      });

      it('the object should have the keys _id and itensSold', async () => {
        const { _id: id } = await sale.create();
        items[0].quantity = 3;

        const updSale = new Sale(items, id);
        const response = await updSale.update();

        expect(response).to.include.all.keys('_id', 'itensSold');
      });

      it('the value of itensSold should be an array', async () => {
        const { _id: id } = await sale.create();
        items[0].quantity = 3;

        const updSale = new Sale(items, id);
        const item = await updSale.update();

        expect(item.itensSold).to.be.an('array');
      });

      it('the value of itensSold should be an array of objects', async () => {
        const { _id: id } = await sale.create();
        items[0].quantity = 3;

        const updSale = new Sale(items, id);
        const item = await updSale.update();
        const [sold] = item.itensSold;

        expect(sold).to.be.an('object');
      });

      it('the value of itensSold should be an array of objects with the following properties', async () => {
        const { _id: id } = await sale.create();
        items[0].quantity = 3;

        const updSale = new Sale(items, id);
        const item = await updSale.update();
        const [sold] = item.itensSold;

        expect(sold).to.include.all.keys('productId', 'quantity');
      });

      it('only the value of the diferent quantity is changed', async () => {
        const prevResponse = await sale.create();
        const{ _id: id, itensSold: prevItensSold } = prevResponse;
        items[0].quantity = 3;

        const updSale = new Sale(items, id);
        const nextResponse = await updSale.update();
        const { itensSold: nextItensSold } = nextResponse;

        expect(prevItensSold).not.to.be.equal(nextItensSold);
      });
    });

    describe('when a valid unregistered id is provided', () => {
      it('should return an object', async () => {
        const id = '60ec7d21c9eee5668cfd6aa9';
        const updSale = new Sale(items, id);
        const response = await updSale.update();

        expect(response).to.be.an('object');
      });

      it('the object should be empty', async () => {
        const id = '60ec7d21c9eee5668cfd6aa9';
        const updSale = new Sale(items, id);
        const response = await updSale.update();

        expect(response).to.be.empty;
      });
    });

    describe('when an invalid id is provided', () => {
      it('should return null', async () => {
        const id = 'abcdef';
        const updSale = new Sale(items, id);
        const response = await updSale.update();

        expect(response).to.be.equal(null);
      });
    });
  });
};
