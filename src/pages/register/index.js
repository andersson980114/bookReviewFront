import React, { useEffect, useRef, useState }  from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom' 
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import cloudinaryService from '../../utils/cloudinaryService';

const RegisterPage = () => { 
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const { isAuth, register: registerUser } = useAuth();
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nombre: '',
      apellido: '',
      foto: null,
      username: '',
      correo : '', 
      password: '',
    },
  });

 
  const submit = async (data) => {
    try {
      const response = await cloudinaryService.uploadFile(file);
      //console.log('File uploaded:', response);
      data.foto = response.url
    } catch (error) {
      console.error('Error uploading file:', error);
    }
     
    const register = registerUser(data);
    if(register){
      navigate("/login")
    }
    //console.log(data);
    reset();
  };

  return isAuth ? <Navigate to="/"/> :(
    <StyledContainer fluid>
      <StyledCard>
        <Card.Body>
          <StyledRow>
            <ImageCol md="6">
              <StyledImage src="/imgRl.jpg" alt="Sample" />
            </ImageCol> 
            <FormCol md="5">
              <Form onSubmit={handleSubmit(submit)} className='col-11 mt-5'>
              <h3 className="text-center fw-bold mx-3 mb-2 " >Registro de usuario</h3>
                <Row>
                  <Col>
                    <Form.Group className="mt-3">
                      <Form.Label>Nombre:</Form.Label>
                      <Form.Control
                        type="text"
                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                        placeholder="Ingresa tu nombre"
                        {...register('nombre', {
                          required: 'Nombre obligatorio',
                        })}
                      />
                      {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mt-3">
                      <Form.Label>Apellido:</Form.Label>
                      <Form.Control
                        type="text"
                        className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                        placeholder="Ingresa tu apellido"
                        {...register('apellido', {
                          required: 'Apellido obligatorio',
                        })}
                      />
                      {errors.apellido && <div className="invalid-feedback">{errors.apellido.message}</div>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mt-3">
                      <Form.Label>Correo:</Form.Label>
                      <Form.Control
                        type="text"
                        className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                        placeholder="Ingresa tu correo"
                        {...register('correo', {
                          required: 'Correo obligatorio',
                        })}
                      />
                      {errors.correo && <div className="invalid-feedback">{errors.correo.message}</div>}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mt-3">
                      <Form.Label>Foto de usuario:</Form.Label>
                      <Form.Control
                        type="file"
                        className={`form-control ${errors.foto ? 'is-invalid' : ''}`}
                        placeholder="Agrega tu foto"
                        {...register('foto', {
                          required: 'Foto obligatoria',
                        })}
                        onChange={(e) => {setFile(e.target.files[0])}}
                      />
                      {errors.foto && <div className="invalid-feedback">{errors.foto.message}</div>}
                    </Form.Group>
                  </Col> 
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mt-3">
                      <Form.Label>Usuario:</Form.Label>
                      <Form.Control
                        type="text"
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Ingresa tu nombre de usuario"
                        {...register('username', {
                          required: 'Usuario obligatorio',
                        })}
                      />
                      {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                    </Form.Group>
                  
                  </Col>
                  <Col>
                    <Form.Group className="mt-3">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Ingresa tu password"
                        {...register('password', {
                          required: 'Password obligatoria',
                        })}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password.message}</div>
                      )}
                    </Form.Group>
                  
                  </Col>
                </Row>
                <Row> 
                  <Button type="submit" className="btn btn-primary mt-4">
                    Registrar
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
  padding: 3rem;
  margin-top: 5rem;
  margin: 0 auto;
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
`;

const ImageCol = styled(Col)`
  flex: 1;
  position: relative;
  max-width: 60rem;  
  max-height: 40rem;  
  overflow: hidden;
`;


const DividerCol = styled(Col)`
  border-left: 1px solid #dee2e6;
  height: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
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

const Divider = styled.div`
  border-left: 1px solid #dee2e6;
  height: 100%;  
`;
export default RegisterPage;
