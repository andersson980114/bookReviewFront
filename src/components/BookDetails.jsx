import React from 'react';
import { rendersStars } from '../utils/rendersStars';
import styled from 'styled-components';
import { useBook } from '../contexts/BookContext/BookContext';



const BookDetails = () => { 
  const { selectedBook } = useBook()
  const { cover, nombre, autor, calificacion, descripcion } = selectedBook || {};

  return (
    <BookDetailsContainer>
      <BookCoverContainer>
        <BookCover src={cover} alt="Book Cover" />
      </BookCoverContainer>
      <BookInfoContainer>
        {nombre && <Title>{nombre}</Title>}
        {autor && <Author>{autor.nombre} {autor.apellido}</Author>}
        {calificacion && <StarsContainer>{rendersStars(calificacion)}</StarsContainer>}
        {descripcion && <Description>{descripcion}</Description>}
      </BookInfoContainer>
    </BookDetailsContainer>
  );
};

const BookDetailsContainer = styled.div`
  display: flex;
  align-items: flex-start;  
  justify-content: center;
  padding: 20px; 

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: center;  
  }
`;

const BookInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  max-width: 600px;
  flex-grow: 1;  
`;

const Title = styled.h1`
  margin-bottom: 5px;
  margin-top: 10px;
`;

const Author = styled.p`
  margin-bottom: 5px;
`;

const StarsContainer = styled.div`
  margin-bottom: 10px;
`;

const BookCoverContainer = styled.div`
  flex: 1;  
  max-width: 30rem;  
  overflow: hidden;  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    max-width: none;  
    width: 100%;
    height: auto;  
  }
`;

const BookCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;  
  padding: 5px;
`;

const Description = styled.p`
  text-align: justify;
`;
export default BookDetails;
