import React, { useState, useEffect, useContext } from 'react';
import { getLoginHistory } from '../service/AdminService';
import { MessageContext } from '../context/MessageContext';
import { Button, Table, Form, Container, Col, Row, Badge} from 'react-bootstrap';

const UserLoginHistory = () => {
    const [username, setUsername] = useState('');
    const [loginHistory, setLoginHistory] = useState([]);
    const [displayResults, setDisplayResults] = useState(false);
    const [daysSinceLogin, setDaysSinceLogin] = useState(null);
    const { showToast } = useContext(MessageContext); 

  useEffect(() => {
    if (loginHistory.length > 0) {
      const latestLoginTimestamp = loginHistory[loginHistory.length - 1].loginTimestamp;
      const millisecondsSinceLastLogin = Date.now() - latestLoginTimestamp;
      const days = Math.floor(millisecondsSinceLastLogin / (1000 * 60 * 60 * 24));
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
            showToast('You must have administrator access rights for this function');
        }
        handleReset();
    }
  };
  const handleReset = () => {
    setUsername('');
    setLoginHistory([]);
    setDisplayResults(false);
  };

  return (
    <Container className='text-center mt-4'>
        {!displayResults && (
        <Row>
            <Container className='mb-4'><h3>Search for a user to view their log in history..</h3></Container>    
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
