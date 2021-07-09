const { ObjectID } = require('mongodb');
const { InvalidArgumentError } = require('../errors');
const connection = require('./connection');

class Product {
  constructor() {
    this.collection = 'products';
  }

  async create(payload) {
    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.insertOne(payload))
      .then((result) => result.ops[0]);
  }

  async getAll() {
    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.find().toArray());
  }

  async get(id) {
    if (!ObjectID.isValid(id)) throw new InvalidArgumentError('Wrong id format');

    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.find({ _id: id }).toArray())
      .then((result) => result[0]);
  }
}

module.exports = Product;
