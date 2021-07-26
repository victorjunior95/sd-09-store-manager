const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { getConnection } = require('./connectionMock');
const productsModel = require('../../models/Products');
const salesModel = require('../../models/Sales');


describe('Teste do ProductModel', () => {
    let connectionMock;

    before( async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
    });

    describe('Se a inserção foi feita com sucesso', () => {
      let response;

      before(async () => {
      response = await productsModel.createNewProduct('Cadeira Gamer', 100);
      });

      after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      });
      it('Deve retornar um objeto', async () => {
      expect(response).to.be.a('object');
      });
      it('Deve retornar um objeto com a chave `name`', async () => {
          expect(response).to.have.property('name');
      });
      it('Deve retornar um objeto com a chave `quantity`', async () => {
      expect(response).to.have.property('quantity');
      });
      it('Deve retornar um objeto com a chave `_id`', async () => {
          expect(response).to.have.property('_id');
      });
      it('"name" deve ser uma string com mais de 5 caracteres', () => {
          const { name } = response;
  
          expect(name).to.be.a('string');
          expect(name.length).to.be.greaterThanOrEqual(5);
      });
      it('"quantity" deve ser um número maior que 0', () => {
          const { quantity } = response;
  
          expect(quantity).to.be.a('number');
          expect(quantity).to.be.greaterThan(0);
      });
    });
    describe('Testa a leitura dos produtos no banco de dados', () => {
      describe('Quando a leitura é feita com sucesso', () => {
      let response;
  
      before(async () => {
          response = await productsModel.getAll();
      });
  
      it('O resultado deve ser um array', () => {
          const products = response.products;
          expect(products).to.be.a('array');
      });
  
      it('O resultado deve ser um array que contenha apenas objetos', () => {
          const products = response.products;
          products.forEach((product) => expect(product).to.be.a('object'));
      });
      });
      describe('Testa a busca de produtos por id', () => {
        describe('Quando a busca é feita com sucesso', () => {
          let response;

          before(async () => {
              response = await productsModel.createNewProduct('Cadeira Gamer', 100);
          });

          after(async () => {
              await connectionMock.db('StoreManager').collection('products').deleteMany({});
          });

          it('O resultado deve ser um objeto', async () => {
              const foundProduct = await productsModel.findById(response._id);

              expect(foundProduct).to.be.a('object');
          });

          it('O resultado deve conter as chaves "_id", "name", "quantity"', async () => {
              const foundProduct = await productsModel.findById(response._id);

              expect(foundProduct).to.include.all.keys('_id', 'name', 'quantity');
          });
        });
        describe('Quando a busca por Id falha', () => {

          it('deve retornar null', async () => {
            const invalidId = null;
            const foundProduct = await productsModel.findById(invalidId);

            expect(foundProduct).to.be.null;
          });
        });
      })
    });
    describe('Testa a atualização de produtos', () => {
      let productToBeUpdated
      before(async () => {
        productToBeUpdated = await productsModel.createNewProduct('Cadeira Gamer',);

      });
    
      after(async () => {
          await connectionMock.db('StoreManager').collection('products').deleteMany({});
      });
    
      describe('Quando a atualização é realizada com sucesso', async () => {
        it('O retorno deve ter as caracteristicas desejadas', async () => {
          const { _id } = productToBeUpdated;
          await productsModel.updateProduct(_id, 'Mouse Gamer', 10);
          const updatedProduct = await productsModel.findById(_id);
          const { name, quantity } = updatedProduct;
          expect(name).to.be.equal('Mouse Gamer');
          expect(quantity).to.be.equal(10);
        });
      });
      describe('Quando a atualização dá erro', async () => {
        it('deve retornar null', async () => {
          const invalidId = null;
          const updatedProduct = await productsModel.updateProduct(invalidId);
          expect(updatedProduct).to.be.a('object');
        });
      });
    });
    describe('Testa a deleção de produtos', () => {
      let productToBeDeleted
      before(async () => {
        productToBeDeleted = await productsModel.createNewProduct('Cadeira Gamer', 100);

      });
  
      describe('Quando a deleção é realizada com sucesso', async () => {
        it('O retorno deve ter as caracteristicas desejadas', async () => {
          const { _id } = productToBeDeleted;
          await productsModel.deleteProduct(_id);
          const { products } = await productsModel.getAll();
          expect(products.length).to.be.equal(0);
        });
      });
      describe('Quando a deleção dá erro', async () => {
        it('quando o produto não existe', async () => {
          const invalidId = null;
          const deletedProduct = await productsModel.deleteProduct(invalidId);
          expect(deletedProduct).to.be.null;
        });
      });
    });
});

describe('Testando SaleModel', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
  });

  describe('Testando a inserção de vendas', () => {
    let existentProduct;

    before(async () => {
      existentProduct = await productsModel.createNewProduct('Cadeira Gamer', 100);
    });
  
    after(async () => {
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });
    
    describe('testa a inserçao de venda de produto existente', () => {

      it('deve-se retornar um objeto', async () => {
    
        const { _id } = existentProduct;
        const insertedSale = await salesModel.createNewSale([{ productId: _id, quantity: 10 }]);

        expect(insertedSale).to.be.a('object');
      });

      it('o objeto retornado deve possuir as chaves "_id", "itensSold"', async () => {
        const {_id} = existentProduct;
        const insertedSale = await salesModel.createNewSale([{ productId: _id, quantity: 10 }]);

        expect(insertedSale).to.include.all.keys('_id', 'itensSold');
      });
    });
  });
  describe('Testa a leitura das vendas no banco de dados', () => {
    describe('Quando a leitura é feita com sucesso', () => {
    let response;

    before(async () => {
        response = await salesModel.getAll();
    });

    it('O resultado deve ser um array', () => {
        const sales = response.sales;
        expect(sales).to.be.a('array');
    });

    it('O resultado deve ser um array que contenha apenas objetos', () => {
        const sales = response.sales;
        sales.forEach((product) => expect(product).to.be.a('object'));
    });
    });
  });
  describe('Deletando uma venda', () => {
    describe('Quando a deleção é feita com sucesso', () => {
      let existentProduct;

      before(async () => {
        existentProduct = await productsModel.createNewProduct('Cadeira Gamer', 100);
      });
    
      after(async () => {
        await connectionMock.db('StoreManager').collection('sales').deleteMany({});
      });

    it('Deve ser deletado a partir do Id', async () => {

      const { _id } = existentProduct;
      const newSale = await salesModel.createNewSale([{ productId: _id, quantity: 10 }]);

      const response = await salesModel.deleteSale(newSale._id);
      expect(response.deleted).to.be.equal();
    });
    });
  });
});