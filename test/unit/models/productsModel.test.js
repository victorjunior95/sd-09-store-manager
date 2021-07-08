const sinon = require('sinon');
const httpStatusCode = require('../../../httpStatusCodes');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const { MongoClient } = require('mongodb');
const ProductsModel = require('../../../models/producstModel');
const connection = require('../../../models/connection');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ApiError = require('../../../errors/apiError');

const payloadProduct = {
  name: "led rgb",
  quantity: 10,
}

let connectionMock;

beforeEach(async () => {
  const URLMock = await DBServer.getUri();
  connectionMock = await MongoClient.connect(URLMock,{ useNewUrlParser: true,
    useUnifiedTopology: true });
  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
});

afterEach(async () => {
  await connectionMock.db('StoreManager').collection('products').deleteMany({});
  await DBServer.stop();
  MongoClient.connect.restore();
})

const DBServer = new MongoMemoryServer();

describe('Insert new product into database', () => {

  describe('When it is successfully inserted', () => {

    it('Returns an object', async () => {
        const response = await ProductsModel.create(payloadProduct);

        expect(response).to.be.a('object');
    });

    it('The object returned is the object inserted', async () => {
        const response = await ProductsModel.create(payloadProduct);
        expect(response).to.deep.include({name: payloadProduct.name, quantity: payloadProduct.quantity})
    });
  });

  describe('When the product name already exists in database', () => {
    it('Throws an ApiException, with code: "invalid_data", message: Product already existis and statuCode: 422', async () => {
      try{
        await ProductsModel.create(payloadProduct);
        await ProductsModel.create(payloadProduct);
      } catch(err) {
        const expectedError = new ApiError('invalid_data', 'Product already existis', httpStatusCode.unprocessableEntity);
        expect(err).to.include({code: expectedError.code, message: expectedError.message, statusCode: expectedError.statusCode});
      }
    })
  })
})
