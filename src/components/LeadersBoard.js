import React, { useState, useEffect, useContext } from 'react';
import {Container, Row, Col, ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getLeadersBoardData } from '../service/QuizService';


const LeadersBoard = () => {
    const [topScores, setTopScores] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [ maxResults, setMaxResults ] = useState(3); 


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLeadersBoardData();
                setTopScores(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [maxResults]);



    if(isLoading || topScores == null){
        return <h1>Loading.....</h1>; 
    }


    return (
        <Container >
            <Row> 
                <Col>
                    <Row>
                        <Container style={{color:'white'}}><h1 className='mb-4 mt-4 text-center roboto-black'>Leaders Board</h1></Container>
                        <hr style={{color:'white'}}/>
                    </Row>      
                    <ListGroup className='mb-4'  style={{border: '3px solid #fe7e13'}} >
                        <ListGroup.Item style={{backgroundColor:'#03045E', color:"white", fontSize:'2em'}} >
                            <div className="d-flex justify-content-between">
                            <strong>Username</strong>
                            <strong>Total Points</strong>
                            </div>
                        </ListGroup.Item>
                        {topScores.map((entry, index) => (
                            <ListGroup.Item action variant='light' key={index} as={Link} to={`/profile-page/${entry.username}`} style={{fontSize:'1.5em'}}>
                                <span>{entry.username}</span>
                                <span className='float-end'>{entry.totalPoints}</span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
           </Row>
        </Container>
    );
};

export default LeadersBoard;
