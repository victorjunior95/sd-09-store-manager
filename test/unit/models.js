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

const VALID_ID_1 = ObjectId('60e770a1f02f7e8cab42588a');
const VALID_ID_2 = ObjectId('60e770a1f02f7e8cab42589a');

const VALID_PRODUCT_INPUT_1_FULL = {
  _id: VALID_ID_1,
  name:'Lapiseira Graphgear 1000',
  quantity: 100,
};

const VALID_PRODUCT_INPUT_2_FULL = {
  _id: VALID_ID_2,
  name:'Borracha branca Mono',
  quantity: 60,
};

const VALID_PRODUCT_INPUT_1_UPDATED = {
  id: VALID_ID_1,
  name:'Lapiseira Graphgear 1005',
  quantity: 175,
};

const VALID_SALE_INPUT_1 = [
  {
    productId: VALID_ID_1,
    quantity: 10,
  },
];

const VALID_SALE_INPUT_2 = [
  {
    productId: VALID_ID_1,
    quantity: 10,
  },
  {
    productId: VALID_ID_2,
    quantity: 15,
  },
];

const VALID_ITEM_ARRAY = [{ productId: '60e770a1f02f7e8cab42588a', quantity : 10 }];

const VALID_SALE_INPUT_1_FULL = {
  _id: VALID_ID_1,
  itensSold: [
    {
      productId: VALID_ID_2,
      quantity: 10,
    },
  ],
};

