import React from 'react';
import { Container, Row, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {

const navigate = useNavigate();

return (

    <Container  style={{ borderRadius: '10px', border: '1px solid #fe7e13', backgroundColor:'#03045E'}} className="mt-5 text-center roboto-black">
    <Card className='mt-4 mb-4 text-center p-1' style={{border: '1px solid #1086ce', backgroundColor:'#023e8a', color: 'white'}}>
        <Card.Header>
            <Row>
                <h2>ADMIN PANEL</h2>
            </Row>
        </Card.Header>
        <Card.Body >
        <Row >
            <div className='d-grid gap-2'   >
                <Button style={{ fontSize: '1.5rem', fontWeight: 'bold' }} variant='light' size="lg" onClick={() => navigate('/user-login-history')}>View User Login History</Button>
                <Button style={{ fontSize: '1.5rem', fontWeight: 'bold' }} variant='light' size="lg" onClick={() => navigate('/login-stats')}>View Monthly Login Stats</Button>
                <Button style={{ fontSize: '1.5rem', fontWeight: 'bold' }} variant='light' size="lg" onClick={() => navigate('/inactive-users')}>View Inactive Users</Button>
                <Button style={{ fontSize: '1.5rem', fontWeight: 'bold' }} variant='light' size="lg" onClick={() => navigate('/top-scores')}>Top Scorers By Category</Button>
            </div>      
        </Row>
        </Card.Body>
    </Card>
    </Container>
);

}

export default AdminPanel; 