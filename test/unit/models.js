const sinon = require('sinon');
const { ObjectId } = require('mongodb');
const { expect } = require('chai') ;
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const modelProduct = require('../../models/functions');
const modelSales = require('../../models/sales');

describe('Busca todos os produtos e vendas', () => {
  let connectionMock;
  const DBServer = new MongoMemoryServer();
  before(async () => {
    const urlMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(urlMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('Quando não existe produtos e vendas cadastrados', () => {
    it('retorna um array da coleção da "product"', async () => {
      const response = await modelProduct.findProductAll();

      expect(response).to.be.an('array');
    });
    it('retorna um array vazio da coleção da "product"', async () => {
      const response = await modelProduct.findProductAll();

      expect(response).to.be.empty;
    });
    it('retorna um array da coleção da "sales"', async () => {
      const response = await modelSales.findSales();

      expect(response).to.be.an('array');
    });
    it('retorna um array vazio da coleção da "sales"', async () => {
      const response = await modelSales.findSales();

      expect(response).to.be.empty;
    });
  });
  describe('Quando existe produtos cadastrado', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: 'bola de campo',
        quantity: 100
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    })

    it('retorna um array da coleção "product"', async () => {
      const response = await modelProduct.findProductAll();

      expect(response).to.be.an('array');
    });
    it('Array não está vazio da coleção "product"', async () => {
      const response = await modelProduct.findProductAll();

      expect(response).to.not.be.empty;
    });
    it('Itens do array são objetos da coleção "product"', async () => {
      const [item] = await modelProduct.findProductAll();

      expect(item).to.be.an('object');
    });
    it('Itens do array possuem chaves obrigatorias da coleção "product"', async () => {
      const [item] = await modelProduct.findProductAll();

      expect(item).to.include.all.keys('_id', 'name', 'quantity');
    });

  });
  describe('Quando existe vendas cadastrada', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('sales').insertOne({
        itensSold: [{
          productId: "5f43ba273200020b101fe49f",
          quantity: 2
        }],
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    })

    it('retorna um array', async () => {
      const response = await modelSales.findSales();

      expect(response).to.be.an('array');
    });
    it('Array não está vazio', async () => {
      const response = await modelSales.findSales();

      expect(response).to.not.be.empty;
    });
    it('Itens do array são objetos', async () => {
      const [item] = await modelSales.findSales();

      expect(item).to.be.an('object');
    });
    it('Itens do array possui chaves obrigatorias', async () => {
      const [item] = await modelSales.findSales();

      expect(item).to.include.all.keys('_id', 'itensSold');
    });
    it('Array de "itensSold possui chaves obrigatorias"', async () => {
      const [item] = await modelSales.findSales();
      const { itensSold } = item;
      const [sale] = itensSold;
      expect(sale).to.include.all.keys('productId', 'quantity');
    });
  });
  describe('Quando busca um produto pelo id', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        _id: new ObjectId("5bce15b6bc525d895d4afbcc"),
        name: "Produto do Batista",
        quantity: 100
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('retona um objeto', async () => {
      const id = "5bce15b6bc525d895d4afbcc";
      const response = await modelProduct.findProductId(id)

      expect(response).to.be.an('object');
    });
    it('retona um objeto com as chaves obrigatorias', async () => {
      const id = "5bce15b6bc525d895d4afbcc";
      const response = await modelProduct.findProductId(id);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
    it('Quando "ID" não existe', async () => {
      const id = "5bce15b6bc525d895d4afbca";
      const response = await modelProduct.findProductId(id);

      expect(response).to.be.an('null');
    });
  });
  describe('Quando busca venda pelo id', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('sales').insertOne({
        _id: ObjectId("5f43ba333200020b101fe4a0"),
        itensSold: [
          {
            productId: "5f43ba273200020b101fe49f",
            quantity: 2
          }
        ]
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('retona um objeto', async () => {
      const id = "5f43ba333200020b101fe4a0";
      const response = await modelSales.findSalesId(id);

      expect(response).to.be.an('object');
    });
    it('retona um objeto com as chaves obrigatorias', async () => {
      const id = "5f43ba333200020b101fe4a0";
      const response = await modelSales.findSalesId(id);

      expect(response).to.include.all.keys('_id', 'itensSold');
    });
    it('Quando "ID" não existe', async () => {
      const id = "5bce15b6bc525d895d4afbca";
      const response = await modelProduct.findProductId(id);

      expect(response).to.be.an('null');
    });
    it('chave "itensSold" contém um array', async () => {
      const id = "5f43ba333200020b101fe4a0";
      const { itensSold } = await modelSales.findSalesId(id);

      expect(itensSold).to.be.an('array');
    });
  });
  describe('Quando busca produto pelo "Name"', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: 'bola de campo',
        quantity: 100
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('retona um array', async () => {
      const name = 'bola de campo';
      const response = await modelProduct.findProductName(name);

      expect(response).to.be.an('array');
    });
    it('retona um array com pelo menos um objeto', async () => {
      const name = 'bola de campo';
      const [response] = await modelProduct.findProductName(name);

      expect(response).to.be.an('object');
    });
    it('Os objetos do array contém chaves obrigarotias', async () => {
      const name = 'bola de campo';
      const [response] = await modelProduct.findProductName(name);

      expect(response).to.include.keys('_id', 'name', 'quantity');
    });
  });
  describe('Quando cria produto', () => {
    it('retona um array', async () => {
      const name = 'bola de campo';
      const quantity = 100;
      const response = await modelProduct.create(name, quantity);

      expect(response).to.be.an('object');
    });

    it('O objeto "object.ops[0]" contém chaves obrigarotias', async () => {
      const name = 'bola de campo';
      const quantity = 100;
      const response = await modelProduct.create(name, quantity);

      expect(response.ops[0]).to.include.keys('_id', 'name', 'quantity');
    });
  });
  describe('Quando faz update em um produto', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        _id: ObjectId("5f43ba333200020b101fe4a0"),
        name: 'bola de campo',
        quantity: 100
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('retona um objeto', async () => {
      const id = '5f43ba333200020b101fe4a0';
      const name = 'bola de campo';
      const quantity = 100;
      const response = await modelProduct.updateProduct(id, name, quantity);

      expect(response).to.be.an('object');
    });
    it('retona um um objeto com chaves obrigatoria', async () => {
      const id = '5f43ba333200020b101fe4a0';
      const name = 'bola de campo';
      const quantity = 100;
      const response = await modelProduct.updateProduct(id, name, quantity);

      expect(response).to.include.keys('id', 'name', 'quantity');
    });

  });
  describe('Quando deleta produto', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        _id: new ObjectId("5bce15b6bc525d895d4afbcc"),
        name: "Produto do Batista",
        quantity: 100
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('retona um objeto', async () => {
      const id = "5bce15b6bc525d895d4afbdd";
      const response = await modelProduct.deleteProduct(id)

      expect(response).to.be.an('object');
    });

  });
  describe('Quando cria venda', () => {
    it('retorna um objeo', async () => {
      const product = [];
      const response = await modelSales.addSales(product);

      expect(response).to.be.an('object');
    });
  });
  describe('Quando atualiza uma venda', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('sales').insertOne({
        _id: ObjectId("5f43ba333200020b101fe4a0"),
        itensSold: [
          {
            productId: "5f43ba273200020b101fe49f",
            quantity: 2
          }
        ]
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('retorna um objeto', async () => {
      const id = "5f43ba333200020b101fe4a0"
      const product = [];
      const response = await modelSales.updateSales(id, product);

      expect(response).to.be.an('object');
    });
  });
  describe('Quando deleta uma venda', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('sales').insertOne({
        _id: ObjectId("5f43ba333200020b101fe4a0"),
        itensSold: [
          {
            productId: "5f43ba273200020b101fe49f",
            quantity: 2
          }
        ]
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    it('retorna um objeto', async () => {
      const id = "5f43ba333200020b101fe4a0";
      const response = await modelSales.deleteSales(id);

      expect(response).to.be.an('object');
    });
  });
});