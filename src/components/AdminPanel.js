import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {

const navigate = useNavigate();

return (

    <Container className='mt-4 text-center'>
        <Row>
            <div className='d-grid gap-2'>
                <Button onClick={() => navigate('/user-login-history')}>View User Login History</Button>
                <Button onClick={() => navigate('/login-stats')}>View Monthly Login Stats</Button>
                <Button onClick={() => navigate('/inactive-users')}>View Inactive Users</Button>
            </div>      
        </Row>
    </Container>

);

}

export default AdminPanel; 