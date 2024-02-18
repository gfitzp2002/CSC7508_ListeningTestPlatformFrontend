import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {

const navigate = useNavigate();

return (

    <Container className='mt-4 text-center'>
        <Row>
            <div className='d-grid gap-2'>
                <Button onClick={() => navigate('/user-login-history')}>View User Login History</Button>
                <Button onClick={() => navigate('/login-stats')}>View Monthly Login Stats</Button>
            </div>      
        </Row>
    </Container>

);

}

export default AdminPanel; 