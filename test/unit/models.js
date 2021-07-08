const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, Db } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ObjectId } = require('mongodb');

const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

// variaveis para rodar os testes
const VALID_PRODUCT_INPUT_1 = {
  name:'Lapiseira Graphgear 1000',
  quantity: 100,
};


const VALID_PRODUCT_INPUT_2 = {
  name:'Borracha branca Mono',
  quantity: 70,
};

const VALID_ID = ObjectId('60e770a1f02f7e8cab42588a');

const VALID_PRODUCT_INPUT_1_FULL = {
  _id: VALID_ID,
  name:'Lapiseira Graphgear 1000',
  quantity: 100,
};

const VALID_PRODUCT_INPUT_1_UPDATED = {
  id: VALID_ID,
  name:'Lapiseira Graphgear 1005',
  quantity: 175,
};

const INVALID_PRODUCT_INPUT_1 = {
  name: 'Cad',
  quantity: 100,
};

const INVALID_PRODUCT_INPUT_2 = {
  name: 'Caderno',
  quantity: 0,
};

const INVALID_PRODUCT_INPUT_3 = {
  name: 'Caderno',
  quantity: -5,
};

describe('Testes para os arquivos de model', () => {
  let connectionMock;
  let db;
  const DBServer = new MongoMemoryServer();

  before( async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  beforeEach(async () => {
    const db = connectionMock.db('StoreManager');
    await db.collection('products').deleteMany({});
    await db.collection('sales').deleteMany({});
  });

  describe('Testes para as funções de produtos', () => {
    describe('Testes as funções associadas ao método POST', () => {
      describe('Quando um produto é inserido com sucesso', () => {
        it('deve retornar um objeto', async () => {
          const response = await productsModel.postNewProduct(VALID_PRODUCT_INPUT_1);

          expect(response).to.be.an('object');
        });
        it('deve ter as chaves _id, name e quantity no objeto de retorno', async () => {
          const response = await productsModel.postNewProduct(VALID_PRODUCT_INPUT_1);

          expect(response).to.have.all.keys('_id', 'name', 'quantity');
        });
      });
      describe('Quando não é possivel inserir um produto pois ja existe o mesmo no db', () => {
        it('deve retornar um null', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1);
          const response = await productsModel.postNewProduct(VALID_PRODUCT_INPUT_1);

          expect(response).to.be.null;
        });
      });
      describe('Quando procuramos o produto por NOME', () =>{
        it('Deve retornar um objeto com chaves "_id", "name" e "quantity"', async () => {
          const name = 'Lapiseira Graphgear 1000';
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1);
          const result = await productsModel.findProductByName({ name });

          expect(result).to.be.an('object').to.have.all.keys('_id', 'name', 'quantity');
        });
      });
    // fim do método POST
    });
    describe('Testes as funções associadas ao método GET', () => {
      describe('Quando utilizamos a função getAllProducts', () => {
        it('Deve retornar um objeto com uma chave products', async ()=> {
          const result = await productsModel.getAllProducts();
          expect(result).to.be.an('object').to.have.key('products');
        });
        it('O retorno deve conter na chave products, um array com a lista dos produtos', async () => {
          const result = await productsModel.getAllProducts();
          expect(result.products).to.be.an('array');
        });
        it('A chave products deve ter o tamanho certo, igual ao número de produtos cadastrados', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1);
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_2);
          const result = await productsModel.getAllProducts();

          expect(result.products).to.have.length(2);
        });
        it('A chave products deve ter tamanho 0 no caso de não ter nenhum produto cadastrado', async () => {
          const result = await productsModel.getAllProducts();

          expect(result.products).to.have.length(0);
        });
      //fim dos testes do getAllProducts
      });
      describe('Quando utilizamos a função getProductById', () => {
        it('Deve retornar um objeto com as chaves "_id", "name", "quantity" referentes ao produto', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);
          const result = await productsModel.getProductById(VALID_ID);

          expect(result).to.be.an('Object').to.have.all.keys('_id', 'name', 'quantity');
        });
        it('Deve retornar um null se não encontrar nenhum produto', async () => {
          const result = await productsModel.getProductById(VALID_ID);

          expect(result).to.be.null;
        });
      //fim dos testes do getProductById
      });
    // fim do método GET
    });
    describe('Testes as funções associadas ao método PUT', () => {
      describe('Em caso de sucesso', () => {
        it('Deve retornar 1 ao fazer o update' , async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);

          const result = await productsModel.updateProduct(VALID_PRODUCT_INPUT_1_UPDATED);

          expect(result).to.be.equal(1);
        });
      });
      describe('Em caso de falha', () => {
        it('Deve retornar um null', async () => {
          const result = await productsModel.updateProduct(VALID_PRODUCT_INPUT_1_UPDATED);

          expect(result).to.be.null;
        });
      });
    // fim to método PUT
    });
    describe('Testes as funções associadas ao método DELETE', () => {
      describe('Em caso de sucesso', () => {
        it('Deve retornar um objeto com os dados do produto deletado', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);

          const result = await productsModel.deleteProduct(VALID_ID);

          expect(result).to.be.an('Object').to.have.all.keys('_id', 'name', 'quantity');
        });
      });
      describe('Em caso de falha', () => {
        it('Deve retornar um null', async () => {
          const result = await productsModel.deleteProduct(VALID_ID);

          expect(result).to.be.null;
        });
      });
    // fim do método DELETE
    });
  // fim dos testes de produtos
  });
  // fim dos testes
});
