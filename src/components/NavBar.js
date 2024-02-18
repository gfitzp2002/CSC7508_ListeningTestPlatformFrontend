import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {

  const { logout } = useAuth();
 


  return (
    <Navbar  data-bs-theme="light" expand="lg" style={{ backgroundColor: '#65afb4',  borderTop: '2px solid #333', borderBottom: '2px solid #333' }}>
      <Container>
        <Navbar.Brand href="#home">Aural Atlas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Account</Nav.Link>
            <Nav.Link href="#link">History</Nav.Link>
            <Nav.Link as={Link} to="/admin-panel">Admin</Nav.Link>
            <Nav.Link as={Link} to="/quiz-menu">Lets Play!!</Nav.Link>
            <Nav.Link as={Link} to="/top-scores">Top Scorers</Nav.Link>
            <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
