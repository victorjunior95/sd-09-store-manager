const SalesModel = require('../Model/SalesModel');
const ProductService = require('../Service/ProductService');
const { StatusCodes } = require('http-status-codes');
const Ultils = require('../Helpers/Ultils');
const { each } = require('bluebird');

const ONE = 1;
const ZERO = 0;

const createSale = async (products) => {
  const updatedProducts = [];
  const filteredQuantitys =
    !products.filter((e) => e.quantity < ONE).length &&
    !products.filter((e) => typeof e.quantity === 'string').length;

  if (!filteredQuantitys) {
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  }

  await each(products, async (product) => {
    // busca o produto
    const dbProduct = await ProductService.getProductId(product.productId);

    if (dbProduct.quantity - product.quantity < ZERO) {
      return {
        isError: true,
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
        status: StatusCodes.NOT_FOUND,
      };
    } 
    const updatedProduct = await ProductService.updateProduct(
      dbProduct._id,
      dbProduct.name,
      dbProduct.quantity - product.quantity,
    );
    console.log('começou');
    console.log(updatedProduct.quantity, 'venhaa');
    
  
    if (updatedProduct) {
      updatedProducts.push(updatedProduct);
    }
    
  });
  

  if (updatedProducts.length !== products.length) {
    return {
      isError: true,
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
      status: StatusCodes.NOT_FOUND,
    };
  } 
  console.log(products);
  const result = await SalesModel.createSale(products);
  console.log(result);
  return result;
};

const getAllSales = async () => {
  const getInput = await SalesModel.getAllSales();
  const result = { sales: [...getInput] };
  return result;
};

const getOneSale = async (id) => {
  const getInput = await SalesModel.getOneSale(id);
  const result = { sales: [getInput] };
  if (getInput === null)
    return {
      isError: true,
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };

  return result;
};

const updateSale = async (id, itemSold) => {
  const products = itemSold;

  const filteredQuantitys =
    products.filter((e) => e.quantity < ONE).length < ONE &&
    products.filter((e) => typeof e.quantity === 'string').length < ONE;

  if (!filteredQuantitys)
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };

  const productsCollection = await SalesModel.getAllProducts();

  let check = ZERO;
  products.map((SaleInList) => {
    productsCollection.map((product) => {
      if (SaleInList.productId.toString() === product._id.toString()) check += ONE;
    });
  });

  if (check !== products.length)
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };

  const result = await SalesModel.updateById(id, itemSold);
  return result;
};

const deleteSale = async (id) => {
  if (!(await Ultils.existId(id))) {
    return {
      isError: true,
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
    };
  }
  const sale = await SalesModel.getOneSale(id);

  await SalesModel.deleteSale(id);

  await each(sale.itensSold, async (product) => {
    const dbProduct = await ProductService.getProductId(product.productId);

    await ProductService.updateProduct(
      dbProduct._id,
      dbProduct.name,
      dbProduct.quantity + product.quantity,
    );
  });

  return sale;
};

module.exports = { createSale, getAllSales, getOneSale, updateSale, deleteSale };
