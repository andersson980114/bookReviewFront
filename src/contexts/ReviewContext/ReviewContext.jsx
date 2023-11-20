import React, { createContext, useContext, useState } from 'react';
import { setReview as setReviewApi, getReviewBookById as getReviewBookByIdApi, putReviewId as putReviewIdApi, deletReviewId as deleteReviewIdApi } from '../../utils/reviewApi';

const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  const setReview = async (data) => {
    try {
      const review = await setReviewApi(data);
      //console.log(review.data);
      getReviewBookById(data.id_libro)
    } catch (error) {
      console.error("Error en ReviewContext [setReview]: ", error);
    }
  };

  const getReviewBookById = async (bookId) => {
    try {
      const review = await getReviewBookByIdApi(bookId);
      //console.log("reviews",review.data);
      setReviews(review.data);
    } catch (error) {
      console.error("Error en ReviewContext [getReviewBookById]: ", error);
    }
  };

  const updateReview = async (reviewId) => {
    try {
      const review = await putReviewIdApi(reviewId);
      console.log(review.data);
      // Lógica para actualizar la reseña en el estado
    } catch (error) {
      console.error("Error en ReviewContext [updateReview]: ", error);
    }
  };

  const deleteReview = async (reviewId, bookId) => {
    try {
      const response = await deleteReviewIdApi(reviewId);
      //console.log("delete review", response)
      getReviewBookById(bookId)
    } catch (error) {
      console.error("Error en ReviewContext [deleteReview]: ", error);
    }
  };

    
  const values = {
    reviews,
    selectedReview,
    setReview,
    getReviewBookById,
    updateReview,
    deleteReview,
  };

  return (
    <ReviewContext.Provider value={values}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  return useContext(ReviewContext);
};

export default ReviewProvider;
