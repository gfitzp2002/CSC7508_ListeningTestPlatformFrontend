import React from 'react';
import { Row, Container, Card } from 'react-bootstrap';



//simple welcome screen - needs to be personalised next iteration
function Welcome() {
  return (
    <Container className='text-center mt-5 roboto-black' style={{ borderRadius: '10px', border: '1px solid #fe7e13', backgroundColor:'#03045E'}} >
        <Card className='mt-4 mb-4 text-center p-1' style={{border: '1px solid #1086ce', backgroundColor:'#023e8a', color: 'white'}}>
            <Card.Body>
                <Row>
                    <h1 >Welcome to the Aural Atlas!</h1>
                    <hr />
                </Row>
                <Row>
                    <h4 className="mb-4">Embark on a journey to sharpen your listening skills and enhance your musical perception.</h4>
                    
                    <h2 className="mb-4" style={{color:'#fe7e13'}}>Select Lets Play!! from the MENU ABOVE and dive into the world of ear training.</h2>
                 
                    <h4 className="mb-4">Unlock the mysteries of melody, harmony, rhythm, and more as you progress through our interactive exercises.</h4>
             
                    <h4 className="mb-4">Start your auditory adventure now and level up your listening with Aural Atlas!</h4>
                </Row>
            </Card.Body>
        </Card>
    </Container>
  );
}

export default Welcome;
