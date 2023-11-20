import React, { useEffect, useState } from 'react';
import styled from 'styled-components';  
import ReviewItem from './ReviewItem';
import NewReviewForm from './NewReviewForm';
import { useReview } from '../contexts/ReviewContext/ReviewContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/AuthContext';

import { Button } from 'react-bootstrap';
import { MdAddCircleOutline } from 'react-icons/md';

const NoReviewsMessage = () => {
  const navigate = useNavigate()

  const redirectToLogin = () => { 
    navigate('/login');
  };
  return (
    <MessageContainer>
      <p>No hay reseñas disponibles.</p>
      <SubMessage>Ingresa para añadir una reseña</SubMessage>
      <AddReviewButton variant="primary" onClick={redirectToLogin}>
        <MdAddCircleOutline style={{ marginRight: '5px' }} />
        Ingresar
      </AddReviewButton>
    </MessageContainer>
  );
};

const ReviewSection = () => {
  const  params  = useParams()
  const { isAuth } = useAuth()
  const { getReviewBookById, reviews } = useReview() 
  const [reviewsList, setReviewsList] = useState([])

  useEffect(() => {  
    getReviewBookById(params.id)
  }, [])

  useEffect(() => {
      //console.log(reviews) 
      setReviewsList(reviews)
  }, [reviews])

  return ( 
        <ReviewsContainer>
          <h2 className='mt-5'>Reseñas</h2>
          {reviewsList.length > 0 && reviewsList.map((review, index) => ( 
              <ReviewItem key={index} review={review} /> 
          ))}
          {isAuth && <NewReviewForm /> }
          {!isAuth && reviewsList.length<=0 && <NoReviewsMessage/>}
           
        </ReviewsContainer>  
  );
};

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  padding-bottom: 50px;
`;

const MessageContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  width: 100%;
`;

const SubMessage = styled.p`
  margin-top: 10px;
`;

const AddReviewButton = styled(Button)`
  margin-top: 10px;
`;


export default ReviewSection;
