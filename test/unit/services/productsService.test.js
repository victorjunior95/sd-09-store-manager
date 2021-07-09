const sinon = require('sinon');
const { expect } = require('chai');

const httpStatusCode = require('../../../httpStatusCodes');
const ProductsService = require('../../../services/productsService');
const ProductsModel = require('../../../models/producstModel');

const payloadProduct = {
  name: "led rgb",
  quantity: 10,
}

describe('Insert new product into database', () => {

  describe('When it is successfully inserted', () => {

    beforeEach(() => {
      const mockResponse = {
        _id: "604cb554311d68f491ba5781",
        name: "led rgb",
        quantity: 10,
      }

      sinon.stub(ProductsModel, 'create').resolves(mockResponse);
      sinon.stub(ProductsModel, 'findOneByName').resolves(null);

    });

    afterEach(() => {
      ProductsModel.create.restore();
      ProductsModel.findOneByName.restore();
    });

    it('Returns an object', async () => {
        const response = await ProductsService.create(payloadProduct);

        expect(response).to.be.a('object');
    });

    it('The object returned is the object inserted', async () => {
        const response = await ProductsService.create(payloadProduct);
        expect(response).to.deep.include({name: payloadProduct.name, quantity: payloadProduct.quantity})
    });
  });

  describe('When the product name already exists in database', () => {

    beforeEach(() => {
      const mockResponse = {
        _id: "604cb554311d68f491ba5781",
        name: "led rgb",
        quantity: 10,
      }

      sinon.stub(ProductsModel, 'findOneByName').resolves(mockResponse);
    });

    afterEach(() => {
      ProductsModel.findOneByName.restore();
    });

    it('Throws an ApiException, with code: "invalid_data", message: "Product already exists" and statusCode: "422"', async () => {
        const promise = await ProductsService.create(payloadProduct).catch((err) => err);

        expect(promise).to.have.property('code').which.equals('invalid_data');
        expect(promise).to.have.property('message').which.equals('Product already exists');
        expect(promise).to.have.property('statusCode').which.equals(httpStatusCode.unprocessableEntity);
    });
  })
})

