import React, { useContext, useEffect, useState }  from 'react'; 
import { Container, Button, Row, Card } from 'react-bootstrap';
import { getCategories } from '../service/QuizService';
import { QuizContext } from '../context/QuizContext';

function QuizMenu() {

const {setCategoryId, quizData, startQuiz }= useContext(QuizContext);
const [categories, setCategories] = useState([]);


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
    }    
  };

  return (
    
    
    <Container  style={{ borderRadius: '10px', border: '1px solid #fe7e13', backgroundColor:'#03045E'}} className="mt-5 text-center roboto-black">
      <Card className='mt-4 mb-4 text-center p-1' style={{border: '1px solid #1086ce', backgroundColor:'#023e8a', color: 'white'}}>
        <Card.Body  >
          <Row>
              <h2>Choose your Quiz</h2>
              <hr />
          </Row>

          <div className='d-grid gap-2'>
            {categories && categories.map((category) => (
              <Row>
                  <Button style={{ fontSize: '1.5rem', fontWeight: 'bold' }} variant='light' size='lg' key={category.categoryId} onClick={() => handleCategorySelect(category.categoryId)}>
                  {category.categoryName}
                  </Button>
              </Row>
            ))}
          </div>
        </Card.Body>
    </Card>
  </Container>

  );

}

export default QuizMenu;