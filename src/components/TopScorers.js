import React, { useState, useEffect, useContext } from 'react';
import { Table, Container, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import { getTopScorersData } from '../service/AdminService'; 
import { getCategories } from '../service/QuizService';

const TopScorers = () => {
    const [topScores, setTopScores] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [ maxResults, setMaxResults ] = useState(3); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    //using Promise.all due to race conditions causing intermittent errors with two different endpoint requests
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesData, topScoresData] = await Promise.all([
                    getCategories(),
                    getTopScorersData(maxResults)
                ]);
                setCategories(categoriesData);
                setTopScores(topScoresData);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response && error.response.status === 403) {
                    setError('You must have administrator access rights for this function');
                } else {
                    setError('An error occurred while fetching data');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [maxResults]);

    const filteredData = selectedCategory
    ? topScores.filter((entry) => entry.category === selectedCategory)
    : topScores;

 
    // Check if error occurred
    if (error) {
        return (
            <Container className='d-flex justify-content-center align-items-center'  style={{color:'white'}}>
                <h1   data-testid="error-message">{error}</h1>
            </Container>        
    )}
    
  
    //Display "loading" if all required data is currently not available
    if(!categories|| isLoading || topScores == null){
        return <h1>Loading.....</h1>; 
    }

    return (
        <Container data-testid="topscorers" style={{color:"white"}}>
            <Row>
                <Col >
                    <DropdownButton
                        id="categorySelect"
                        title="Select a Quiz Category"
                        className="mt-4"
                        variant="primary"
                        onSelect={(eventKey) => setSelectedCategory(eventKey)}
                        data-testid="quiz-category-dropdown"
                    >
                        <Dropdown.Header>Categories</Dropdown.Header>
                        {categories && categories.map((category) => (
                            <Dropdown.Item data-testid="quiz-category" key={category.categoryId} eventKey={category.categoryName}>
                                {category.categoryName}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>            
                </Col>
                <Col md={8}>
                {!selectedCategory && <h1 className="mt-4">View the top scores in each quiz category!</h1>}
                {selectedCategory && (
                <>  
                    <Row>
                        <Container><h2 className='mb-4 mt-4 text-center'>Top Scorers for : {selectedCategory}</h2></Container>
                    
                    </Row>            
                    
                    <Table striped bordered hover className='mb-4'>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Scored</th>
                                <th>Since....</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((record) => (
                            <tr>
                                <td>{record.username}</td>
                                <td>{record.score}</td>
                                <td>{new Date(record.submittedDateTime).toLocaleString()}</td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
                )}
            </Col>
           </Row>
        </Container>
    );
};

export default TopScorers;
