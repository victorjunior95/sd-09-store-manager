const sinon = require('sinon');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const httpStatusCode = require('../../../httpStatusCodes');
const ApiError = require('../../../errors/apiError');
const ProductsService = require('../../../services/producstServices');
chai.use(chaiAsPromised);

const expect = chai.expect;

describe('Insert new product into database', () => {

  describe('When it is successfully inserted', () => {

    const payloadProduct = {
      name: "led rgb",
      quantity: 10,
    }

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
    it('Throws an ApiException, with code: "invalid_data", message: Product already existis and statuCode: 422', async () => {
      try{
        await ProductsService.create(payloadProduct);
        await ProductsService.create(payloadProduct);
      } catch(err) {
          const expectedError = new ApiError('invalid_data', 'Product already existis', httpStatusCode.unprocessableEntity);
          expect(err).to.include({code: expectedError.code, message: expectedError.message, statusCode: expectedError.statusCode});
      }
    })
  })
})

