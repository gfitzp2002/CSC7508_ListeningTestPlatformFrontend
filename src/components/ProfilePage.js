import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Card, Button, ListGroup, Modal, CloseButton } from 'react-bootstrap';
import { Twitter, Instagram, Facebook } from 'react-bootstrap-icons';
import defaultProfileImage from '../images/profile.png';
import { getUserProfile } from '../service/UserService';
import { useParams } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const imageUrl = 'http://localhost:8080/assets/profileImages/';
  const { username: routeUsername } = useParams();
  const { username: authUsername } = useAuth();


  const fetchUserProfile = async () => {
    try {
      const profileData = await getUserProfile(routeUsername);
      console.log("Profile page username - " + routeUsername );
      if(profileData){
        setUserProfile(profileData);
        console.log(JSON.stringify(userProfile));
      }
    } catch (error) {
      console.error('Error fetching user profile data:', error);
    }
  }

    // Effect to fetch user profile data when the component mounts
  useEffect(() => {
    if (routeUsername) {
      fetchUserProfile();
      }     
  }, [routeUsername]);

    useEffect(() => {
      if (userProfile) {
        console.log("User profile updated:", userProfile);
      }
    }, [userProfile]);

    const handleEditClick = () => {
      setShowUpdateProfile(true);
    };
  
    const handleCloseUpdateProfile = () => {
      setShowUpdateProfile(false);
      fetchUserProfile();
    };

  return (
    <Container style={{ background: 'linear-gradient(to top, #03045e, #023e8a)', borderRadius: "10px", border: '3px solid #fe7e13'}} className="mt-5 text-center roboto-black">
      {userProfile ? (
      <Container className="mt-5">
        <Row>
          <Col lg="4">
            <Card className="mb-4" style={{border: '3px solid #fe7e13'}}>
              <Card.Body className="text-center ">
                <Card.Img
                  src={userProfile?.profileImage ? `${imageUrl}${userProfile.profileImage}` : defaultProfileImage} 
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-1">{userProfile.personalInfo.username}</p>
    
                <div className="d-flex justify-content-center mb-2">
                  {userProfile && userProfile.personalInfo.username === authUsername && (
                    <Button onClick={handleEditClick} className="edit-button" size="sm">
                      Edit Profile
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4 mb-lg-0" style={{border: '3px solid #fe7e13'}}>
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
            <Card className="mb-4" style={{border: '3px solid #fe7e13'}}>
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
            <Card className="mb-4" style={{border: '3px solid #fe7e13'}}>
              <Card.Body>
                <Row>
                  <Col sm="3" >
                    <Card.Text className="text-muted">Total Points</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className='star-background'>{userProfile.quizStats.totalPoints}</Card.Text>
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
     {/* Render UpdateProfile as a Modal */}
     <Modal show={showUpdateProfile} onHide={handleCloseUpdateProfile} >
        <Modal.Header style={{ backgroundColor: '#03045e', border:'none'}}>
        <CloseButton aria-label="Hide" variant='white' onClick={handleCloseUpdateProfile}/>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: '#03045e'}}>
          <UpdateProfile userProfile={userProfile} onClose={handleCloseUpdateProfile} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
