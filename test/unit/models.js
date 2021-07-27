const sinon = require('sinon');
const { expect } = require('chai');
const products = require('../../models/products');
const sales = require('../../models/sales');

const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const { object } = require('joi');

describe('Product Models function', () => {
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
  describe('Get all products', () => {
    describe('If there is no product', () => {
      it('should return an array', async () => {
        const response = await products.listAllProducts();

        expect(response).to.be.an('array');
      });
      it('the array should be empty', async () => {
        const response = await products.listAllProducts();
        expect(response).to.be.empty;
      })
    });
    describe('If there is at least one product', () => {
      before(async () => {
        await connectionMock.db('StoreManager').collection('products').insertOne({
          name: "Nome do produto",
          quantity: 10,
        })
      });
      
      after(async () => {
        await connectionMock.db('StoreManager').collection('products').deleteMany({});
      });

      it('should return an array', async () => {
        const response = await products.listAllProducts();
        expect(response).to.be.an('array');

      });
      it('the array should not be empty', async () => {
        const response = await products.listAllProducts();
        expect(response).to.not.be.empty;

      });
      it('the array has object type items', async () => {
        const [item] = await products.listAllProducts();
        expect(item).to.be.an('object')
      });
      it('the items should have "name" and "quantity" properties', async () => {
        const [item] = await products.listAllProducts();
        expect(item).to.include.all.keys('name', 'quantity');
      });
    })
  });

  describe('Get product by ID', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 10,
      })
    });
    
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    describe('When a product is found', () => {
      
      // https://stackoverflow.com/questions/38497731/mocha-chai-uncaught-assertionerror-expected-to-equal-expected-actua -> referência para o Deep Equal
      
      it('Should have the same ID', async () => {
        const productId = await products.listAllProducts().then(result => result[0]._id);
        const response = await products.getProductById(productId).then(result => result._id);
    
        expect(response).to.be.deep.equal(productId);
      });
    
      it('Should have the "_id", "name" and "quantity" properties', async () => {
        const productId = await products.listAllProducts().then(result => result[0]._id);
        const response = await products.getProductById(productId);
        
        expect(response).to.include.all.keys('_id', 'name', 'quantity');
      });
    });
    
    describe('When no product is found', () => {
      it('Should return null', async () => {
        const product = "60f9da8764d6e55f34048eac"
        const response = await products.getProductById(product);

        expect(response).to.be.null;
      })
    })
    
  });

  describe('Get product by name', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 10,
      })
    });
    
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    describe('When a product is returned', () => {
      it('Should return an Object', async () => {
        const product = await products.listAllProducts().then(result => result[0]);
  
        const response = await products.getProductByName(product);
        const returnedName = response.name;

        expect(returnedName).to.be.equals(product.name);
      })
      it('Should have the properties "_id", "name" and "quantity"', async () => {
        const product = await products.listAllProducts().then(result => result[0]);
        const response = await products.getProductByName(product);
        
        expect(response).to.have.all.keys('_id', 'name', 'quantity');

      })
    })
    describe('When no product is found', () => {
      it('Should return null', async () => {
        const product = "Produto não existente"
        const response = await products.getProductByName(product);

        expect(response).to.be.null;
      })
    })
  });

  describe('Update product info', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 10,
      })
    });
    
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    describe('After the update', async () => {
      it('Should have the new properties assigned', async () => {
        const oldData = await products.listAllProducts().then(result => result[0]);
        const productData = {
          name: 'Nome do novo produto',
          quantity: 20
        }
        const id = oldData._id;
        const newInfo = { id, productData }
        const updatedData = await products.updateProductInfo(newInfo);
        const newData = await products.listAllProducts().then(result => result[0]);
        expect(updatedData.name).to.be.equals(newData.name);
        expect(updatedData.quantity).to.be.equals(newData.quantity)
      });
    });

    
  });

  describe('Update product sync with sales', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 10,
      })
    });
    
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    describe('When a sale is cancelled', () => {
      it('Should add the items back', async () => {
        const oldData = await products.listAllProducts().then(result => result[0]);
        // console.log(oldData);
        const id = oldData._id;
        const saleInfo = {
          product: {
            productId: id,
            quantity: 20
          },
          action: 'add',
        };
        const newQuantity = oldData.quantity + 20;
        await products.updateProductSale(saleInfo);
        const updatedData = await products.listAllProducts().then(result => result[0]);
        expect(updatedData.quantity).to.be.equals(newQuantity)
      });
    })
  });

  describe('Delete product model', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 10,
      })
    });
      
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    describe('If the product exists', () => {
      it('Should be removed from the list', async () => {
        const product = await products.listAllProducts().then(result => result[0]);
        const id = product._id;
        
        const response = await products.deleteProductModel(id);

        expect(response.deletedCount).to.be.equals(1);
      });
    });
    describe('If the product does not exist', () => {
      it('Should not delete anything', async () => {
        const id = '610017c401e81f1895710f25';
        const response = await products.deleteProductModel(id);
       
        expect(response.deletedCount).to.be.equals(0);
      });
    })
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
    
    describe('If the product is created', () => {
      
      it('Should be added to the list', async () => {

        const newProduct = {
          name: "Nome do produto novo",
          quantity: 20,
        }
        const response = await products.createProduct(newProduct);
   
        expect(response.name).to.be.equals("Nome do produto novo");
      });

      it('Should be an object', async () => {
        const newProduct = {
          name: "Nome do produto novo",
          quantity: 20,
        }
  
        const createdProduct = await products.createProduct(newProduct);

        expect(createdProduct).to.be.an('object');
      });

      it('Should have the "quantity", "name" and "_id" properties', async () => {
        const newProduct = {
          name: "Nome do produto novo",
          quantity: 20,
        }
  
        const createdProduct = await products.createProduct(newProduct);
        expect(createdProduct).to.include.all.keys('_id', 'name', 'quantity');
      });
    })
  });
});

