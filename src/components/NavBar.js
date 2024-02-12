import React, { useState, useEffect, useContext } from 'react';
import { getCategories } from '../service/QuizService';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { QuizContext } from '../context/QuizContext';

function NavBar() {
  const [categories, setCategories] = useState([]);
  const {setCategoryId, quizData }= useContext(QuizContext);
  const navigate = useNavigate();
  const { logout } = useAuth();
 
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
    
  }, []);

  const handleCategorySelect = (categoryId) => {
    setCategoryId(categoryId);
    if(quizData){
      navigate(`/quiz/${categoryId}`);
    }    
  };

  return (
    <Navbar  data-bs-theme="light" expand="lg" style={{ backgroundColor: '#65afb4',  borderTop: '2px solid #333', borderBottom: '2px solid #333' }}>
      <Container>
        <Navbar.Brand href="#home">Aural Atlas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Account</Nav.Link>
            <Nav.Link href="#link">History</Nav.Link>
            <Nav.Link as={Link} to="/login-history">Login History</Nav.Link>
            <NavDropdown title="Select A Quiz" id="basic-nav-dropdown">
               {categories && categories.map((category) => (
                  <NavDropdown.Item
                    key={category.categoryId}
                    onClick={() => handleCategorySelect(category.categoryId)}
                  >
                    {category.categoryName}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>
            <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
