import React from 'react';
import { Container, Row, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {

const navigate = useNavigate();

return (

    <Container style={{ backgroundColor: '#eee' }} className="mt-5 text-center">
    <Card className='mt-4 mb-4 text-center'>
        <Card.Header>
            <Row>
                <h2>ADMIN PANEL</h2>
            </Row>
        </Card.Header>
        <Card.Body>
        <Row>
            <div className='d-grid gap-2'>
                <Button onClick={() => navigate('/user-login-history')} size='lg'>View User Login History</Button>
                <Button onClick={() => navigate('/login-stats')} size='lg'>View Monthly Login Stats</Button>
                <Button onClick={() => navigate('/inactive-users')} size='lg'>View Inactive Users</Button>
            </div>      
        </Row>
        </Card.Body>
    </Card>
    </Container>
);

}

export default AdminPanel; 