describe('Sales Models function', () => {
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

  describe('When a new sale is created', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 30,
      })
    });
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });
    
    it('Should remove the sold quantity from the stock', async () => {
      const product = await products.listAllProducts().then(result => result[0]);
      const newSaleData = [
        {
        "productId": product._id,
        "quantity": 15,
        },
      ]
      await sales.createSalesModel(newSaleData);

      const newData = await products.listAllProducts().then(result => result[0]);
      const newQuantity = product.quantity - newData.quantity;

      expect(newData.quantity).to.be.equals(newQuantity);
    });

    it('Should create a new Sale on the list', async () => {
      const product = await products.listAllProducts().then(result => result[0]);
      const newSaleData = [
        {
          "productId": product._id,
          "quantity": 15,
        },
      ];

      await sales.createSalesModel(newSaleData);

      const sale = await sales.listSalesModel().then(result => result[0]);
console.log(sale);
      expect(sale).to.not.be.null;
    });
  })

  describe('When listing all sales', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 30,
      })
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });
    
    describe('When there is no sale created', () => {
      it('Should return an empty array', async () => {
        const allSalesList = await sales.listSalesModel();

        expect(allSalesList).to.be.an('array');
        expect(allSalesList).to.be.empty;
      });
    });
    describe('When there is at least one sale created', () => {
      it('Should return an array with the sale', async () => {
        const product = await products.listAllProducts().then(result => result[0]);
        const newSaleData = [
          {
          "productId": product._id,
          "quantity": 15,
          },
        ]
        await sales.createSalesModel(newSaleData);
        const allSalesList = await sales.listSalesModel();

        expect(allSalesList).to.be.an('array');
        expect(allSalesList).to.have.length(1);
      })
    })
  })

  describe('When searching a sale by the ID', () => {
    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 30,
      })
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });
    
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });

    describe('If no sale is found', () => {
      it('Should return null', async () => {
        const saleId = '610026239682bb2c1e56411c';

      const sale = await sales.saleByIdModel(saleId).then(result => result);

      expect(sale).to.be.null;
      })
    })

    describe('If the sale is found', () => {
      it('Should return the object with the sale info', async () => {
        const product = await products.listAllProducts().then(result => result[0]);
        const newSaleData = [
          {
            "productId": product._id,
            "quantity": 15,
          },
        ]
        
        await sales.createSalesModel(newSaleData);
        
        const saleId = await sales.listSalesModel().then(result => result[0]._id);
        console.log(saleId);
      const sale = await sales.saleByIdModel(saleId).then(result => result);

      expect(sale).to.be.an('object');

      })
    })
  })

  describe('When updating a sale info', () => {

    before(async () => {
      await connectionMock.db('StoreManager').collection('products').insertOne({
        name: "Nome do produto",
        quantity: 30,
      })
      
    });
    
    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
      await connectionMock.db('StoreManager').collection('sales').deleteMany({});
    });
    
    describe('If the sale exists', () => {
      before(async () => {
        
        const product = await products.listAllProducts().then(result => result[0]);
        await connectionMock.db('StoreManager').collection('sales').insertOne({
          itensSold: [{
            "productId": product._id,
            "quantity": 15
          }]
        });
      });

      it('Should have the new values', async () => {
        //get the id for the existin sale:
        const sale = await sales.listSalesModel().then(result => result[0]);
        const saleId = sale._id;
        const { productId } = sale.itensSold[0];
        // update the sale using the correct id

        const updateData = {
          id: saleId,
          itensSold: [{
            productId: productId,
            quantity: 20,
          }]
        }

        const newSaleData = await sales.saleUpdateModel(updateData);

        expect(newSaleData.itensSold[0].quantity).to.be.equals(20);
      })
    })
  })
});