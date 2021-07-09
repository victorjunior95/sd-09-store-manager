const sinon = require('sinon');
const { expect } = require('chai');

const httpStatusCode = require('../../../httpStatusCodes');
const ApiError = require('../../../errors/apiError');
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

      sinon.stub(ProductsModel, 'create').resolves(mockResponse);
      sinon.stub(ProductsModel, 'findOneByName').resolves(mockResponse);

    });

    afterEach(() => {
      ProductsModel.create.restore();
      ProductsModel.findOneByName.restore();
    });

    it('Throws an ApiException, with code: "invalid_data", message: "Product already exists" and statuCode: "422"', async () => {
      try{
        await ProductsService.create(payloadProduct);
      } catch(err) {
          const expectedError = new ApiError('invalid_data', 'Product already exists', httpStatusCode.unprocessableEntity);
          expect(err).to.include({code: expectedError.code, message: expectedError.message, statusCode: expectedError.statusCode});
      }
    })
  })
})

