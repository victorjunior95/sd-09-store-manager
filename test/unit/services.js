const productService = require('../../services/productService');
const salesService = require('../../services/salesService');
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const product3 = { name: 'p3', quantity: 3 };
const product4 = { name: 'p4', quantity: 4 };
let id3;
let id4;
let saleId;

// before(async () => {
//   const DBServer = new MongoMemoryServer();
//   const URLMock = await DBServer.getUri();

//   const connectionMock = await MongoClient.connect(
//     URLMock,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//   );

//   sinon.stub(MongoClient, 'connect').resolves(connectionMock);
// });

// after(() => {
//   MongoClient.connect.restore();
// });

describe('[Service] Insere um produto no db', () => {
  describe('quando o produto é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const { name, quantity } = product3;
      const createdProduct = await productService.create(name, quantity);
      id3 = createdProduct['_id'];
      expect(createdProduct).to.be.an('object');
    });

    it('o objeto possui os atributos: _id, name, quantity', async () => {
      const { name, quantity } = product4;
      const createdProduct = await productService.create(name, quantity);
      id4 = createdProduct['_id'];
      expect(createdProduct).to.have.property('_id');
      expect(createdProduct).to.have.property('name');
      expect(createdProduct).to.have.property('quantity');
    });
  });
});

describe('[Service] Exibe todos os produtos', () => {
  describe('quando os produtos são encontrados com sucesso', () => {
    let allProducts;
    it('retorna um objeto', async () => {
      allProducts = await productService.getAll();
      expect(allProducts).to.be.an('object');
    });

    it('o objeto possui um atributo chamado products', () => {
      expect(allProducts).to.have.property('products');
    });

    it('o atributo products é um array', () => {
      expect(allProducts.products).to.be.an('array');
    });

    it('os elementos de products são objetos', () => {
      expect(allProducts.products[0]).to.be.an('object');
    });

    it('o elemento possui os atributos: _id, name, quantity', () => {
      expect(allProducts.products[0]).to.have.property('_id');
      expect(allProducts.products[0]).to.have.property('name');
      expect(allProducts.products[0]).to.have.property('quantity');
    });
  });
});

describe('[Service] Busca um produto pelo id', () => {
  describe('quando o produto é retornado com sucesso', () => {
    let product;
    it('retorna um objeto', async () => {
      product = await productService.getProductById(id3);
      expect(product).to.be.an('object');
    });

    it('o objeto possui os atributos: _id, name, quantity', () => {
      expect(product).to.have.property('_id');
      expect(product).to.have.property('name');
      expect(product).to.have.property('quantity');
    });
  });

  describe('quando o produto não é encontrado', () => {
    it('retorna null', async () => {
      const id = '99999999999'
      const product = await productService.getProductById(id);
      expect(product).to.be.equals(null);
    });
  });
});

describe('[Service] Atualiza um produto', () => {
  describe('quando o produto é atualizado com sucesso', () => {
    let updatedProduct;
    let newQuantity;
    it('retorna um objeto', async () => {
      const { name } = product3;
      newQuantity = 300;
      updatedProduct = await productService.updateProduct(id3, name, newQuantity);
      expect(updatedProduct).to.be.an('object');
    });

    it('o objeto possui os atributos: _id, name, quantity', () => {
      expect(updatedProduct).to.have.property('_id');
      expect(updatedProduct).to.have.property('name');
      expect(updatedProduct).to.have.property('quantity');
    });

    it('o produto foi atualizado', () => {
      expect(updatedProduct.quantity).to.be.equals(newQuantity);
    });
  });
});

describe('[Service] Busca vários produtos pelo id', () => {
  describe('quando ao menos um produto é encontrado', () => {
    let productList;
    it('retorna um array', async () => {
      const productId3 = id3.toString();
      const productId4 = id4.toString();
      const idList = [productId3, productId4];
      productList = await productService.getProductsByIds(idList);
      expect(productList).to.be.an('array');
    });

    it('o array não está vazio', () => {
      expect(productList).to.be.not.empty;
    });

    it('os elementos do array são objetos', () => {
      expect(productList[0]).to.be.an('object');
    });

    it('o elemento possui os atributos: _id, name, quantity', () => {
      expect(productList[0]).to.have.property('_id');
      expect(productList[0]).to.have.property('name');
      expect(productList[0]).to.have.property('quantity');
    });
  });
});

