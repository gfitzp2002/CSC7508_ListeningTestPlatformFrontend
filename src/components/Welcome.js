import React from 'react';
import { Row, Container, Card } from 'react-bootstrap';

//simple welcome screen - needs to be personalised next iteration
function Welcome() {
  return (
    <Container className='text-center mt-5'>
        <Card style={{backgroundColor: '#023e8a',  color: 'white', border: '1px solid white' }}>
            <Card.Body>
                <Row>
                    <h1 >Welcome to the Aural Atlas!</h1>
                    <hr />
                </Row>
                <Row>
                    <p>Embark on a journey to sharpen your listening skills and enhance your musical perception.</p>

                    <p>Select a quiz from the menu above and dive into the world of ear training.</p>

                    <p>Unlock the mysteries of melody, harmony, rhythm, and more as you progress through our interactive exercises.</p>

                    <p>Start your auditory adventure now and level up your listening with Aural Atlas!</p>
                </Row>
            </Card.Body>
        </Card>
    </Container>
  );
}

export default Welcome;
