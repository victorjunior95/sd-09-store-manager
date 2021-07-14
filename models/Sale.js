const { ObjectID } = require('mongodb');
const connection = require('./connection');

class Sale {
  constructor(items, id) {
    this.collection = 'sales';
    this.items = items ? this._validateItemsID(items) : [];
    this.id = id;
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

  get(id) {
    return !ObjectID.isValid(id)
      ? null
      : connection()
        .then((db) => db.collection(this.collection))
        .then((collection) => collection.findOne({ _id: ObjectID(id) }))
        .then((result) => result ? result : {});
  }

  update(payload) {
    const { id, itensSold } = payload;

    return !ObjectID.isValid(id)
      ? null
      : connection()
        .then((db) => db.collection(this.collection))
        .then((collection) => collection.findOneAndUpdate(
          { _id: ObjectID(id) },
          { $set: { itensSold } },
          { returnOriginal: false },
        ))
        .then((result) => !result.value ? {} : result.value);
  }
}

module.exports = Sale;
