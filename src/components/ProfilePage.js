import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Card, Button, ListGroup } from 'react-bootstrap';
import { Globe, Twitter, Instagram, Facebook } from 'react-bootstrap-icons';
import defaultProfileImage from '../images/profile.png';
import { getUserProfile } from '../service/UserService';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const imageUrl = 'http://localhost:8080/assets/profileImages/'

    // Effect to fetch user profile data when the component mounts
    useEffect(() => {
      // Retrieve username from local storage
      const username = localStorage.getItem('username'); // Get username from local storage in the browser 
      if (username) {
        const fetchData = async () => {
          const profileData = await getUserProfile(username);
          if(profileData){
            setUserProfile(profileData);
          }          

        };
        fetchData();
        console.log(JSON.stringify(userProfile));
      }
    }, []);

  

  return (
    <Container style={{ background: 'linear-gradient(to top, #03045e, #023e8a)', borderRadius: "10px", border: '1px solid #FFFFFF'}} className="mt-5 text-center lato-regular">
      {userProfile ? (
      <Container className="mt-5">
        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <Card.Body className="text-center ">
                <Card.Img
                  src={userProfile?.profileImage ? `${imageUrl}${userProfile.profileImage}` : defaultProfileImage} 
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-1">{userProfile.personalInfo.username}</p>
                <p className="text-muted mb-4">Location info.. ?</p>
                <div className="d-flex justify-content-center mb-2">
                  <Button>Follow</Button>
                  <Button variant="outline" className="ms-1">Message</Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">
                <ListGroup flush className="rounded-3">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Twitter style={{ color: '#55acee' }} />
                    <span>{userProfile.socialMedia.twitter}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Instagram style={{ color: '#ac2bac' }} />
                    <span>{userProfile.socialMedia.instagram}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                    <Facebook style={{ color: '#3b5998' }} />
                    <span>{userProfile.socialMedia.facebook}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="8">
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col sm="3">
                    <Card.Text className='text-muted'>Full Name</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text>{`${userProfile.personalInfo.userForename} ${userProfile.personalInfo.userSurname}`}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text className="text-muted">Email</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text >{userProfile.personalInfo.userEmail}</Card.Text>
                  </Col>
                </Row>
                <hr />
               </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col sm="3">
                    <Card.Text className="text-muted">Total Points</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text >{userProfile.quizStats.totalPoints}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text className="text-muted">Strongest Category</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text >{userProfile.quizStats.strongCategory}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text className="text-muted">Most Played</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text >{userProfile.quizStats.mostPlayed}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text className="text-muted">Days in a row streak</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text >{userProfile.quizStats.daysInARow}</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text className="text-muted">Days played this month</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text >{userProfile.quizStats.daysThisMonth}</Card.Text>
                  </Col>
                </Row>
                <hr />
               </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      ) : ( 
        <Container className="mt-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
             </Spinner>
        </Container>
      )}
    </Container>
  );
};

export default ProfilePage;
