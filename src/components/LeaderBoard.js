import React, { useState, useEffect, useContext } from 'react';
import { Table, Container, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import { getLeadersBoardData } from '../service/AdminService'; 
import { MessageContext } from '../context/MessageContext';
import { getCategories } from '../service/QuizService';

const Leaderboard = () => {
    const [topScores, setTopScores] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [ maxResults, setMaxResults ] = useState(3); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const { showToast } = useContext(MessageContext);

    //useing Promise.all due to race conditions causing intermittent errors with two different endpoint requests
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesData, topScoresData] = await Promise.all([
                    getCategories(),
                    getLeadersBoardData(maxResults)
                ]);
                setCategories(categoriesData);
                setTopScores(topScoresData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [maxResults]);

    const filteredData = selectedCategory
    ? topScores.filter((entry) => entry.category === selectedCategory)
    : topScores;

    if(!categories|| isLoading || topScores == null){
        return <h1>Loading.....</h1>; 
    }


    return (
        <Container>
            <Row>
                <Col >
                    <DropdownButton
                        id="categorySelect"
                        title="Select a Quiz Category"
                        className="mt-4"
                        variant="success"
                        onSelect={(eventKey) => setSelectedCategory(eventKey)}
                    >
                        <Dropdown.Header>Categories</Dropdown.Header>
                        {categories && categories.map((category) => (
                            <Dropdown.Item key={category.categoryId} eventKey={category.categoryName}>
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
                        <Container><h2 className='mb-4 mt-4 text-center'>{selectedCategory}</h2></Container>
                    
                    </Row>            
                    
                    <Table striped bordered hover className='mb-4'>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Score</th>
                                <th>Submitted Date Time</th>
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

export default Leaderboard;
