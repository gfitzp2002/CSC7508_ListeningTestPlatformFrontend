import React, { useContext, useEffect, useState }  from 'react'; 
import { Container, Button, Row } from 'react-bootstrap';
import { getCategories } from '../service/QuizService';
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

function QuizMenu() {

const {setCategoryId, quizData, startQuiz }= useContext(QuizContext);
const [categories, setCategories] = useState([]);
const navigate = useNavigate();

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
      startQuiz();
      navigate(`/quiz/${categoryId}`);
    }    
  };

  return (
    <Container className="text-center">
        <Row>
            <h2>Select a Quiz Category:</h2>
        </Row>
    
    <div className='d-grid gap-2'>
      {categories && categories.map((category) => (
        <Row>
            <Button variant='primary' size='lg' key={category.categoryId} onClick={() => handleCategorySelect(category.categoryId)}>
            {category.categoryName}
            </Button>
        </Row>
      ))}
    </div>
  </Container>

  );

}

export default QuizMenu;