describe('[Service] Verifica se existe um produto de acordo com o nome', () => {
  describe('quando o produto é encontrado com sucesso', () => {
    it('retorna true', async () => {
      const { name } = product3;
      const hasProduct = await productService.hasAnotherProductWithName(name);
      expect(hasProduct).to.be.true;
    });
  });

  describe('quando o produto não é encontrado', () => {
    it('retorna false', async () => {
      const name = 'nameless';
      const hasProduct = await productService.hasAnotherProductWithName(name);
      expect(hasProduct).to.be.false;
    });
  });

  describe(
    'quando o produto não existe outro produto além do identificado pelo id',
    () => {
      it('retorna false', async () => {
        const { name } = product3;
        const productId3 = id3.toString();
        const hasProduct = await productService.hasAnotherProductWithName(name, productId3);
        expect(hasProduct).to.be.false;
      });
    }
  );
});

describe('[Service] Remove um produto', () => {
  describe('quando o produto é removido com sucesso', () => {
    let deletedProduct;
    it('retorna um objeto', async () => {
      deletedProduct = await productService.deleteProduct(id3);
      expect(deletedProduct).to.be.an('object');
    });

    it('o produto foi removido', async () => {
      const product = await productService.getProductById(id3);
      expect(product).to.be.null;
    });
  });
});

describe('[Service] Cria uma venda', () => {
  describe('quando a venda é criada com sucesso', () => {
    let createdSale;
    it('retorna um objeto', async () => {
      const sales = [{ productId: id4, quantity: 40 }];
      createdSale = await salesService.create(sales);
      saleId = createdSale['_id'];
      expect(createdSale).to.be.an('object');
    });

    it('o objeto possui os atributos: _id e itensSold', () => {
      expect(createdSale).to.have.property('_id');
      expect(createdSale).to.have.property('itensSold');
    });
  });
});

describe('[Service] Busca todas as vendas', () => {
  describe('quando ao menos uma venda é encontrada', () => {
    let allSales;
    it('retorna um objeto', async () => {
      allSales = await salesService.getAllSales();
      expect(allSales).to.be.an.an('object');
    });

    it('o objeto possui o atributo sales', () => {
      expect(allSales).to.have.property('sales');
    });

    it('o atributo sales é um array', () => {
      expect(allSales.sales).to.be.an('array');
    });

    it('os elementos do array sales possuem os atributos: _id e itensSold', () => {
      expect(allSales.sales[0]).to.have.property('_id');
      expect(allSales.sales[0]).to.have.property('itensSold');
    });
  });
});

describe('[Service] Busca uma venda pelo id', () => {
  describe('quando a venda é encontrada com sucesso', () => {
    let sale;
    it('retorna um objeto', async () => {
      sale = await salesService.getSaleById(saleId);
      expect(sale).to.be.an('object');
    });

    it('o objeto possui os atributos: _id e itensSold', () => {
      expect(sale).to.have.property('_id');
      expect(sale).to.have.property('itensSold');
    });
  });

  describe('quando a venda não é encontrada', () => {
    it('retorna null', async () => {
      const sale = await salesService.getSaleById('9999999');
      expect(sale).to.be.null;
    });
  });
});

describe('[Service] Atualiza uma venda', () => {
  describe('quando a venda é atualizada com sucesso', () => {
    let updatedSale;
    let quantity;
    it('retorna um objeto', async () => {
      quantity = 400;
      const data = [{ productId: id4, quantity }];
      updatedSale = await salesService.updateSale(saleId, data);
      expect(updatedSale).to.be.an('object');
    });

    it('o objeto possui os atributos: _id e itensSold', () => {
      expect(updatedSale).to.have.property('_id');
      expect(updatedSale).to.have.property('itensSold');
    });

    it('a venda foi atualizada', () => {
      expect(updatedSale.itensSold[0].quantity).to.be.equals(400);
    });
  });
});

describe('[Service] Remove uma venda', () => {
  describe('quando a venda é removida com sucesso', () => {
    it('retorna um objeto', async () => {
      const deletedSale = await salesService.deleteSale(saleId);
      expect(deletedSale).to.be.an('object');
    });

    it('a venda foi removida', async () => {
      const sale = await salesService.getSaleById(saleId);
      expect(sale).to.be.null;
    });
  });
});
