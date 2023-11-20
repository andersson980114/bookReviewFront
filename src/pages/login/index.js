import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom' 
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const { isAuth, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submit = (data) => {
    login(data);
  };

  return isAuth ? <Navigate to="/"/> : (
    <StyledContainer fluid>
      <StyledCard>
        <Card.Body>
          <StyledRow>
            <ImageCol md="6">
              <StyledImage src="/imgll.jpg" alt="Sample" />
            </ImageCol> 
            <FormCol md="5" className='mt-5'>
              <Form onSubmit={handleSubmit(submit)} className='col-6 mt-5'>
                <h3 className="text-center fw-bold mx-3 mb-2 mt-4">Iniciar Sesión</h3>
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Control
                      type="text"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      placeholder="Usuario"
                      {...register('username', {
                        required: 'Usuario obligatorio',
                      })}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username.message}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Password"
                      {...register('password', {
                        required: 'Contraseña obligatoria',
                      })}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password.message}</div>
                    )}
                  </Form.Group>

                </Row>

                <Row >
                  <Button type="submit" className="btn btn-primary mt-4">
                    Ingresar
                  </Button>
                </Row>
              </Form>
            </FormCol>
          </StyledRow>
        </Card.Body>
      </StyledCard>
 
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  max-width: 100rem;  
  margin: 0 auto;  
  padding: 3rem;
  margin-top: 5rem;

  @media (max-width: 450px) {
    height: 100%;
    padding: 1rem;
  }
`;

const StyledCard = styled(Card)`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  overflow: hidden; 
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: 0 auto;  
`;

const ImageCol = styled(Col)`
  flex: 1;
  position: relative;
  max-width: 50rem;
  max-height: 40rem;
  overflow: hidden;
`;
 
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormCol = styled(Col)`
  flex: 1;
  display: flex;
  justify-content: center;
`;

export default LoginPage;
