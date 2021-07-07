const { ObjectId } = require('mongodb');
const connection = require('./connection');

const renameId = ({ _id, ...document }) => ({ id: _id, ...document });

const getAll = () => connection()
    .then((db) => db.collection('books').find({}).toArray())
    .then((results) => results.map(renameId));

const findByAuthorId = async (id) => {
    const books = await connection()
        .then((db) => db.collection('books').find({ author_id: id * 1 }, { _id: false }).toArray())
    return books;
}

// const titleEdit = (title) =>{
//     return "/" + title + "/"
// }
const findByTitle = async (title) => {
    // const book = await connection()
    //     .then((db) => db.collection('books').find().toArray())
    // const newArr = [];
    // for (let i = 0; i < book.length; i += 1) {
    //     if (JSON.stringify(book[i].title).includes(title)) {
    //         newArr.push(book[i])
    //     }
    // }
    // return newArr;
    return await connection()
        .then((db) => db.collection('books').find({ title: { $regex: "cla", $options: 'i' } })
            .toArray())
}

const findById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const book = await connection()
        .then((db) => db.collection('books').findOne({ _id: ObjectId(id) }));
    if (!book) return null;
    return book;
};

const create = (title, authorId) => connection()
    .then((db) => db.collection('books').insertOne({ title, authorId }))
    .then((result) => ({ id: result.insertedId, title, authorId }));

module.exports = {
    getAll,
    findByAuthorId,
    findById,
    create,
    findByTitle,
};