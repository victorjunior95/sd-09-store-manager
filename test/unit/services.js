const sinon = require('sinon');
const { expect } = require('chai');
const products = require('../../services/productService');
// const productsModels = require('../../models/products');

const sales = require('../../services/salesService');

const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

describe('Product services tests', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  before(async () => {
    const urlMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(urlMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('When creating a new product', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 10,
      })
    });
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    describe('If the product already exists', () => {
      it('Should return a error message', async () => {

        const newProduct = {
          name: "Nome do produto",
          quantity: 20,
        }

        const response = await products.productCreate(newProduct);
        const errorMessage = 'Product already exists';

        expect(response.message).to.be.equals(errorMessage);

      });
    });

    describe('If the quantity is lesser or iqual to zero', () => {
      it('Should return an error message', async () => {
        const newProduct = {
          name: "Nome do novo produto",
          quantity: -1,
        }
  
        const response = await products.productCreate(newProduct);
        const errorMessage = '"quantity" must be larger than or equal to 1';
  
        expect(response.message).to.be.equals(errorMessage);
      });
    });

    describe('If the product has a name with a length lesser than 5', () => {
      it('Should return an error message', async () => {
        const newProduct = {
          name: "Nome",
          quantity: 20,
        }

        const response = await products.productCreate(newProduct);
        const errorMessage = '"name" length must be at least 5 characters long';

        expect(response.message).to.be.equals(errorMessage);
      });
    });

    describe('If the data is correct', () => {
      it('Should create the new product', async () => {
        const newProduct = {
          name: "Nome do novo produto",
          quantity: 20,
        }

        const response = await products.productCreate(newProduct);
        
        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('When listing all products', () => {

    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 10,
      })
    });
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });
    describe('If there is at least one product', () => {
      it('Should return an array with the products', async () => {
        const response = await products.listProducts();
        const productData = response[0];

        expect(productData).to.be.an('object');
        expect(productData).to.include.all.keys('_id', 'name', 'quantity');
      })
    })

    describe('If there is no products', () => {
      it('Should return an empty array', async () => {
        await connectionMock.db('StoreManager').collection('products').deleteMany({});
        const response = await products.listProducts();

        expect(response).to.be.an('array');
        expect(response).to.be.empty;
      })
    })
  });

  describe('When searching a product by its id', () => {

    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 10,
      })
    });
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    describe('If the ID is not valid', () => {
      it('Should return an error message', async () => {
        const invalidId = '9999';
        const errorMessage = 'Wrong id format';
        const response = await products.productDetails(invalidId);

        expect(response.err.message).to.be.equals(errorMessage)
      })
    });

    describe('If the product is found', () => {
      it('Should return the object with the prodct data', async () => {
        const list = await products.listProducts();
        const productId = list[0]._id;

        const response = await products.productDetails(productId);
        expect(response.name).to.be.equals("Nome do produto");
      })
    })
  });

  describe('When updating a product', () => {

    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 10,
      })
    });
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    describe('If the ID is not valid', () => {
      it('Should return an error message', async () => {
        const invalidId = '9999';
        const errorMessage = 'Wrong id format';

        const newData = { invalidId, productData: { name: 'Novo nome do produto', quantity: 0 } };

        const response = await products.updateProduct(newData);


        expect(response.err.message).to.be.equals(errorMessage)
      });
    });

    describe('If the quantity is lesser or equal to zero', () => {
      it('Should return an error message', async () => {
        const list = await products.listProducts();
        const productId = list[0]._id;

        const newData = { id: productId, productData: { name: 'Novo nome do produto', quantity: 0 } };
        const response = await products.updateProduct(newData);

        const errorMessage = '"quantity" must be larger than or equal to 1';

        expect(response.message).to.be.equals(errorMessage);
      })
    })

    describe('If the name length is lesser than 5 characters', () => {
      it('Should return an error message', async () => {
        const list = await products.listProducts();
        const productId = list[0]._id;

        const newData = { id: productId, productData: { name: 'Novo', quantity: 20 } };

        const response = await products.updateProduct(newData);
        const errorMessage = '"name" length must be at least 5 characters long';

        expect(response.message).to.be.equals(errorMessage);
      })
    });

    describe('If the data is correct', () => {
      it('Should update the product and return the new data', async () => {
        const list = await products.listProducts();
        const productId = list[0]._id;

        const newData = { id: productId, productData: { name: 'Novo nome do produto', quantity: 20 } };
        const response = await products.updateProduct(newData);
        
        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      })
    })
  });
})

