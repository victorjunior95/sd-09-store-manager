const { ObjectID } = require('mongodb');
const connection = require('./connection');

class Sale {
  constructor(items) {
    this.collection = 'sales';
    this.items = this._validateItemsID(items);
  }

  _validateItemsID(items) {
    for (const item of items) {
      if (!ObjectID.isValid(item.productId)) return null;
    }
    return items;
  }

  create() {
    return !this.items
      ? null
      : connection()
        .then((db) => db.collection(this.collection))
        .then((collection) => collection.insertOne({ itensSold: this.items }))
        .then((result) => result.ops[0]);
  }

  getAll() {
    return connection()
      .then((db) => db.collection(this.collection))
      .then((collection) => collection.find().toArray());
  }
}

module.exports = Sale;
