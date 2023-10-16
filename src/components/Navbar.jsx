import React, {useEffect} from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import logo from '../assets/smbxlLogo.svg';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import {msalInstance} from './../config.js'

const NavBar = ({ userRole }) => {
  const navigate = useNavigate();
   const location = useLocation();
  const hideHeader =  location.pathname === "/" ;

  useEffect(() => {
    async function initializeMsal() {
      await msalInstance.initialize();
    }
    initializeMsal();
  }, []);
  
  const logout = async () => {
    try {
      await msalInstance.logoutPopup();
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('roleId');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenid');
      navigate('/');
     
      localStorage.removeItem("userName");
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };
  
  if (hideHeader) {
    return null;
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="image not found" />
        </Navbar.Brand>
        <Nav className="me-auto">
          {userRole === 'user' && (
            <>
              <Nav.Link as={Link} to="/user">Home</Nav.Link>
              <Nav.Link as={Link} to="/user/edit">Edit</Nav.Link>
              <Nav.Link as={Link} to="/user/user-records">User Records</Nav.Link>
            </>
          )}
          {userRole === 'hr' && (
            <>
              <Nav.Link as={Link} to="/hr">Home</Nav.Link>
              <Nav.Link as={Link} to="/hr/user-records">User Records</Nav.Link>
            </>
          )}

          {userRole === 'admin' && (
            <>
              <Nav.Link as={Link} to="/admin/">Home</Nav.Link>
              <Nav.Link as={Link} to="/admin/user-records">User Records</Nav.Link>
              <Nav.Link as={Link} to="/admin/projects">Projects</Nav.Link>
              <Nav.Link as={Link} to="/admin/activities">Activity</Nav.Link>
            </>
          )}
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-primary" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