describe('Sales services tests', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  before(async () => {
    const urlMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(urlMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('When creating a new sale', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        _id: '61008d1fb207cf45e4c1dd27',
        name: "Nome do produto",
        quantity: 50,
      })
    });
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    describe('If the sold quantity of the product is invalid', () => {
      it('Should return a error message', async () => {

        const productId = '61008d1fb207cf45e4c1dd27';
        const newSaleData = [
          {
            productId: productId,
            quantity: 0,
          },
        ]
        
        const newSale = await sales.createSales(newSaleData);

        const errorMessage = 'Wrong product ID or invalid quantity';
        expect(newSale.message).to.be.equals(errorMessage);
      })
    });

    // describe('If the quantity in stock is lesser than the quantity to be sold', () => {
    //   it('Should return an error message', async () => {
    //     const productId = '61008d1fb207cf45e4c1dd27';
    //     const newSaleData = [
    //       {
    //         productId: productId,
    //         quantity: 60,
    //       },
    //     ];

    //     const errorMessage = 'Such amount is not permitted to sell';
    //     const response = await sales.verifyStock(newSaleData);
    //     console.log(response)
    //     expect(response).to.be.an('object');
    //     expect(response.err.message).to.be.equals(errorMessage)
    //   })
    // })

    describe('If the data is correct', () => {
      it('Should create the new sale', async () => {
        const productId = '61008d1fb207cf45e4c1dd27';

        const soldData = [{ productId: productId, quantity: 7 }]

        const newSale = await sales.createSales(soldData);

        expect(newSale).to.be.an('object');
        expect(newSale).to.include.all.keys('_id', 'itensSold');
      });
    });
  });

  describe('When listing all sales', () => {

    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        _id: '61008d1fb207cf45e4c1dd27',
        name: "Nome do produto",
        quantity: 50,
      })
    });
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    describe('If there is no sale', () => {
      it('Should return an empty array', async () => {
        const response = await sales.salesList();

        expect(response).to.be.an('array');
        expect(response).to.be.empty;
      });
    });
    describe('If there is at least one sale', () => {
      it('Should return an array with all the sales', async () => {

        const productId = '61008d1fb207cf45e4c1dd27';
        const newSaleData = [
          {
            productId: productId,
            quantity: 30,
          },
        ]
        await sales.createSales(newSaleData);

        const response = await sales.salesList();

        expect(response).to.be.an('array');
        expect(response[0]).to.include.all.keys('_id', 'itensSold');
      })
    })
  })

  describe('When searching a sale by its ID', () => {

    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        _id: '61008d1fb207cf45e4c1dd27',
        name: "Nome do produto",
        quantity: 50,
      })
      await connectionMock.db('StoreManager').collection('sales').insertOne({
        _id: '61008d1fb207cf45e4c1dd28',
        itensSold: {
          productId: "61008d1fb207cf45e4c1dd27",
          quantity: 20,
        }
      });
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });
    
    describe('If the ID is invalid', () => {
      it('Should return an error message', async () => {
        const searchId = 9999;

        const response = await sales.saleListById(searchId);

        const errorMessage = 'Sale not found';

        expect(response.err.message).to.be.equals(errorMessage);
      })
    });

    describe('If there is no sales with the ID', () => {
      it('Should return an error message', async () => {
        const searchId = '61008d1fb207cf45e4c1dd30';
        const response = await sales.saleListById(searchId);
        
        const errorMessage = 'Sale not found';

        expect(response.err.message).to.be.equals(errorMessage);
      })

    })

    // describe('If the data is valid', () => {
    //   it('Should return the object with the informed ID', async () => {
    //     const saleId = await sales.salesList().then(result => result[0]._id)

    //     const response = await sales.saleListById(saleId);
    //     console.log(response);

    //     expect(response).to.be.an('object');
    //     expect(response).to.include.all.keys('_id', 'itensSold');
    //   })
    // })
  });

  describe('When updating a sale', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        _id: '61008d1fb207cf45e4c1dd27',
        name: "Nome do produto",
        quantity: 50,
      })
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });
    
    describe('If the quantity is lesser or equal to zero', () => {
      it('Should return an error message', async () => {
        const sale = [{ productId: '61008d1fb207cf45e4c1dd27', quantity: 30 }];
        await sales.createSales(sale);

        const saleId = await sales.salesList().then(result => result[0]._id);
        const newData = [
          {
            id: saleId,
            itensSold: {
              "productId": "61008d1fb207cf45e4c1dd27",
              "quantity": -1
            }
          }
        ]
        
        const response = await sales.saleUpdate(newData);
        expect(response.err.message).to.be.equals('Sale not found')
      })
    })
  
    describe('When the ID is invalid', () => {
      it('Should return an error message', async () => {
        const sale = [{ productId: '61008d1fb207cf45e4c1dd27', quantity: 30 }];
        await sales.createSales(sale);

        const saleId = await sales.salesList().then(result => result[0]._id);
        const newData = [
          {
            id: saleId,
            itensSold: {
              "productId": "99999",
              "quantity": 20
            }
          }
        ]
        
        const response = await sales.saleUpdate(newData);
        expect(response.err.message).to.be.equals('Sale not found')
      })
    })

  })

  describe('When removing a sale', () => {

    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        _id: '61008d1fb207cf45e4c1dd27',
        name: "Nome do produto",
        quantity: 50,
      })
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    describe('If the ID is not valid', () => {
      it('Should return an error message', async () => {
  const sale = [{ productId: '61008d1fb207cf45e4c1dd27', quantity: 30 }];
        await sales.createSales(sale);

        const saleId = '9999';

        const response = await sales.saleDelete(saleId);
        expect(response.err.message).to.be.equals('Wrong sale ID format');

      })
    })
    describe('When the ID is correct', () => {
      it('Should remove the sale', async () => {
        const sale = [{ productId: '61008d1fb207cf45e4c1dd27', quantity: 30 }];
        await sales.createSales(sale);

        const saleId = await sales.salesList().then(result => result[0]._id);

        const response = await sales.saleDelete(saleId);
        expect(response.deletedCount).to.be.equals(1)
      })
    })
  })
});