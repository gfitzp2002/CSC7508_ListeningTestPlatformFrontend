import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Button, Spinner, Col } from 'react-bootstrap';
import { getInactiveUsers } from '../service/AdminService';
import { sendReminderEmail } from '../service/AdminService';
import { useNavigate } from 'react-router-dom';

const InactiveUsers = () => {

    const [inactiveUsers, setInactiveUsers] = useState([]);
    const [isLoading, setIsLoading ] = useState(true);
    const [error, setError] = useState(null);
    const [sendingEmailForUser, setSendingEmailForUser] = useState({}); // Track if email is being sent for a user
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userList = await getInactiveUsers();
                setInactiveUsers(userList);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response && error.response.status === 403) {
                    setError('You must have administrator access rights for this function');
                } else {
                    setError('An error occurred while fetching data');
                }
            }
        };

        fetchData();
    }, []);

    const getDaysSinceLoggedIn = (timestamp) => {
        const millisecondsSinceLastLogin = Date.now() - timestamp;
        return Math.floor(millisecondsSinceLastLogin / (1000 * 60 * 60 * 24));
    }

    const handleSendEmail = async (username) => {
        try {
            setSendingEmailForUser(prevState => ({ ...prevState, [username]: true })); // Set sending email to true before sending
            await sendReminderEmail(username);
            // show a success message?
        } catch (error) {
            console.error('Error sending reminder email:', error);
            // Display toast showing error?
        } finally {
            setSendingEmailForUser(prevState => ({ ...prevState, [username]: false })); // Reset sending email state
        }
    };

    // Check if error occurred
    if (error) {
        return (
            <Container className='d-flex justify-content-center align-items-center'  style={{color:'white'}}>
                <h1>{error}</h1>
            </Container>
        
    )}

    return (
        <Container className="text-center mt-4" style={{color:'white'}}>
            <Row class="mb-4">
                
                    <h1>Inactive Users List</h1>
                    <p>Please see a list of users who have not logged in within the past 7 days or more</p>
                
            </Row>

        {isLoading ? ( // Render loading indicator while data is being fetched
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ) : (
            <Table striped bordered hover className='mb-4'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Days Since Last Logged In</th>
                        <th>Send Reminder Email</th>
                    </tr>
                </thead>
                <tbody>
                {inactiveUsers.map((user) => {
                    return (
                    <tr  key={user.username}>
                        <td>{user.username}</td>
                        <td>{getDaysSinceLoggedIn(user.loginTimestamp)}</td>
                        <td>
                            <Button
                                variant="primary"
                                disabled={sendingEmailForUser[user.username]}
                                onClick={() => handleSendEmail(user.username)}
                                size="sm"
                            >
                                {sendingEmailForUser[user.username] && (
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="mr-1" // Add margin to the right to separate spinner from text
                                    />
                                )}
                                {sendingEmailForUser[user.username] ? 'Sending...' : 'Send Reminder'}
                            </Button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </Table>
        )}
        <Row>
            <Col>
            <Button variant="primary" size="lg" onClick={() => navigate('/admin-panel')}>Back</Button>
            </Col>
        </Row>
        </Container>
    );
};

export default InactiveUsers;