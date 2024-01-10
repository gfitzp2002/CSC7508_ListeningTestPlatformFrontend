import React, { useState, useEffect } from 'react';
import { getCategories } from '../service/QuizService';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function NavBar({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
    
  }, []);

  return (
    <Navbar  data-bs-theme="light" expand="lg" style={{ backgroundColor: '#65afb4',  borderTop: '2px solid #333', borderBottom: '2px solid #333' }}>
      <Container>
        <Navbar.Brand href="#home">Aural Atlas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Account</Nav.Link>
            <Nav.Link href="#link">History</Nav.Link>
            <NavDropdown title="Select A Quiz" id="basic-nav-dropdown">
               {categories.map((category) => (
                  <NavDropdown.Item
                    key={category.categoryId}
                    onClick={() => onCategorySelect(category.categoryId)}
                  >
                    {category.categoryName}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
