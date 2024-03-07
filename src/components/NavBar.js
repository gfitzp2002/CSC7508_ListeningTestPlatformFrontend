import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from '../images/auralatlasLogo2small.png'


function NavBar() {

  const { logout } = useAuth();
 


  return (
    //<Container fluid className='text-center roboto-black'>
      <Navbar collapseOnSelect  data-bs-theme="dark" expand="lg">
        <Container >
          <Navbar.Brand href="/home">
            <img
                alt="Aural Atlas Logo"
                src={logoImage}
              />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/quiz-menu">Lets Play!!</Nav.Link>
              <Nav.Link as={Link} to="/top-scores">Top Scorers</Nav.Link>
              <Nav.Link as={Link} to="/profile-page">Profile</Nav.Link>
              <Nav.Link href="#link">History</Nav.Link>
              <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
              <Nav.Link as={Link} to="/admin-panel">Admin</Nav.Link>        
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    //</Container>
  );
}

export default NavBar;
