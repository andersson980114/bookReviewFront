import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
  return (
    <Container>
      <ErrorImage src="/nfp.jpg" alt="Error" />
      <ErrorMessage>Oops! Página no encontrada.</ErrorMessage>
      <BackButton to="/">Home</BackButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ErrorImage = styled.img`
  width: 300px; 
  height: auto;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const BackButton = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export default NotFoundPage;