const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { DB_NAME } = require('../../utils')

const { getConnection } = require('./connectionMock')
const { registerProductModel } = require('../../models/productsModel')

describe('Insere um novo produto no DB', () => {
    const productExemple = {
        name: 'product name',
        quantity: 'product quantity'
    };
    
    let connectionMock;
    beforeEach(async() => {
        connectionMock = await getConnection()

        sinon.stub(MongoClient, 'connect').resolves(connectionMock)
    });

    afterEach(async () => {
        await connectionMock.db(DB_NAME)
        .collection('products').deleteMany({});
        
        MongoClient.connect.restore();
    })
    
    describe('Quando é inserido com sucesso', async () => {
        it('retorna um objeto', async () => {
            const response = await registerProductModel(productExemple);

            expect(response).to.be.a('object');
        });

        it('o objeto possui o "id" do novo produto', async () => {
            const response = await registerProductModel(productExemple);

            expect(response).to.be.a.property('_id');
        });
    })
});

