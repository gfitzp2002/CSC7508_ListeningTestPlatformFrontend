import React, { useState, useEffect } from 'react';
import { getCategories } from './QuizService';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';

function NavBar({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
    console.log("Categories" + categories);
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Quiz App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Choose Quiz Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category.categoryId}
                  onClick={() => onCategorySelect(category.categoryId)}
                >
                  {category.categoryName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
