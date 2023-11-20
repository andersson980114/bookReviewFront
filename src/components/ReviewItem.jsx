import React from 'react';
import styled from 'styled-components';
import { rendersStars } from '../utils/rendersStars';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useReview } from '../contexts/ReviewContext/ReviewContext';

const ReviewItem = ({ review }) => {
  const { user } = useAuth();
  const { _id, id_usuario, id_libro, calificación, reseña } = review;
  const { deleteReview } = useReview() 

  const isCurrentUserReview = user.id === id_usuario._id;
 
  const handleDeleteClick = (id) => {
    deleteReview(id, id_libro._id) 
  };

  return (
    <ReviewCard>
      <RatingContainer>
        <UserProfile src={id_usuario.foto} alt="User Profile" />
        <div>
          <UserName>{id_usuario.nombre} {id_usuario.apellido}</UserName>
          <div>{rendersStars(calificación)}</div>
        </div>
      </RatingContainer>
      <ReviewContent>{reseña}</ReviewContent>
      {isCurrentUserReview && (
        <ButtonContainer>
           
          <IconButton onClick={()=>handleDeleteClick(_id)}>
            <MdDelete size={20} />
          </IconButton>
        </ButtonContainer>
      )}
    </ReviewCard>
  );
};

const ReviewCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
  width: 100%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const UserProfile = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const ReviewContent = styled.p`
  padding-top: 5px;
  padding-left: 80px;
  text-align: justify;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const IconButton = styled.div`
  cursor: pointer;
  margin-left: 10px;

  svg {
    color: #333;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #b35306;
    }
  }
`;

export default ReviewItem;
