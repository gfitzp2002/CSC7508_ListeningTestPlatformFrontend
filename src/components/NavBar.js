import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImage from '../images/auralatlasLogo2small.png'


function NavBar() {

  const { username, logout } = useAuth();
  console.log("NavBar - username - " + username);

  // Render nothing until username is defined
  if (username === undefined) {
    return null;
  }

  return (
    <Container fluid className='text-center roboto-black'>
      <Navbar collapseOnSelect  data-bs-theme="dark" expand="lg" style={{fontSize: '2em'}}>
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
              <Nav.Link as={Link} to="/leader-board">Leader Board</Nav.Link>
              <Nav.Link as={Link} to={`/profile-page/${username}`}>Profile</Nav.Link>
              <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
              <Nav.Link as={Link} to="/admin-panel">Admin </Nav.Link>        
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default NavBar;
