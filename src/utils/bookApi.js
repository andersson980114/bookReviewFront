import axios from 'axios';
//import env from 'react-dotenv';

const baseUrl = process.env.REACT_APP_API_URL;

export const getBookById = async (bookId) => {
    try {
        return await axios.get(`${baseUrl}books/${bookId}`);
    } catch (e) {
        console.log(e);
    }
};

export const getAllBooks = async () => {
    try {
        return await axios.get(`${baseUrl}books`);
    } catch (e) {
        console.log(e);
    }
};

export const getAllCategories = async () => {
    try {
        return await axios.get(`${baseUrl}categories`);
    } catch (e) {
        console.log(e);
    }
};