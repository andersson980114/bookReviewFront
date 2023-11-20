import React from 'react';
import { Card, Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom' 


const UserProfile = () => {
  const { user, isAuth } = useAuth();
  if (!user) {
    return null; 
  }
  return !isAuth ? <Navigate to="/"/> : (
    <UserProfileCard className="p-3">
      <CenteredContent>
        <img
          src={user.foto}
          alt="User Profile"
          style={{ width: '35rem', maxWidth: '35rem', height: 'auto' }}
        />
        <Row>
          <Col xs={10} md={5}>
            <AttributeRow>
              <AttributeLabel xs="12">Nombre:</AttributeLabel>
              <AttributeValue xs="12">{user.nombre}</AttributeValue>
            </AttributeRow>
            <AttributeRow>
              <AttributeLabel xs="12">Apellido:</AttributeLabel>
              <AttributeValue xs="12">{user.apellido}</AttributeValue>
            </AttributeRow>
          </Col>
          <Col xs={10} md={5}>
            <AttributeRow>
              <AttributeLabel xs="12">Username:</AttributeLabel>
              <AttributeValue xs="12">{user.username}</AttributeValue>
            </AttributeRow>
            <AttributeRow>
              <AttributeLabel xs="12">Correo:</AttributeLabel>
              <AttributeValue xs="12">{user.correo}</AttributeValue>
            </AttributeRow>
          </Col>
        </Row>
      </CenteredContent>
    </UserProfileCard>
  )
  ;
};

const UserProfileCard = styled(Card)`
  width: 40rem;
  max-width: 50rem;  
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CenteredContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

const AttributeRow = styled(Row)`
  margin: 10px 0;
`;

const AttributeLabel = styled(Col)`
  font-weight: bold;
`;

const AttributeValue = styled(Col)``;

export default UserProfile;