describe('Testes para a camada Model', () => {
  let connectionMock;
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

  describe('Testes para a rota "/products/"', () => {
    describe('Testes para as funções associadas ao método POST', () => {
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
        it('deve retornar um objeto com chaves "_id", "name" e "quantity"', async () => {
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
      describe('Testes para a função getAllProducts', () => {
        it('deve retornar um objeto com uma chave products', async ()=> {
          const result = await productsModel.getAllProducts();
          expect(result).to.be.an('object').to.have.key('products');
        });
        it('o retorno deve conter na chave products, um array com a lista dos produtos', async () => {
          const result = await productsModel.getAllProducts();
          expect(result.products).to.be.an('array');
        });
        it('a chave products deve ter o tamanho certo, igual ao número de produtos cadastrados', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1);
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_2);
          const result = await productsModel.getAllProducts();

          expect(result.products).to.have.length(2);
        });
        it('a chave products deve ter tamanho 0 no caso de não ter nenhum produto cadastrado', async () => {
          const result = await productsModel.getAllProducts();

          expect(result.products).to.have.length(0);
        });
      //fim dos testes do getAllProducts
      });
      describe('Testes para a função getProductById', () => {
        it('deve retornar um objeto com as chaves "_id", "name", "quantity" referentes ao produto', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);
          const result = await productsModel.getProductById(VALID_ID_1);

          expect(result).to.be.an('Object').to.have.all.keys('_id', 'name', 'quantity');
        });
        it('deve retornar um null se não encontrar nenhum produto', async () => {
          const result = await productsModel.getProductById(VALID_ID_1);

          expect(result).to.be.null;
        });
      //fim dos testes do getProductById
      });
    // fim do método GET
    });
    describe('Testes as funções associadas ao método PUT', () => {
      describe('Em caso de sucesso', () => {
        it('deve retornar 1 ao fazer o update' , async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);
          const result = await productsModel.updateProduct(VALID_PRODUCT_INPUT_1_UPDATED);

          expect(result).to.be.equal(1);
        });
      });
      describe('Em caso de falha', () => {
        it('deve retornar um null', async () => {
          const result = await productsModel.updateProduct(VALID_PRODUCT_INPUT_1_UPDATED);

          expect(result).to.be.null;
        });
      });
    // fim to método PUT
    });
    describe('Testes as funções associadas ao método DELETE', () => {
      describe('Em caso de sucesso', () => {
        it('deve retornar um objeto com os dados do produto deletado', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);

          const result = await productsModel.deleteProduct(VALID_ID_1);

          expect(result).to.be.an('Object').to.have.all.keys('_id', 'name', 'quantity');
        });
      });
      describe('Em caso de falha', () => {
        it('deve retornar um null', async () => {
          const result = await productsModel.deleteProduct(VALID_ID_1);

          expect(result).to.be.null;
        });
      });
    // fim do método DELETE
    });
    describe('Teste para a função updateProductWhenSold', () => {
      it('deve retornar um null quando completar e as quantidades devem estar certas', async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);
        const productOriginal = await productsModel.getProductById(VALID_ID_1);
        const result = await productsModel.updateProductWhenSold(VALID_ITEM_ARRAY);
        const productUpdated = await productsModel.getProductById(VALID_ID_1);

        expect(result).to.be.null;
        expect(productOriginal).to.be.an('object');
        expect(productOriginal.quantity).to.be.equal(100);
        expect(productUpdated).to.be.an('object');
        expect(productUpdated.quantity).to.be.equal(90);
      });
    });
    describe('Teste para a função updateProductWhenDeleted', () => {
      it('deve retornar um null quando completar e as quantidades devem estar certas', async () => {
        const db = connectionMock.db('StoreManager');
        await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);
        const productOriginal = await productsModel.getProductById(VALID_ID_1);
        const result = await productsModel.updateProductsWhenDeleted(VALID_ITEM_ARRAY);
        const productUpdated = await productsModel.getProductById(VALID_ID_1);

        expect(result).to.be.null;
        expect(productOriginal).to.be.an('object');
        expect(productOriginal.quantity).to.be.equal(100);
        expect(productUpdated).to.be.an('object');
        expect(productUpdated.quantity).to.be.equal(110);
      });
    });
  // fim dos testes de produtos
  });
  describe('Testes para a rota "/sales/"', () => {
    describe('Testes para as funções associadas ao método POST', () => {
      describe('Testes para a função postNewSale', () => {
        describe('Quando a sale é cadastrada com sucesso', () => {
          it('deve retornar um objeto', async () => {
            const db = connectionMock.db('StoreManager');
            await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);

            const result = await salesModel.postNewSale(VALID_SALE_INPUT_1);
            expect(result).to.be.an('object');
          });
        });
      });
    // fim do método POST
    });
    describe('Testes das funções do metodo GET', () => {
      describe('Testes para a função getAllSales', () => {
        it('deve retornar um objeto com uma key "sales"', async () => {
          const result = await salesModel.getAllSales();

          expect(result).to.be.an('object').to.have.key('sales');
        });
        it('a chave sales deve ser um array com a lista de vendas', async() => {
          const result = await salesModel.getAllSales();

          expect(result.sales).to.be.an('array');
        });
        it('o retorno deve ter o tamanho certo, igual ao número de vendas cadastradas', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_1_FULL);
          await db.collection('products').insertOne(VALID_PRODUCT_INPUT_2_FULL);

          await db.collection('sales').insertOne({itensSold: VALID_SALE_INPUT_1});
          await db.collection('sales').insertOne({itensSold: VALID_SALE_INPUT_2});
          const result = await salesModel.getAllSales();

          expect(result.sales).to.have.length(2);
        });
        it('o retorno deve ter tamanho 0, se não tiver nenhuma venda cadastrada', async () => {
          const result = await salesModel.getAllSales();

          expect(result.sales).to.have.length(0);
        });
      });
      describe('Testes para a função getSaleById', () => {
        describe('Caso encontre uma venda', () => {
          it('deve retornar os dados da venda', async () => {
            const db = connectionMock.db('StoreManager');
            await db.collection('sales').insertOne(VALID_SALE_INPUT_1_FULL);
            const result = await salesModel.getSaleById(VALID_ID_1);

            expect(result).to.be.an('object').to.have.all.keys('_id', 'itensSold');
          });
        });
        describe('Caso não encontre uma venda', () => {
          it('deve retornar null', async () => {
            const result = await salesModel.getSaleById(VALID_ID_1);

            expect(result).to.be.null;
          });
        });
        describe('Caso o ID não seja válido', () => {
          it('deve retornar null', async () => {
            const result = await salesModel.getSaleById('9999');

            expect(result).to.be.null;
          });
        });
      });
    // fim do método GET
    });
    describe('Testes das funções do método PUT', () => {
      describe('Em caso de sucesso', () => {
        it('deve retornar um 1 quando conseguir fazer um update', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('sales').insertOne(VALID_SALE_INPUT_1_FULL);
          const itensSold = [{VALID_ID_2, quantity: 5}];
          const result = await salesModel.updateSale({id: VALID_ID_1, itensSold});

          expect(result).to.be.equal(1);
        });
      });
      describe('Em caso de falha', () => {
        it('deve retornar um null', async () => {
          const itensSold = [{VALID_ID_2, quantity: 5}];
          const result = await salesModel.updateSale({id: VALID_ID_1, itensSold});

          expect(result).to.be.null;
        });
      });
    // fim to método PUT
    });
    describe('Testes para o método DELETE', () => {
      describe('Em caso de sucesso', () => {
        it('deve retornar os dados da sale que foi deletada', async () => {
          const db = connectionMock.db('StoreManager');
          await db.collection('sales').insertOne(VALID_SALE_INPUT_1_FULL);

          const result = await salesModel.deleteSale(VALID_ID_1);

          expect(result).to.be.an('object').to.have.all.keys('_id', 'itensSold');
          expect(result.itensSold).to.be.an('array').to.have.length(1);
        });
      });
      describe('Em caso de falha', () => {
        it('deve retornar um null', async () => {
          const result = await salesModel.deleteSale(VALID_ID_1);

          expect(result).to.be.null;
        });
      });
    // fim to método DELETE
    });
  // fim dos testes de sales
  });
});
