import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import ReactStars from "react-rating-stars-component";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { useReview } from '../contexts/ReviewContext/ReviewContext';


const NewReviewForm = () => {
    const params = useParams();
    const { user } = useAuth();
    //const { getReviewBookById, setReview } = useReview()
    const {  setReview } = useReview()
    const { control, handleSubmit, reset } = useForm();
    const [rating, setRating] = useState(0);
    const [key, setKey] = useState(0);
    
  
    const onSubmit = (data) => {
      const reviewData = {
        id_libro: params.id,
        id_usuario: user.id,
        reseña: data.reviewText,
        calificación: rating,
      };
      setReview(reviewData)
      //console.log(reviewData);
  
      // Resetear los datos del formulario
      reset({
        reviewText: '',
      });
   
      setRating(0);
      setKey(key + 1);
    };
  
    return (
      <NewReviewCard>
        <h3>Agregar nueva reseña</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledRow>
            <Col xs={12} md={6}>
              <LabelContainer>
                <Label>Calificación:</Label>
                <ReactStars
                  count={5}
                  size={24}
                  activeColor="orange"
                  isHalf={false}
                  value={rating}
                  onChange={(value) => setRating(value)}
                  key={key}
                />
              </LabelContainer>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col xs={12} md={12}>
              <Controller
                name="reviewText"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledTextarea {...field} rows="3" />
                )}
              />
            </Col>
          </StyledRow>
          <StyledRow>
            <Col xs={12} md={12} className="d-flex justify-content-end mt-3">
              <Button type="submit">Añadir reseña</Button>
            </Col>
          </StyledRow>
        </form>
      </NewReviewCard>
    );
  };
  

const Label = styled.p`
  font-weight: bold;
  margin-top: 20px;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NewReviewCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 100%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledRow = styled(Row)`
  margin-bottom: 5px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  max-width: 100%;
  resize: none;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: #008cff;
    outline: none;
  }
`;

export default NewReviewForm;
