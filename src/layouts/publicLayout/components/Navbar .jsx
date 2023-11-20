import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar as NavBar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaRegUser , FaUserPlus, FaUser  } from 'react-icons/fa';  
import { useAuth } from '../../../contexts/AuthContext/AuthContext' 
import { PiUserListFill } from "react-icons/pi";
import { RiLogoutBoxRLine } from "react-icons/ri"; 


const Navbar = () => {
  const navigate = useNavigate()
  const { isAuth, user, logout } = useAuth();

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <NavBar bg="dark" variant="dark" expand="lg"  className="fixed-top">
        <Container fluid>
          <Nav className="ms-4"> 
            <NavLink to="/" className="navbar-brand">
              <img
                src="/miLibro.png"
                alt="Logo"
                height="50"
                className="d-inline-block align-top"
              />
            </NavLink>
          </Nav>
 
          <NavBar.Toggle aria-controls="basic-navbar-nav" />
          <NavBar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="me-5"> 
              {
                !isAuth && 
                <>
                  <Nav.Item className="me-4">
                    <NavLink to="/login" className="nav-link">
                      <FaRegUser className="me-1" /> Sign In
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink to="/register" className="nav-link">
                      <FaUserPlus   className="me-1" />Sign Up
                    </NavLink>
                  </Nav.Item>

                </>
              }
              {isAuth && (
                <>
                  <NavDropdown title={<> <>{user.username}</> <FaUser  /> </>} id="navbar-dropdown" >
                    
                    <NavDropdown.Item>
                      <NavLink to="/profile" className="nav-link" style={{ color: '#000' }}>
                        View Profile <PiUserListFill />
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout <RiLogoutBoxRLine />
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </NavBar.Collapse>
        </Container>
      </NavBar>
    </>
  );
};
 

export default Navbar;
