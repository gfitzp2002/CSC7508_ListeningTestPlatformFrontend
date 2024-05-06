import React, { useState, useEffect, useContext } from 'react';
import { getLoginHistory, calculateDaysSinceLastLogin } from '../service/AdminService';
import { MessageContext } from '../context/MessageContext';
import { Button, Table, Form, Container, Col, Row, Badge} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserLoginHistory = () => {
    const [username, setUsername] = useState('');
    const [loginHistory, setLoginHistory] = useState([]);
    const [displayResults, setDisplayResults] = useState(false);
    const [daysSinceLogin, setDaysSinceLogin] = useState(null);
    const [error, setError] = useState(null);
    const { showToast } = useContext(MessageContext); 
    const navigate = useNavigate();

    useEffect(() => {
        if (loginHistory.length > 0) {
            const days = calculateDaysSinceLastLogin(loginHistory);
            setDaysSinceLogin(days);
        }
        
    }, [loginHistory])

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async () => {
    try {
        const history = await getLoginHistory(username);
        setLoginHistory(history);
        console.log('setLoginHistory called');
        setDisplayResults(true);
      
    } catch (error) {
        console.log('handleSubmit catchblock entered');
        if(error.response && error.response.status === 403) {
            setError('You must have administrator access rights for this function');
        }else {
            setError('An error occurred while fetching data');
        }
        handleReset();
    }
  };
  const handleReset = () => {
    setUsername('');
    setLoginHistory([]);
    setDisplayResults(false);
  };
  
    // Check if error occurred
    if (error) {
    return (
        <Container className='d-flex justify-content-center align-items-center'  style={{color:'white'}}>
            <h1>{error}</h1>
        </Container>
    
)}

  return (
    <Container className='text-center mt-4' style={{color: 'white'}}>
        {!displayResults && (
        <Row>
            <Container className='mb-4' ><h3 style={{fontSize:'2em'}}>Search for a user to view their log in history..</h3></Container>    
            <Col md={6}>
                <Form>                
                    <Form.Group controlId="formUsername">                    
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter Username"
                        />                    
                    </Form.Group>
                </Form> 
            </Col>
            <Col md={6}>
                <Button variant="primary" onClick={handleSubmit}>Get Login History</Button>
            </Col> 
            <Row className='mt-4'>
                <Col md={4}></Col>
                <Col md={4}>
                    <Button variant="primary" size="lg" onClick={() => navigate('/admin-panel')}>Back</Button>
                </Col>
                <Col md={4}></Col>
            </Row>                   
        </Row>
        )}
        {displayResults && ( 
            <main>
                <Row className='mt-4'>        
                    <Col>
                        <h1>Displaying login history for {username}</h1>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <h2>Days since last log in: <Badge bg="light" text="dark">{daysSinceLogin}</Badge></h2>
                </Row>
                
                <Row className='mt-4'>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Login Timestamp</th>
                            <th>Success</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loginHistory.map((entry, index) => (
                            <tr key={index}>
                            <td>{new Date(entry.loginTimestamp).toLocaleString()}</td>
                            <td>{entry.success ? 'Success' : 'Failure'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <Button variant="primary" onClick={handleReset}>Back</Button>
                    </Col>
                </Row>
            </main>
        )}
    </Container>
  );
};

export default UserLoginHistory;
