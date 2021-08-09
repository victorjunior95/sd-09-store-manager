const sinon  = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');

const uriConnection = require('./unitConnection');
const productModel = require('../../models/product');
const sales = require('../../models/sales');

  describe('Testa cadastro de novos produtos', () => {
    let connect;
    const testProduct = { name: 'Mathaus', quantity: 10 };
    const newProduct = { name: 'Daniela', quantity: 10 };
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
      MongoClient.connect.restore();
    });
  
    describe('verifica se  produto criado', () => {
      it('verifica se o produto é um objet', () => productModel.createProduct(testProduct)
          .then((res) => expect(res).to.be.an('object')));
  
      it('verifica se o produto criado tem as props: id, name, quantity', () => productModel.createProduct(newProduct)
          .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
    });
  });
 
  describe('verifica a listagem de produtos', () => {
    let connect;
    const testProduct = { name: 'mathaus', quantity: 10 };
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      MongoClient.connect.restore();
    });
  
    describe('testa os produtos', () => {
      it('verifica se os produtos são array', () => productModel.getProducts()
        .then((res) => expect(res).to.be.an('array')));
  
      it('verifica se retorna um array vazio', () => productModel.getProducts()
        .then((res) => expect(res).to.be.empty));
    });
  
    describe('verifica o banco de dados', () => {
      before(async () => {
        await connect.db('StoreManager').collection('products').insertOne(testProduct);
      });
  
      after(async () => {
        await connect.db('StoreManager').collection('products').deleteMany({});
      });
  
      it('verifica se retorna um  array', () => productModel.getProducts()
        .then((res) => expect(res).to.be.an('array')));
  
      it('verifica se retorna um array vazio', () => productModel.getProducts()
        .then((res) => expect(res).to.not.be.empty));
  
      it('verifica se retorna um array de objetos', () => productModel.getProducts()
        .then(([item]) => expect(item).to.be.an('object')));
  
      it('verifica se o objeto tem as props: id, name, quantity', () => productModel.getProducts()
        .then(([item]) => expect(item).to.include.all.keys('_id', 'name', 'quantity')));
    });
  });
  
  describe('testa a listagem de produtos por "ID"', () => {
    let connect;
    const fakeID = ObjectId('610007c2604ebb2c6bf20453');
    const testProductID = { _id: fakeID, name: 'mathaus', quantity: 10 };
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      MongoClient.connect.restore();
    });
  
    describe('ID não encontrado', () => {
      it('retornar null', () => productModel.productsId()
        .then((res) => expect(res).to.be.null));
    });
  
    describe('banco de dados populado', () => {
      before(async () => {
        await connect.db('StoreManager').collection('products').insertOne(testProductID);
      });
  
      after(async () => {
        await connect.db('StoreManager').collection('products').deleteMany({});
      });
  
      it('recebe um objeto', () => productModel.productsId(fakeID)
        .then((res) => expect(res).to.be.an('object')));
  
      it('recebe um objeto com as props: id, name, quantity', () => productModel.productsId(fakeID)
        .then((res) => expect(res).to.include.all.keys('_id', 'name', 'quantity')));
    });
  });

  describe('testa a edição de produtos', () => {
    let connect;
    const _id = ObjectId('610007c2604ebb2c6bf20453');
    const fakeProduct = { name: 'Mathaus', quantity: 10 };
    const fakeReplace = { name: 'skate', quantity: 7 };
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
      MongoClient.connect.restore();
    });
  
    describe('edita um produto', () => {
      before(async () => {
        await connect.db('StoreManager').collection('products').insertOne({ _id, fakeProduct });
      });
  
      after(async () => {
        await connect.db('StoreManager').collection('products').deleteMany({});
      });
  
      it('verifica se retorna um objeto', () => productModel.editProducts(_id, fakeProduct)
          .then((res) => expect(res).to.be.an('object')));
  
      it('verifica se o produto foi atualizado', () => productModel.editProducts(_id, fakeReplace)
          .then((res) => expect(res.modifiedCount).to.equal(1)));
    });
  });

  describe('testa a remoção de produtos', () => {
    let connect;
    const _id = ObjectId('610007c2604ebb2c6bf20453');
    const fakeProduct = {_id, name: 'Im a fake product', quantity: 10 };
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      await connect.db('StoreManager').collection('products').deleteMany({});
      MongoClient.connect.restore();
    });
  
    describe('deleta um produto', () => {
      before(async () => {
        await connect.db('StoreManager').collection('products').insertOne(fakeProduct);
      });
  
      after(async () => {
        await connect.db('StoreManager').collection('products').deleteMany({});
      });
  
      it('verifica se o id é invalido', () => productModel.deleteProduct(_id)
          .then(() => productModel.productsId(_id)
          .then((res) => expect(res).to.be.null)));
    });
  });
  

  describe('testa a criação de uma venda', () => {
    let connect;
    const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
      MongoClient.connect.restore();
    });
  
    describe('testa a criação', () => {
      it('verifica se é um array', () => sales.create(itensSold)
          .then(({ itensSold }) => expect(itensSold).to.be.an('array')));
  
      it('verifica se um item do array possui as props: _id, name, quantity', () => sales.create(itensSold)
          .then(({ itensSold: [item] }) => expect(item).to.include.all.keys('productId', 'quantity')));
    });
  });

  describe('testa a listagem de vendas', () => {
    let connect;
    const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      MongoClient.connect.restore();
    });
  
    describe('lista no BD', () => {
      it('verifica se é retornado um array', () => sales.getAllSales()
        .then((res) => expect(res).to.be.an('array')));
  
      it('verifica se o array vem vazio', () => sales.getAllSales()
        .then((res) => expect(res).to.be.empty));
    });
  
    describe('BD populado', () => {
      before(async () => {
        await connect.db('StoreManager').collection('sales').insertOne({ itensSold });
      });
  
      after(async () => {
        await connect.db('StoreManager').collection('sales').deleteMany({});
      });
  
      it('verifica se retorna um array', () => sales.getAllSales()
        .then((res) => expect(res).to.be.an('array')));
  
      it('verifica se o array não está vazio', () => sales.getAllSales()
        .then((res) => expect(res).to.not.be.empty));
  
      it('verifica se o array retorna um objeto', () => sales.getAllSales()
        .then(([item]) => expect(item).to.be.an('object')));
  
      it('verifica se um item do array é um objeto com as pros: _id, name, quantity', () => sales.getAllSales()
        .then(([item]) => expect(item).to.include.all.keys('_id', 'itensSold')));
    });
  });

  describe('Retorna uma venda por ID', () => {
    let connect;
    const _id = ObjectId('610007c2604ebb2c6bf20453');
    const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      MongoClient.connect.restore();
    });
  
    describe('no data on DB', () => {
      it('returns null', () => sales.getIdSales()
        .then((res) => expect(res).to.be.null));
    });
  
    describe('db with data', () => {
      before(async () => {
        await connect.db('StoreManager').collection('sales').insertOne({ _id, itensSold });
      });
  
      after(async () => {
        await connect.db('StoreManager').collection('sales').deleteMany({});
      });
  
      it('verifica se retorna um objeto', () => sales.getIdSales(_id)
        .then((res) => expect(res).to.be.an('object')));
  
      it('verifica se o objeto retornado tem as pros: _id, name, quantity', () => sales.getIdSales(_id)
        .then((res) => expect(res).to.include.all.keys('_id', 'itensSold')));
    });
  });

  describe('Test url update "sales"', () => {
    let connect;
    const _id = ObjectId('610007c2604ebb2c6bf20453');
    const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];
    const newItens = [{ productId: '610007e7604ebb2c6bf20454', quantity: 1 }];
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
      MongoClient.connect.restore();
    });
  
    describe('result of update', () => {
      before(async () => {
        await connect.db('StoreManager').collection('sales').insertOne({ _id, itensSold });
      });
  
      after(async () => {
        await connect.db('StoreManager').collection('sales').deleteMany({});
      });
  
      it('must have to be an object', () => sales.editSale(_id, itensSold)
          .then((res) => expect(res).to.be.an('object')));
    });
  });
  
  describe('Test url remove "sales"', () => {
    let connect;
    const _id = ObjectId('610007c2604ebb2c6bf20453');
    const itensSold = [{ productId: '610007e7604ebb2c6bf20454', quantity: 2 }];
  
    before(async () => {
      connect = await uriConnection();
      sinon.stub(MongoClient, 'connect').resolves(connect);
    });
  
    after(async () => {
      await connect.db('StoreManager').collection('sales').deleteMany({});
      MongoClient.connect.restore();
    });
  
    describe('result of remove', () => {
      before(async () => {
        await connect.db('StoreManager').collection('sales').insertOne({ _id, itensSold });
      });
  
      after(async () => {
        await connect.db('StoreManager').collection('sales').deleteMany({});
      });
  
      it('result must have to be null', () => sales.deleteSale(_id)
          .then(() => productModel.productsId(_id)
          .then((res) => expect(res).to.be.null)));
    });
  })


  