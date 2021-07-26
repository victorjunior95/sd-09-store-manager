const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const productsModel = require('../../model/Products');
const salesModel = require('../../model/Sales');

const newProduct = {
    name: 'Cadeira Gamer',
    quantity: 20,
};

const newSale = [
    {
        productId: '5f43ba273200020b101fe49f',
        quantity: 5
    }
];

const updatedProduct = {
    name: 'Mouse Gamer',
    quantity: 10,
};

describe('Inserindo um novo produto', () => {
    let connectionMock;
  
    before( async () => {
      connectionMock = await getConnection();
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });
  
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      MongoClient.connect.restore();
    });

    describe('Inserção feita com sucesso', () => {
        it('Deve retornar um objeto', async () => {
          const product = await productsModel.createNewProduct(newProduct);
          expect(product).to.be.a('object');
        });
        it('Deve retornar um objeto com a chave `name`', async () => {
            const product = await productsModel.createNewProduct(newProduct);
            expect(product).to.have.property('name');
          });
        it('Deve retornar um objeto com a chave `quantity`', async () => {
          const product = await productsModel.createNewProduct(newProduct);
          expect(product).to.have.property('quantity');
        });
      });
    });