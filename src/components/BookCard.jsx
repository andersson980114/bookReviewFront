import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart , FaStar } from 'react-icons/fa';
import { PiHeartDuotone } from "react-icons/pi";
import { useAuth } from '../contexts/AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import {rendersStars} from '../utils/rendersStars'

const CustomCard = ({book}) => { 
  const { _id: id, cover, nombre, autor, calificacion } = book
  const { isAuth } = useAuth();
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };
 
    return (
        <CardContainer>
            {/* <CardIcons>
                { isAuth && 
                  <RoundedIcon onClick={handleLikeClick}>

                    {isLiked ? (
                        <FaHeart color="red" size={24} />
                    ) : (
                        <PiHeartDuotone color="black" size={24} />
                    )}
                
                  
                  </RoundedIcon>  
                }
            </CardIcons> */}
            <CardLink to={`/book/${id}`}>
              <CardImage src={cover} alt="Book Cover" />
              <CardContent>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {rendersStars(calificacion)}
                  </div>
                  <CardTitle>{nombre}</CardTitle>
                  <CardAuthor>{autor.nombre} {autor.apellido}</CardAuthor>

            </CardContent>
            </CardLink>
        </CardContainer>
    );
};

const CardContainer = styled.div`
  width: 20rem;
  height: 32rem;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 50px;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const RoundedIcon = styled.div`
  background-color: #fff;  
  border-radius: 50%;      
  padding: 5px;            
  cursor: pointer;
`;

const CardImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20%;
  padding: 15px;
  position: relative;
  z-index: 2;
`;

const CardTitle = styled.h6`
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center; 
`;

const CardAuthor = styled.p`
  margin: 0;
  color: #666;
  text-align: center;
`;

export default CustomCard;
