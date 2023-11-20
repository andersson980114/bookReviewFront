import React, { createContext, useContext, useEffect, useState } from 'react';
import { getBookById as getBookByIdApi, getAllBooks as getAllBooksApi, getAllCategories as getAllCategoriesApi  } from '../../utils/bookApi';

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([])
  const [selectedBook, setSelectedBook] = useState(null);

  const getBookById = async (bookId) => {
    try {
      const book = await getBookByIdApi(bookId); 
      //console.log(book)
      setSelectedBook(book.data);
    } catch (error) {
      console.log("error book context[get id]:  ",error)
    }
  };

  const getAllBooks = async () => {
    try {
      const allBooks = await getAllBooksApi(); 
      setBooks(allBooks.data);
      //console.log(allBooks.data)
    } catch (error) {
      console.log("error bookContext [get all]:  ",error)
    }
  };

  const getAllCategories = async () => {
    try {
      const AllCategories = await getAllCategoriesApi(); 
      setCategories(AllCategories.data); 
    } catch (error) {
      console.log("error bookContext [get categories]:  ",error)
    }
  };

  

  useEffect(() => {
    getAllBooks();
    getAllCategories()
  }, []);  

  const values = {
    books,
    selectedBook,
    categories,
    getBookById,
    getAllBooks,
    getAllCategories,
  };

  return (
    <BookContext.Provider value={values}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  return useContext(BookContext);
};

export default BookProvider;