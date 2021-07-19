const productModel = require('../../models/productModel');
const salesModel = require('../../models/salesModel');
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const product1 = { name: 'p1', quantity: 1 };
const product2 = { name: 'p2', quantity: 2 };

before(async () => {
  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();

  const connectionMock = await MongoClient.connect(
    URLMock,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
});

after(() => {
  MongoClient.connect.restore();
});

describe('Insere um novo produto no BD', () => {
  describe('quando é inserido com sucesso', async () => {
    it('retorna um objeto', async () => {
      const productInsertion = await productModel.create(product1.name, product1.quantity);
      expect(productInsertion).to.be.a('object');
    });

    it('a quantidade inserida deve ser 1', async () => {
      const productInsertion = await productModel.create(product2.name, product2.quantity);
      expect(productInsertion.insertedCount).to.be.equals(1);
    });
  });
});

describe('Lista todos os produtos', () => {
  describe('quando é listado com sucesso', () => {
    it('retorna um array', async () => {
      const productList = await productModel.getAll();
      expect(productList).an('array');
    });
  });
});

describe('Busca um produto pelo nome', () => {
  describe('quando o produto é encontrado', () => {
    let product;

    it('retorna um objeto', async () => {
      product = await productModel.getProductByName(product2.name);
      expect(product).to.be.an('object');
    });

    it('o objeto possui um id', () => {
      expect(product).to.have.property('_id');
    });

    it('o objeto possui um nome', () => {
      expect(product).to.have.property('name');
    });

    it('o objeto possui uma quantidade', () => {
      expect(product).to.have.property('quantity');
    });
  });

  describe('quando o produto não é encontrado', () => {
    it('retora null', async () => {
      const product = await productModel.getProductByName('nameless');
      expect(product).to.equals(null);
    });
  });
});

describe('Busca um produto pelo id', () => {
  describe('quando o produto é encontrado', () => {
    let product;

    it('retorna um objeto', async () => {
      const { _id } = await productModel.getProductByName(product1.name);
      product = await productModel.getProductById(_id);
      expect(product).to.be.an('object');
    });

    it('o objeto possui um id', () => {
      expect(product).to.have.property('_id');
    });

    it('o objeto possui um nome', () => {
      expect(product).to.have.property('name');
    });

    it('o objeto possui uma quantidade', () => {
      expect(product).to.have.property('quantity');
    });
  });

  describe('quando o produto não é encontrado', () => {
    it('retorna null', async () => {
      const product = await productModel.getProductById(99999);
      expect(product).to.be.equals(null);
    });
  });
});

describe('Atualiza um produto', () => {
  describe('quando é atualizado com sucesso', () => {
    let product;
    it('retorna um objeto', async () => {
      const { name } = product2;
      const { _id: id } = await productModel.getProductByName(name);
      const newQuantity = 10;
      product = await productModel.updateProduct(id, name, newQuantity);

      expect(product).to.be.an('object');
    });

    it('o objeto possui um id', () => {
      expect(product).to.have.property('_id');
    });

    it('o objeto possui um nome', () => {
      expect(product).to.have.property('name');
    });

    it('o objeto possui uma quantidade', () => {
      expect(product).to.have.property('quantity');
    });

    it('a quantidade atualizada é igual a 10', () => {
      expect(product.quantity).to.be.equals(10);
    });
  });
});

describe('Remove um produto', () => {
  describe('quando é removido com sucesso', () => {
    let deletedProduct;

    it('retorna um objeto', async () => {
      const { name } = product2;
      const { _id: id } = await productModel.getProductByName(name);
      deletedProduct = await productModel.deleteProduct(id);

      expect(deletedProduct).to.be.an('object');
    });

    it('o objeto possui um id', () => {
      expect(deletedProduct).to.have.property('_id');
    });

    it('o objeto possui um nome', () => {
      expect(deletedProduct).to.have.property('name');
    });

    it('o objeto possui uma quantidade', () => {
      expect(deletedProduct).to.have.property('quantity');
    });

    it('o objeto foi removido do BD', async () => {
      const product = await productModel.getProductById(deletedProduct.id);
      expect(product).to.be.equals(null);
    });
  });
});

describe('Busca vários produtos pelo id', () => {
  describe('quando encontra os produtos', () => {
    let productList;
    it('retorna um array', async () => {
      const { _id: id1 } = await productModel.getProductByName(product1.name);
      const idList = [id1];
      productList = await productModel.getProductsByIds(idList);
      expect(productList).to.be.an('array');
    });

    it('o array deve conter ao menos um elemento', () => {
      expect(productList).to.be.not.empty;
    });

    it('o elemento do array deve ser um objeto', () => {
      expect(productList[0]).to.be.an('object');
    });
  });

  describe('quando não encontra produto algum', () => {
    let productList;
    it('retorna um array', async () => {
      const idList = ['1234', '5678'];
      productList = await productModel.getProductsByIds(idList);
      expect(productList).to.be.an('array');
    });

    it('o array deve estar vazio', () => {
      expect(productList).to.be.empty;
    });
  });
});

describe('Cria uma venda', () => {
  describe('quando a venda é criada com sucesso', () => {
    let createdSale;

    it('retorna um objeto', async () => {
      const { _id: id } = await productModel.getProductByName(product1.name);
      const sales = [
        { productId: id, quantity: 20 },
        { productId: id, quantity: 30 }
      ];
      createdSale = await salesModel.createSales(sales);

      expect(createdSale).to.be.an('object');
    });

    it('o objeto contém um atributo chamado ops', () => {
      expect(createdSale).to.have.property('ops');
    });

    it('o primeiro elemento do valor de ops é um objeto', () => {
      expect(createdSale.ops[0]).to.be.an('object');
    });

    it('o elemento possui o atributo _id', () => {
      expect(createdSale.ops[0]).to.have.property('_id');
    });

    it('o elemento possui o atributo itensSold', () => {
      expect(createdSale.ops[0]).to.have.property('itensSold');
    });
  });
});

describe('Busca todas as vendas', () => {
  describe('quando ao menos uma venda é encontrada', () => {
    let sales;
    it('retorna um array', async () => {
      sales = await salesModel.getAllSales();
      expect(sales).to.be.an('array');
    });

    it('o array possui ao menos 1 elemento', () => {
      expect(sales).to.be.not.empty;
    });
  });
});

describe('Busca uma venda pelo id', () => {
  describe('quando a venda é encontrada', () => {
    let sale;

    it('retorna um objeto', async () => {
      const sales = await salesModel.getAllSales();
      const { _id: id } = sales[0];
      sale = await salesModel.getSaleById(id);
      expect(sale).to.be.an('object');
    });

    it('o objeto possui o atributo _id', () => {
      expect(sale).to.have.property('_id');
    });

    it('o objeto possui o atributo itensSold', () => {
      expect(sale).to.have.property('itensSold');
    });
  });
});

describe('Atualiza uma venda', () => {
  describe('quando a venda é atualizada com sucesso', () => {
    let updatedSale;

    it('retorna um objeto', async () => {
      const { _id: productId } = await productModel.getProductByName(product1.name);
      const sales = await salesModel.getAllSales();
      const { _id: id } = sales[0];
      const quantity = 100;
      updatedSale = await salesModel.updateSale(id, [{ productId, quantity }]);
      expect(updatedSale).to.be.an('object');
    });
  });
});

describe('Remove uma venda pelo id', () => {
  describe('quando a venda é removida com sucesso', () => {
    let deletedSale;
    it('retorna um objeto', async () => {
      const sales = await salesModel.getAllSales();
      const { _id: id } = sales[0];

      deletedSale = await salesModel.deleteSale(id);
      expect(deletedSale).to.be.an('object');
    });

    it('a venda foi removida do BD', async () => {
      const { _id: id } = deletedSale;
      const sale = await salesModel.getSaleById(id);
      expect(sale).to.be.equals(null);
    });
  });
});
