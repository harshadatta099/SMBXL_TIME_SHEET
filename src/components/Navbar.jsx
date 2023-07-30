import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import logo from '../assets/smbxlLogo.svg';
import { Link, useNavigate , useLocation} from 'react-router-dom';

const NavBar = ({ userRole }) => {
  const navigate = useNavigate();
   const location = useLocation();
  const hideHeader = location.pathname === "/signup" || location.pathname === "/";
  const handleLogout = () => {
    console.log('logout');
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('user', null);
 
    navigate('/');
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
              <Nav.Link as={Link} to="/admin/user-records">Users</Nav.Link>
              <Nav.Link as={Link} to="/admin/projects">Projects</Nav.Link>
              <Nav.Link as={Link} to="/admin/activities">Activity</Nav.Link>
            </>
          )}
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-primary" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
