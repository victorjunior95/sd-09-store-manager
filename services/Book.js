const Author = require('../models/Author');
const Book = require('../models/Book');

const getAll = async () => Book.getAll();

const findById = async (id) => {
  const book = await Book.findById(id);

  if (!book) {
    return {
      error: {
        code: 'notFound',
        message: 'Livro não encontrado',
      },
    };
  }

  return book;
};


const findByAuthorId = async (id) => {
    const book = await Book.findByAuthorId(id);
  
    if (!book) {
      return {
        error: {
          code: 'notFound',
          message: 'Livro não encontrado',
        },
      };
    }
  
    return book;
  };

  const findByTitle = async (title) => {
    const book = await Book.findByTitle(title);
  
    if (!book) {
      return {
        error: {
          code: 'notFound',
          message: 'Livro não encontrado',
        },
      };
    }
    return book;
  };

const create = async (title, authorId) => {
  const author = await Author.findById(authorId);

  if (!author) {
    return {
      error: {
        code: 'notFound',
        message: 'Autor não encontrado',
      },
    };
  }

  return Book.create(title, authorId);
};

module.exports = {
  getAll,
  findById,
  create,
  findByAuthorId,
  findByTitle,
};