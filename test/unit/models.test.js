const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { DB_NAME } = require('../../utils')

const { getConnection } = require('./connectionMock')
const registerProduct = require('../../models/registerProduct')

describe('Insere um novo produto no DB', () => {
    const productExemple = {
        name: 'product name',
        quantity: 'product quantity'
    };

    let connectionMock;

    before(async() => {
        connectionMock = await getConnection()

        sinon.stub(MongoClient, 'connect').resolves(connectionMock)
    });

    after(async () => {
        await connectionMock.db(DB_NAME)
          .collection('produtos').deleteMany({});

        MongoClient.connect.restore();
    })

    describe('Quando é inserido com sucesso', () => {
        it('retorna um objeto', () => {
            const response = await registerProduct(productExemple);

            expect(response).to.be.a('object');
        });

        it('o objeto possui o "id" do novo produto', () => {
            const response = await registerProduct(productExemple);
            
            expect(response).to.be.a.property('id');
        });
    })
});

