import axios from 'axios'; 

const baseUrl = process.env.REACT_APP_API_URL;


export const setReview = async (data) => {
    try {
      return await axios.post(`${baseUrl}/reviews`, data);
    } catch (e) {
      console.log(e);
    }
};

export const getReviewBookById = async (bookId) => {
    try {
        return await axios.get(`${baseUrl}/reviews/book/${bookId}`);
    } catch (e) {
        console.log(e);
    }
};

export const putReviewId = async (reviewId, data) => {
    try {
        return await axios.put(`${baseUrl}/reviews/${reviewId}`, data);
    } catch (e) {
        console.log(e);
    }
};

export const deletReviewId = async (reviewId) => {
    try {
        return await axios.delete(`${baseUrl}/reviews/${reviewId}`);
    } catch (e) {
        console.log(e);
    }
};